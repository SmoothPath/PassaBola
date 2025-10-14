import React from "react";
import { Link } from "react-router-dom";

export default function Oportunidades() {
  const vagas = [
    { titulo: "Copa Passa a Bola — Recepção", data: "25/10/2025", local: "Ginásio Central", slots: 8 },
    { titulo: "Treino Aberto — Mídias", data: "02/11/2025", local: "Arena Leste", slots: 4 },
    { titulo: "Peneira — Arbitragem Auxiliar", data: "09/11/2025", local: "Quadra Sul", slots: 6 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
          <Link
            to="/voluntarios"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            ← Voltar
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight font-anton">
            Oportunidades de voluntariado
          </h1>
          <p className="mt-2 text-white/90 max-w-2xl text-lg">
            Confira as vagas abertas e participe.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-xs font-semibold">
              Abertas
            </span>
            <span className="rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-xs font-semibold">
              Presencial
            </span>
            <span className="rounded-full bg-violet-100 text-violet-700 px-3 py-1 text-xs font-semibold">
              Esporte
            </span>
          </div>
          <Link
            to="/voluntarios/como-funciona"
            className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Como funciona?
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vagas.map((v, i) => (
            <article
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-slate-900">{v.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                <strong>Data:</strong> {v.data}
                <br />
                <strong>Local:</strong> {v.local}
                <br />
                <strong>Vagas:</strong> {v.slots}
              </p>
              <div className="mt-4 flex gap-3">
                {/* Você pode trocar por Link se for navegar para outra página */}
                <button
                  type="button"
                  className="rounded-lg bg-violet-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-800 transition"
                >
                  Aplicar
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
