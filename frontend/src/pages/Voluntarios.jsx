// src/pages/Voluntarios.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Voluntarios() {
  const opcoes = [
    {
      titulo: "Quero me voluntariar",
      descricao: "Veja como se tornar um voluntário.",
      link: "/voluntarios/quero-me-voluntariar",
    },
    {
      titulo: "Ver oportunidades",
      descricao: "Eventos que precisam de voluntários.",
      link: "/voluntarios/oportunidades",
    },
    {
      titulo: "Como funciona",
      descricao: "Entenda o fluxo do voluntariado.",
      link: "/voluntarios/como-funciona",
    },
    {
      titulo: "Histórias",
      descricao: "Relatos de quem já participou.",
      link: "/voluntarios/historias",
    },
    {
      titulo: "Perguntas frequentes",
      descricao: "Tire suas dúvidas.",
      link: "/voluntarios/faq",
    },
    {
      titulo: "Fale com a equipe",
      descricao: "Fale com o time responsável.",
      link: "/voluntarios/contato",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <button
            onClick={() => window.history.back()}
            aria-label="Voltar"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10
                       px-3 py-1.5 text-sm font-medium hover:bg-white/15"
          >
            ← Voltar
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight">Voluntários</h1>
          <p className="mt-2 text-white/90">
            Construa impacto com a gente. Escolha uma opção:
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opcoes.map((opcao, i) => (
            <Link
              key={i}
              to={opcao.link}
              className="group rounded-2xl border border-violet-200 bg-white p-5 shadow-sm
                         hover:shadow-md transition relative overflow-hidden block"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br
                              from-fuchsia-50/0 to-violet-50/60 opacity-0 group-hover:opacity-100 transition" />
              <h2 className="text-lg font-bold text-slate-900">{opcao.titulo}</h2>
              <p className="mt-1 text-sm text-slate-600">{opcao.descricao}</p>
              <div className="mt-4 text-violet-700 font-semibold hover:underline">
                Abrir →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
