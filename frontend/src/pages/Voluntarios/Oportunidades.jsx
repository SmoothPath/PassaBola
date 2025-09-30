import React from "react";
import { Link } from "react-router-dom";

export default function Oportunidades() {
  const vagas = [
    { titulo: "Copa Passa a Bola — Recepção", data: "25/10/2025", local: "Ginásio Central", slots: 8 },
    { titulo: "Treino Aberto — Mídias", data: "02/11/2025", local: "Arena Leste", slots: 4 },
    { titulo: "Peneira — Arbitragem Auxiliar", data: "09/11/2025", local: "Quadra Sul", slots: 6 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link to="/voluntarios" className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/15">
            ← Voltar
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight font-[Anton]">Oportunidades de voluntariado</h1>
          <p className="mt-2 text-white/90 max-w-2xl">Confira as vagas abertas e participe.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-100 text-violet-700 px-2 py-1 text-xs font-semibold">Abertas</span>
            <span className="rounded-full bg-violet-100 text-violet-700 px-2 py-1 text-xs font-semibold">Presencial</span>
            <span className="rounded-full bg-violet-100 text-violet-700 px-2 py-1 text-xs font-semibold">Esporte</span>
          </div>
          <Link to="/voluntarios/como-funciona" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Como funciona?
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vagas.map((v, i) => (
            <article key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">{v.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Data:</strong> {v.data}
                <br />
                <strong>Local:</strong> {v.local}
                <br />
                <strong>Vagas:</strong> {v.slots}
              </p>
              <div className="mt-4 flex gap-3">
                <button className="rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-800">
                  Aplicar
                </button>
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
