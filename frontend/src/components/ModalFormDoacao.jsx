// src/components/ModalFormDoacao.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ModalFormDoacao({ isOpen, onClose, onSuccess }) {
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [valor, setValor]     = useState('');
  const [mensagem, setMensagem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post('/api/doacoes', { nome, email, valor: +valor, mensagem });
      onSuccess();    // avisa ao pai que hook de refresh deve rodar
      onClose();      // fecha o modal
      // limpa campos
      setNome(''); setEmail(''); setValor(''); setMensagem('');
    } catch (err) {
      console.error(err);
      alert('Não foi possível realizar a doação.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">✕</button>
        <h2 className="text-2xl font-bold mb-4">Formulário de Doação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Seu nome"
            value={nome} onChange={e => setNome(e.target.value)}
            required className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email" placeholder="Seu email"
            value={email} onChange={e => setEmail(e.target.value)}
            required className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number" placeholder="Valor (R$)"
            min="1" value={valor} onChange={e => setValor(e.target.value)}
            required className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Mensagem (opcional)"
            value={mensagem} onChange={e => setMensagem(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            {submitting ? 'Enviando…' : 'Doar Agora'}
          </button>
        </form>
      </div>
    </div>
  );
}
