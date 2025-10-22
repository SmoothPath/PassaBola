import React from "react";

const partners = [
  {
    name: "YouTube",
    logo: "youtube.png",
    description: "Parceiro para a transmissão do Campeonato Paulista Feminino.",
    url: "https://www.youtube.com/@passabola",
  },
  {
    name: "NWB",
    logo: "assets/nwb.png",
    description: "Produtora de conteúdo que apoia a criação de vídeos e transmissões.",
    url: "https://www.nwb.com.br/",
  },
  {
    name: "Centauro",
    logo: "assets/centauro.png",
    description: "Rede de varejo esportivo patrocinando o futebol feminino.",
    url: "https://www.centauro.com.br/",
  },
  {
    name: "Penalty",
    logo: "assets/penalty.png",
    description: "Marca que fornece bolas e materiais esportivos para o futebol feminino.",
    url: "https://www.penalty.com.br/",
  },
];

const Parceiros = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-100 py-20 px-6" style={{ backgroundImage: 'radial-gradient(circle at top left, rgba(167,139,250,0.1) 0%, transparent 60%)' }}>
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-violet-500 mb-16 drop-shadow-md">
        Nossos Parceiros
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
          >
            <div className="w-28 h-28 mb-8 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-2xl text-violet-700 mb-4 group-hover:text-violet-900 transition">
              {partner.name}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {partner.description}
            </p>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-violet-700 text-white px-6 py-2 rounded-full text-sm font-semibold absolute bottom-8 focus:outline-none shadow-md hover:bg-violet-800"
              aria-label={`Visitar site do parceiro ${partner.name}`}
            >
              Saiba mais
            </button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Parceiros;
