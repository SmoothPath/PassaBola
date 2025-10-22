import React, { useState } from "react";

export default function JogaJunto() {
  const [tab, setTab] = useState("pontuacao");

  const tabs = [
    { id: "pontuacao", label: "Pontuação" },
    { id: "niveis", label: "Níveis" },
    { id: "apostas", label: "Apostas" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-12">
          <h1 className="text-4xl font-extrabold tracking-tight font-anton drop-shadow-md">
            Joga Junto
          </h1>
          <p className="mt-3 max-w-3xl text-violet-200 text-lg">
            Sistema de engajamento da comunidade — pontuação, níveis e apostas.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
        {/* Tabs */}
        <div className="inline-flex rounded-full bg-violet-100 p-1 shadow-md">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-8 py-3 text-base font-semibold rounded-full transition-all duration-300 focus:outline-none
                ${
                  tab === t.id
                    ? "bg-purple-700 text-white shadow-lg"
                    : "text-purple-700 hover:bg-purple-200 hover:text-purple-900"
                }`}
            >
              {t.label}
              {tab === t.id && (
                <span
                  className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-400"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* Conteúdos */}
        <section className="mt-12 grid gap-10">
          {tab === "pontuacao" && (
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Como você ganha pontos
                </h2>
                <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
                  <li>Presença nos jogos e eventos</li>
                  <li>Participação em quizzes / lives</li>
                  <li>Voluntariar em eventos</li>
                  <li>Convidar amigas (comprovado no app)</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Regras</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Pontos são validados pela presença/atividade registrada. Há auditorias para evitar abuso.
                </p>
              </div>
            </div>
          )}

          {tab === "niveis" && (
            <div className="rounded-3xl border border-purple-300 bg-purple-50 p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-purple-800 mb-8">Níveis</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { t: "Starter", p: "0–99", b: "Acesso básico" },
                  { t: "Playmaker", p: "100–299", b: "Fila preferencial" },
                  { t: "Capitã", p: "300–599", b: "Brinde exclusivo" },
                  { t: "Lenda", p: "600+", b: "Ingresso VIP / meet" },
                ].map((n) => (
                  <div
                    key={n.t}
                    className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm"
                  >
                    <p className="text-lg font-semibold text-purple-700 mb-2">{n.t}</p>
                    <p className="text-4xl font-extrabold text-purple-900">{n.p}</p>
                    <p className="text-md text-gray-600 mt-3">{n.b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "apostas" && (
            <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Apostas (experimento)</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ex.: aposte até 10 pts em “comparecer no próximo treino”. Se cumprir, dobra;
                se não, perde os pontos. Transparente e vinculado à presença real.
              </p>
              <p className="mt-6 text-sm text-gray-400 italic">
                *A mecânica é opcional e passa por testes de segurança/ética.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
