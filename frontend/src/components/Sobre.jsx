import React from "react";

const Sobre = () => {
  return (
    <section
      id="sobre"
      className="max-w-6xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Texto à esquerda */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-[#7D1FA6]">
            Sobre o Passa a Bola
          </h2>
          <p className="text-gray-700 mb-4">
            A Passa a Bola é uma empresa inovadora que visa conectar pessoas
            através de eventos esportivos e atividades comunitárias. Fundada com
            o objetivo de promover o esporte e a integração social, a empresa
            busca criar experiências únicas e divertidas para todos os
            participantes.
          </p>
          <p className="text-gray-700 mb-4">
            Nossos objetivos incluem o desenvolvimento de tecnologias para
            facilitar a participação em eventos, incentivar a prática esportiva
            e promover a inclusão social em comunidades diversas.
          </p>
          <p className="text-gray-700">
            O funcionamento da Passa a Bola é simples: os usuários se cadastram
            em nossa plataforma, participam de eventos esportivos e acumulam
            pontos que podem ser trocados por prêmios ou experiências. A empresa
            também organiza campeonatos e atividades que fortalecem o espírito
            de equipe e a socialização.
          </p>
        </div>

        {/* Imagem à direita */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="\assets\passabolafoto.jpg" // substitua pelo caminho da sua imagem
            alt="Sobre o Passa a Bola"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Sobre;
