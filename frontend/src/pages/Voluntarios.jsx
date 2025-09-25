// src/pages/Voluntarios.jsx
import React from "react";

const Voluntarios = () => {
  const opcoes = [
    {
      titulo: "Quero me voluntariar",
      descricao: "Veja como se tornar um voluntário.",
      link: "/voluntarios/quero-ser",
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

  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <div className="px-4 py-8 text-center">
      {/* Botão Voltar */}
      <button
        onClick={handleVoltar}
        aria-label="Voltar para a página anterior"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-md border-2 border-[#7D1FA6] bg-[#F9F7FC] text-[#3F1A73] font-semibold transition-colors hover:bg-[#7D1FA6] hover:text-white"
      >
        ← Voltar
      </button>

      {/* Título */}
      <h1 className="mb-8 text-2xl font-semibold">Voluntários</h1>

      {/* Cards */}
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
            <a
              href={opcao.link}
              className="font-bold text-[#D95F80] hover:text-[#9124BF] transition-colors"
            >
              Saiba mais
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voluntarios;
