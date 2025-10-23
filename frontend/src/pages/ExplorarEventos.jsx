import React, { useEffect, useState } from "react";
import { listEventos } from "../services/eventos";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Info } from "lucide-react";

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
    <div className="rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="p-6 flex flex-col justify-between h-full">
        {/* Cabeçalho */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-inner">
            {evt?.titulo?.[0]?.toUpperCase() || "E"}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
              {evt.titulo}
            </h3>
            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
              <MapPin className="w-4 h-4" />
              {evt.local || "—"}
            </div>
          </div>
        </div>

        {/* Detalhes principais */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-fuchsia-600" />
              <span className="text-slate-500">Data</span>
            </div>
            <span className="font-medium">{formatDate(evt.dataISO)}</span>
          </div>

          {evt.descricao && (
            <p className="text-slate-600 text-sm mt-2 italic line-clamp-2">
              “{evt.descricao}”
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-fuchsia-500" />
              Capacidade: <strong>{evt.capacidade ?? 0}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-violet-500" />
              Inscritos: <strong>{evt.inscritos?.length ?? 0}</strong>
            </span>
            {evt.status && (
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
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

        {/* Botão */}
        <Link
          to={`/eventos/${evt.id}`}
          className="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold py-2.5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <Info className="w-4 h-4" />
          Ver Detalhes
        </Link>
      </div>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white py-14 text-center shadow-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
          🌟 Explorar Eventos
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          Descubra os próximos eventos e participe das atividades do Passa a Bola.
        </p>
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 rounded-2xl bg-white border border-slate-200 shadow animate-pulse"
              />
            ))}
          </div>
        ) : eventos.length === 0 ? (
          <div className="mt-16 text-center text-slate-500 text-lg">
            Nenhum evento disponível no momento.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map((evt) => (
              <EventCard key={evt.id} evt={evt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
