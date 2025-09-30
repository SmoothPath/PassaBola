// src/pages/Voluntarios.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Voluntarios() {
  const [showModal, setShowModal] = useState(false);

  const opcoes = [
    {
      titulo: "Quero me voluntariar",
      descricao: "Veja como se tornar um voluntário.",
      onClick: () => setShowModal(true),
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
            <div
              key={i}
              className="group rounded-2xl border border-violet-200 bg-white p-5 shadow-sm
                         hover:shadow-md transition relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br
                              from-fuchsia-50/0 to-violet-50/60 opacity-0 group-hover:opacity-100 transition" />
              <h2 className="text-lg font-bold text-slate-900">{opcao.titulo}</h2>
              <p className="mt-1 text-sm text-slate-600">{opcao.descricao}</p>

              <div className="mt-4">
                {opcao.onClick ? (
                  <button
                    onClick={opcao.onClick}
                    className="text-violet-700 font-semibold hover:underline"
                  >
                    Saiba mais →
                  </button>
                ) : (
                  <Link
                    to={opcao.link}
                    className="text-violet-700 font-semibold hover:underline"
                  >
                    Abrir →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal “Quero me voluntariar” */}
      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
            <h3 className="text-xl font-extrabold text-slate-900">Como me tornar voluntária(o)?</h3>
            <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal list-inside">
              <li>Crie/acesse sua conta.</li>
              <li>Complete seu perfil e disponibilidade.</li>
              <li>Escolha um evento com vagas e aplique.</li>
              <li>Confirme presença e siga as instruções do time.</li>
            </ol>
            <p className="mt-4 text-sm text-slate-600">
              Dúvidas? Envie e-mail para{" "}
              <a href="mailto:voluntarios@exemplo.com" className="text-violet-700 underline">
                voluntarios@exemplo.com
              </a>.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Fechar
              </button>
              <Link
                to="/voluntarios/como-funciona"
                className="rounded-xl bg-violet-700 px-4 py-2 font-semibold text-white hover:bg-violet-800"
                onClick={() => setShowModal(false)}
              >
                Ver passo a passo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
