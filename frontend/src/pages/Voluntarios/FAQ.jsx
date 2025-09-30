import React from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      q: "Preciso de experiência prévia?",
      a: "Não. Há funções de entrada e treinamos com briefing claro.",
    },
    {
      q: "Posso receber certificado?",
      a: "Sim, emitimos horas de voluntariado após participação confirmada.",
    },
    {
      q: "Existe limite de idade?",
      a: "Atividades variam por exigência física. Menores precisam de autorização.",
    },
    {
      q: "Como funciona a pontuação?",
      a: "Check-in via QR + cumprimento da função geram pontos no JogaJunto.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      {/* header */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            to="/voluntarios"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/15"
          >
            ← Voltar
          </Link>
          <h1 className="font-[Anton] text-3xl font-extrabold tracking-tight">
            Perguntas frequentes
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Tire suas dúvidas antes de começar.
          </p>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-left">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-sm font-bold text-slate-900">{f.q}</h3>
                  <span className="shrink-0 rounded-full border border-violet-200 px-2 py-0.5 text-xs font-semibold text-violet-700 transition group-open:bg-violet-700 group-open:text-white">
                    Abrir
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="text-sm text-slate-600">
            Não encontrou sua dúvida?
          </span>
          <Link
            to="/voluntarios/contato"
            className="rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-800"
          >
            Fale com a equipe
          </Link>
        </div>
      </main>
    </div>
  );
}
