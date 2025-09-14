import React, { useState } from 'react';
import '../styles/global.css'; // ou o caminho correto para seu CSS global

export default function Doacao() {
  // Estados para controlar os inputs do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função que será chamada no submit do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    alert(`Obrigado pela doação, ${nome}! Valor: R$${valor}`);
    // Resetar o formulário
    setNome('');
    setEmail('');
    setValor('');
    setMensagem('');
  };

  return (
    <div className="doacao-container">
      <h1>Doe Agora</h1>
      <p>Sua contribuição faz toda a diferença! Ajude-nos a continuar esse projeto incrível.</p>
      
      <form className="doacao-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Completo</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor email"
          required
        />

        <label htmlFor="valor">Valor da Doação (R$)</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Ex: 50"
          min="1"
          required
        />

        <label htmlFor="mensagem">Mensagem (Opcional)</label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Deixe uma mensagem para nós"
        />

        <button type="submit">Doar Agora</button>
      </form>
    </div>
  );
}
