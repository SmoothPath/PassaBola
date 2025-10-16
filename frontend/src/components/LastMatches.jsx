import React, { useEffect, useState, useRef } from "react";

const TEAM_NAMES = [
  "Corinthians Feminino",
  "São Paulo Feminino",
  "Flamengo Feminino",
  "Palmeiras Feminino",
  "Internacional Feminino",
];

const API_BASE = "/api/tsdb";

// --- Utils robustos ---
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url, opts = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function getJSON(url, { timeoutMs = 12000, retries = 1 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetchWithTimeout(url, { headers: { Accept: "application/json" } }, timeoutMs);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} - ${text?.slice(0, 200)}`);
      }
      return await res.json();
    } catch (e) {
      lastErr = e;
      // backoff simples para 429/erros transitórios
      if (i < retries) await delay(600 + i * 400);
    }
  }
  throw lastErr;
}

// tenta várias formas de busca por time
function buildQueries(name) {
  const base = name.replace(/\s+Feminino$/i, "").trim();
  return [
    name, base,
    `${base} Women`, `${base} (W)`, `${base} W`,
    `${base} Feminino`,
  ];
}

async function resolveTeamIdStrict(name) {
  const queries = buildQueries(name);

  // Faça SEQUENCIAL para evitar 429
  for (const q of queries) {
    const url = `${API_BASE}/searchteams.php?t=${encodeURIComponent(q)}`;
    try {
      const json = await getJSON(url, { retries: 1 });
      const teams = Array.isArray(json?.teams) ? json.teams : [];

      const soccerOnly = teams.filter((t) => (t?.strSport || "").toLowerCase() === "soccer");

      const femaleFirst = [
        ...soccerOnly.filter(
          (t) =>
            (t?.strGender || "").toLowerCase() === "female" ||
            /(feminin|women|\(w\)|\bw\b)/i.test(t?.strTeam ?? "")
        ),
        ...soccerOnly.filter(
          (t) =>
            (t?.strGender || "").toLowerCase() !== "female" &&
            !/(feminin|women|\(w\)|\bw\b)/i.test(t?.strTeam ?? "")
        ),
      ];

      if (femaleFirst[0]?.idTeam) {
        return { idTeam: femaleFirst[0].idTeam, displayName: femaleFirst[0].strTeam };
      }
    } catch (e) {
      // Log e segue para próxima query
      console.warn(`lookup falhou para "${q}":`, e.message);
    }

    // pequeno intervalo entre tentativas para reduzir 429
    await delay(200);
  }
  return null;
}

export default function LastMatches() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const results = {};

        // 1) resolve IDs (sequencial)
        const resolved = [];
        for (const n of TEAM_NAMES) {
          if (cacheRef.current.has(n)) {
            resolved.push(cacheRef.current.get(n));
          } else {
            const r = await resolveTeamIdStrict(n);
            cacheRef.current.set(n, r);
            resolved.push(r);
            await delay(200); // intervalinho entre times
          }
        }

        // 2) busca últimos eventos (pode ser paralelo leve)
        await Promise.all(
          TEAM_NAMES.map(async (n, idx) => {
            const r = resolved[idx];
            if (!r?.idTeam) {
              console.warn(`Sem ID para ${n}`);
              results[n] = [];
              return;
            }

            const url = `${API_BASE}/eventslast.php?id=${r.idTeam}`;
            try {
              const json = await getJSON(url, { retries: 1 });
              const list = Array.isArray(json?.results) ? json.results : [];

              const filtered = list.filter((m) => {
                const isSoccer = (m?.strSport || "").toLowerCase() === "soccer";
                const league = `${m?.strLeague || ""} ${m?.strEvent || ""}`;
                const looksWomen = /(women|feminin|feminino|feminina|mulher|\bW\b|\(W\))/i.test(
                  league.toLowerCase()
                );
                // se quiser só femininas:
                // return isSoccer && looksWomen;
                return isSoccer;
              });

              const normalized = filtered.map((m) => ({
                idEvent: m.idEvent,
                date: m.dateEvent || m.dateEventLocal || m.strTimestamp || m.strDate || null,
                home: m.strHomeTeam || "Mandante",
                away: m.strAwayTeam || "Visitante",
                homeScore: m.intHomeScore ?? m.intHomeGoals ?? m.intHomeShots ?? "",
                awayScore: m.intAwayScore ?? m.intAwayGoals ?? m.intAwayShots ?? "",
                league: m.strLeague || "",
              }));

              results[n] = normalized;
            } catch (e) {
              console.warn(`eventslast falhou para ${n} (id ${r.idTeam}):`, e.message);
              results[n] = [];
            }
          })
        );

        setData(results);
      } catch (e) {
        console.error(e);
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Carregando jogos…</p>;
  if (err) return <p className="text-center text-red-500">Erro: {err}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
        Últimos Jogos dos Times Femininos Brasileiros
      </h2>

      {TEAM_NAMES.map((teamName) => {
        const matches = data[teamName] || [];
        return (
          <div key={teamName} className="mb-8">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">{teamName}</h3>

            {matches.length === 0 ? (
              <p className="text-gray-500 text-center">Nenhum jogo encontrado para {teamName}.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {matches.map((match) => (
                  <li key={match.idEvent} className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="font-semibold text-lg">
                        {match.home} <span className="text-gray-500">vs</span> {match.away}
                      </div>
                      <div className="text-xl font-bold text-gray-700">
                        {String(match.homeScore ?? "")} - {String(match.awayScore ?? "")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {match.league ? `${match.league} • ` : ""}
                        {match.date ? new Date(match.date).toLocaleString() : ""}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
