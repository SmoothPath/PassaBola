// frontend/src/pages/EventoDetalhes.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvento } from "../services/eventos";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso || "-";
  }
}

export default function EventoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evt, setEvt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const { data } = await getEvento(id);
        setEvt(data?.evento || null);
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.error || "Não foi possível carregar o evento.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-4">
          Detalhes do Evento
        </h1>

        {loading ? (
          <div className="rounded-2xl bg-white border border-slate-100 shadow h-48 animate-pulse" />
        ) : err ? (
          <div className="rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 p-4">
            {err}
          </div>
        ) : !evt ? (
          <div className="text-slate-500">Evento não encontrado.</div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-100 shadow p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                {evt?.titulo?.[0]?.toUpperCase() || "E"}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold text-slate-900">{evt.titulo}</h2>
                <p className="text-slate-500">{evt.local || "—"}</p>
              </div>
              {evt.status && (
                <span
                  className={`px-3 py-1 rounded-full text-xs self-start ${
                    evt.status === "ativo"
                      ? "bg-emerald-100 text-emerald-700"
                      : evt.status === "encerrado"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {evt.status}
                </span>
              )}
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="text-slate-600">
                <div className="font-semibold text-slate-500">Data</div>
                <div className="text-slate-800">{formatDate(evt.dataISO)}</div>
              </div>
              <div className="text-slate-600">
                <div className="font-semibold text-slate-500">Capacidade</div>
                <div className="text-slate-800">{evt.capacidade ?? 0}</div>
              </div>
              {evt.descricao && (
                <div className="sm:col-span-2">
                  <div className="font-semibold text-slate-500">Descrição</div>
                  <p className="text-slate-800">{evt.descricao}</p>
                </div>
              )}
            </div>

            {/* Inscritos dentro de Detalhes */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Inscritos</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  {evt.inscritos?.length ?? 0} pessoa(s)
                </span>
              </div>

              {evt.inscritos?.length ? (
                <ul className="mt-3 space-y-2">
                  {evt.inscritos.map((email) => (
                    <li
                      key={email}
                      className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                    >
                      {email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-slate-500">Nenhum inscrito ainda.</p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="rounded-xl bg-pink-600 text-white font-semibold px-5 py-2.5 hover:bg-pink-700"
                onClick={() => alert("Chamar POST /api/eventos/:id/inscrever aqui")}
              >
                Inscrever-se
              </button>
              <button
                className="rounded-xl border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 hover:bg-slate-100"
                onClick={() => navigate("/eventos")}
              >
                Voltar para lista
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
