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
      descricao: "Veja eventos que precisam de voluntários.",
      link: "/voluntarios/oportunidades",
    },
    {
      titulo: "Histórias de voluntários",
      descricao: "Conheça quem já faz parte.",
      link: "/voluntarios/historias",
    },
    {
      titulo: "Como funciona?",
      descricao: "Entenda como funciona o processo de voluntariado.",
      link: "/voluntarios/como-funciona",
    },
    {
      titulo: "Perguntas frequentes",
      descricao: "Tire suas dúvidas sobre o voluntariado.",
      link: "/voluntarios/faq",
    },
    {
      titulo: "Fale com a equipe",
      descricao: "Entre em contato com o time responsável.",
      link: "/voluntarios/contato",
    },
  ];

  return (
    <div className="px-4 py-8 text-center">
      <button
        onClick={() => window.history.back()}
        aria-label="Voltar para a página anterior"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-md border-2 border-[#7D1FA6] bg-[#F9F7FC] text-[#3F1A73] font-semibold transition-colors hover:bg-[#7D1FA6] hover:text-white"
      >
        ← Voltar
      </button>

      <h1 className="mb-8 text-2xl font-semibold">Voluntários</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {opcoes.map((opcao, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#F26D9E] rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform text-left flex flex-col justify-between"
          >
            <h2 className="mb-2 text-lg font-bold text-[#3F1A73]">
              {opcao.titulo}
            </h2>
            <p className="mb-4 text-sm text-[#333]">{opcao.descricao}</p>

            {opcao.onClick ? (
              <button
                onClick={opcao.onClick}
                className="font-bold text-[#D95F80] hover:text-[#9124BF] transition-colors text-left"
              >
                Saiba mais
              </button>
            ) : (
              <Link
                to={opcao.link}
                className="font-bold text-[#D95F80] hover:text-[#9124BF] transition-colors"
              >
                Saiba mais
              </Link>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Quero me voluntariar</h2>
            <p className="mb-4">
              Obrigado pelo interesse em se voluntariar! Por favor, entre em
              contato pelo email:{" "}
              <a
                href="mailto:voluntarios@exemplo.com"
                className="text-purple-600 underline"
              >
                voluntarios@exemplo.com
              </a>{" "}
              ou ligue para (11) 99999-9999.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 rounded-xl bg-purple-700 text-white px-4 py-2 hover:bg-purple-800 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
