// src/components/ModalFormDoacao.jsx
import React, { useState } from 'react';
import api from '../services/api';

export default function ModalFormDoacao({ isOpen, onClose, onSuccess }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');

    if (!nome.trim() || !email.trim()) {
      setFormError('Nome e email são obrigatórios.');
      return;
    }

    const valorNum = valor === '' ? 0 : Number(valor);
    if (valor !== '' && (isNaN(valorNum) || valorNum < 0)) {
      setFormError('Valor inválido.');
      return;
    }

    setSubmitting(true);
    try {
      // usa a instância api que tem a baseURL do backend
      await api.post('api/doacoes', {
        nome: nome.trim(),
        email: email.trim(),
        valor: valorNum,
        mensagem: mensagem.trim(),
      });

      setNome(''); setEmail(''); setValor(''); setMensagem('');
      if (typeof onSuccess === 'function') onSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao enviar doação:', err);
      const msg = err?.response?.data?.erro || err?.response?.data?.message || 'Não foi possível realizar a doação.';
      setFormError(msg);
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
            min="0" value={valor} onChange={e => setValor(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Mensagem (opcional)"
            value={mensagem} onChange={e => setMensagem(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          {formError && <p className="text-sm text-red-600">{formError}</p>}
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
