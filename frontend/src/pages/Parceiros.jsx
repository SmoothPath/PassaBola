import React from 'react';

const partners = [
  {
    name: 'YouTube',
    logo: 'youtube.png', // Caminho para o logo
    description: 'Parceiro para a transmissão do Campeonato Paulista Feminino.'
  },
  {
    name: 'NWB',
    logo: '/path/to/nwb-logo.png',
    description: 'Produtora de conteúdo que apoia a criação de vídeos e transmissões.'
  },
  {
    name: 'Centauro',
    logo: '/path/to/centauro-logo.png',
    description: 'Rede de varejo esportivo patrocinando o futebol feminino.'
  },
  {
    name: 'Penalty',
    logo: '/path/to/penalty-logo.png',
    description: 'Marca que fornece bolas e materiais esportivos para o futebol feminino.'
  }
];

const Parceiros = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Nossos Parceiros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h3 className="font-semibold text-lg">{partner.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parceiros;
