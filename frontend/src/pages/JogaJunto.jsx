// src/pages/JogaJunto.jsx
import React, { useState } from "react";

export default function JogaJunto() {
  const [tab, setTab] = useState("pontuacao");

  const tabs = [
    { id: "pontuacao", label: "Pontuação" },
    { id: "niveis", label: "Níveis" },
    { id: "apostas", label: "Apostas" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Joga Junto</h1>
          <p className="mt-2 text-white/90">
            Sistema de engajamento da comunidade — pontuação, níveis e apostas.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Tabs */}
        <div className="inline-flex rounded-2xl border border-violet-200 bg-white p-1 shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition
                ${tab === t.id
                  ? "bg-violet-700 text-white"
                  : "text-violet-700 hover:bg-violet-50"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Conteúdos */}
        <section className="mt-8 grid gap-6">
          {tab === "pontuacao" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Como você ganha pontos
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>• Presença nos jogos e eventos</li>
                  <li>• Participação em quizzes / lives</li>
                  <li>• Voluntariar em eventos</li>
                  <li>• Convidar amigas (comprovado no app)</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Regras</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Pontos são validados pela presença/atividade registrada. Há auditorias para evitar abuso.
                </p>
              </div>
            </div>
          )}

          {tab === "niveis" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Níveis</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { t: "Starter", p: "0–99", b: "Acesso básico" },
                  { t: "Playmaker", p: "100–299", b: "Fila preferencial" },
                  { t: "Capitã", p: "300–599", b: "Brinde exclusivo" },
                  { t: "Lenda", p: "600+", b: "Ingresso VIP / meet" },
                ].map((n) => (
                  <div
                    key={n.t}
                    className="rounded-xl border border-violet-200 bg-violet-50/50 p-4"
                  >
                    <p className="text-sm font-semibold text-violet-700">{n.t}</p>
                    <p className="text-2xl font-extrabold text-violet-800">{n.p}</p>
                    <p className="text-sm text-slate-700">{n.b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "apostas" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Apostas (experimento)</h2>
              <p className="mt-2 text-sm text-slate-700">
                Ex.: aposte até 10 pts em “comparecer no próximo treino”. Se cumprir, dobra;
                se não, perde os pontos. Transparente e vinculado à presença real.
              </p>
              <p className="mt-4 text-xs text-slate-500 italic">
                *A mecânica é opcional e passa por testes de segurança/ética.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
