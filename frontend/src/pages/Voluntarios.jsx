// src/pages/Voluntarios.jsx
import React from 'react';

const Voluntarios = () => {
  const opcoes = [
    {
      titulo: 'Quero me voluntariar',
      descricao: 'Veja como se tornar um voluntário.',
      link: '/voluntarios/quero-ser',
    },
    {
      titulo: 'Ver oportunidades',
      descricao: 'Veja eventos que precisam de voluntários.',
      link: '/voluntarios/oportunidades',
    },
    {
      titulo: 'Histórias de voluntários',
      descricao: 'Conheça quem já faz parte.',
      link: '/voluntarios/historias',
    },
    {
      titulo: 'Como funciona?',
      descricao: 'Entenda como funciona o processo de voluntariado.',
      link: '/voluntarios/como-funciona',
    },
    {
      titulo: 'Perguntas frequentes',
      descricao: 'Tire suas dúvidas sobre o voluntariado.',
      link: '/voluntarios/faq',
    },
    {
      titulo: 'Fale com a equipe',
      descricao: 'Entre em contato com o time responsável.',
      link: '/voluntarios/contato',
    },
  ];

  return (
    <div className="voluntarios-container">
      <h1>Voluntários</h1>
      <div className="cards-container">
        {opcoes.map((opcao, index) => (
          <div key={index} className="card-voluntario">
            <h2>{opcao.titulo}</h2>
            <p>{opcao.descricao}</p>
            <a href={opcao.link}>Saiba mais</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voluntarios;
