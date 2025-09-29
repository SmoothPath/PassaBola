// src/components/ModalFormDoacao.jsx
import React, { useState } from 'react';

export default function ModalFormDoacao({ isOpen, onClose }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado pela doação, ${nome}! Valor: R$${valor}`);
    setNome('');
    setEmail('');
    setValor('');
    setMensagem('');
    onClose(); // Fecha o modal depois de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h1 className="text-2xl font-bold mb-2">Doe Agora</h1>
        <p className="text-gray-600 mb-4">
          Sua contribuição faz toda a diferença!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            min="1"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Mensagem (opcional)"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            Doar Agora
          </button>
        </form>
      </div>
    </div>
  );
}
