// frontend/src/pages/ExplorarEventos.jsx
import React, { useEffect, useState } from "react";
import { listEventos } from "../services/eventos";
import { Link } from "react-router-dom";

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

function EventCard({ evt }) {
  return (
    <div className="rounded-2xl shadow-lg bg-white p-5 transition-all hover:shadow-xl border border-slate-100">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
          {evt?.titulo?.[0]?.toUpperCase() || "E"}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-slate-800 leading-snug">
            {evt.titulo}
          </h3>
          <p className="text-sm text-slate-500 -mt-0.5">{evt.local || "—"}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Data</span>
          <span className="font-medium text-slate-800">
            {formatDate(evt.dataISO)}
          </span>
        </div>

        {evt.descricao && (
          <p className="text-slate-600 text-sm mt-1 line-clamp-2">
            {evt.descricao}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
            Capacidade: <strong>{evt.capacidade ?? 0}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
            Inscritos: <strong>{evt.inscritos?.length ?? 0}</strong>
          </span>
          {evt.status && (
            <span
              className={`px-2.5 py-1 rounded-full text-xs ${
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
      </div>

      {/* Botão de detalhes (sem hook, usando Link) */}
      <Link
        to={`/eventos/${evt.id}`}
        className="mt-5 block text-center w-full rounded-xl bg-pink-600 text-white font-semibold py-2.5 hover:bg-pink-700 active:scale-[0.99] transition"
      >
        Detalhes
      </Link>
    </div>
  );
}

export default function ExplorarEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await listEventos();
        setEventos(data?.eventos || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 text-center">
          Explorar Eventos
        </h1>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-white border border-slate-100 shadow animate-pulse"
              />
            ))}
          </div>
        ) : eventos.length === 0 ? (
          <div className="mt-10 text-center text-slate-500">
            Nenhum evento disponível no momento.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evt) => (
              <EventCard key={evt.id} evt={evt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
