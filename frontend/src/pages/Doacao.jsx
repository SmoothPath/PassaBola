// src/pages/Doacao.jsx
import React, { useState } from 'react';
import ModalFormDoacao from '../components/ModalFormDoacao';
import GraficoDoacoes from '../components/GraficoDoacoes';

export default function Doacao() {
  const [showModal, setShowModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleVoltar = () => {
    window.history.back();
  };

  // Incrementa o gatilho de refresh quando uma doação é feita
  const handleDoacaoSucesso = () => {
    setRefreshCount((count) => count + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      {/* Card de chamada para doação */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <button
          onClick={handleVoltar}
          className="mb-4 px-4 py-2 rounded-md border border-gray-300 bg-purple-700 text-white hover:bg-purple-800 transition"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Ajude o Projeto
        </h1>
        <p className="text-gray-600 mb-6">
          Clique no botão abaixo para realizar uma doação. Toda ajuda é bem-vinda!
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Abrir Formulário de Doação
        </button>
      </div>

      {/* Modal de formulário de doação */}
      <ModalFormDoacao
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleDoacaoSucesso}
      />

      {/* Gráfico de doações que refaz o fetch sempre que `refreshCount` muda */}
      <GraficoDoacoes refreshTrigger={refreshCount} />
    </div>
  );
}
