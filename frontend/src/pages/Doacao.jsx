import React, { useState } from 'react';

export default function Doacao() {
  // Estados para controlar os inputs do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função que será chamada no submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado pela doação, ${nome}! Valor: R$${valor}`);
    setNome('');
    setEmail('');
    setValor('');
    setMensagem('');
  };

  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <button
          onClick={handleVoltar}
          aria-label="Voltar para a página anterior"
          className="mb-4 px-4 py-2 rounded-md border border-gray-300 bg-purple-700 text-white hover:bg-purple-800 transition"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Doe Agora</h1>
        <p className="text-gray-600 mb-6">
          Sua contribuição faz toda a diferença! Ajude-nos a continuar esse projeto incrível.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor da Doação (R$)
            </label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 50"
              min="1"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
              Mensagem (Opcional)
            </label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Deixe uma mensagem para nós"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
          >
            Doar Agora
          </button>
        </form>
      </div>
    </div>
  );
}
