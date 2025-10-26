import React, { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";

const API_BASE = "/api/tsdb";

export default function LastMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setErr("");

        // 🔍 tenta várias ligas femininas conhecidas
        const leagues = [
          "English Womens Super League",
          "Spanish La Liga Women",
          "FIFA World Cup Women",
        ];

        let foundMatches = [];

        for (const leagueName of leagues) {
          const res = await fetch(`${API_BASE}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
          const data = await res.json();

          if (data?.teams?.length) {
            const team = data.teams[0];
            const recentRes = await fetch(`${API_BASE}/eventslast.php?id=${team.idTeam}`);
            const recentData = await recentRes.json();

            if (recentData?.results?.length) {
              foundMatches = recentData.results;
              break;
            }
          }
        }

        if (!foundMatches.length) throw new Error("Nenhum campeonato feminino encontrado na API");

        setMatches(foundMatches);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div>Carregando últimos jogos...</div>;
  if (err) return <div className="text-red-500">{err}</div>;

  return (
    <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <FaFutbol className="text-pink-500" />
        Últimos jogos — Futebol Feminino
      </h3>

      <ul className="divide-y divide-gray-200">
        {matches.slice(0, 5).map((m) => (
          <li key={m.idEvent} className="py-2 flex justify-between">
            <div>
              <div className="font-semibold">{m.strEvent}</div>
              <div className="text-xs text-gray-500">
                {m.dateEvent} • {m.strLeague}
              </div>
            </div>
            <div className="font-bold">
              {m.intHomeScore ?? "-"} — {m.intAwayScore ?? "-"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
