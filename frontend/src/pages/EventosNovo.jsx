// frontend/src/pages/EventoNovo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvento } from "../services/eventos";

export default function EventoNovo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    dataISO: "",
    local: "",
    capacidade: "",
    descricao: "",
    status: "ativo",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.titulo || !form.dataISO || !form.local) {
      setErr("Preencha título, data e local.");
      return;
    }
    try {
      setLoading(true);
      await createEvento({
        ...form,
        capacidade: Number(form.capacidade || 0),
      });
      navigate("/eventos");
    } catch (e) {
      setErr("Falha ao criar evento.");
    } finally {
      setLoading(false);
    }
    return <div style={{ padding: 24 }}>Novo evento</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Criar evento</h1>
        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Título *</label>
            <input className="w-full border rounded-xl px-3 py-2"
              value={form.titulo} onChange={(e)=>set('titulo', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Data/Hora (ISO) *</label>
              <input type="datetime-local" className="w-full border rounded-xl px-3 py-2"
                value={form.dataISO} onChange={(e)=>set('dataISO', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Local *</label>
              <input className="w-full border rounded-xl px-3 py-2"
                value={form.local} onChange={(e)=>set('local', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Capacidade</label>
              <input type="number" min="0" className="w-full border rounded-xl px-3 py-2"
                value={form.capacidade} onChange={(e)=>set('capacidade', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select className="w-full border rounded-xl px-3 py-2"
                value={form.status} onChange={(e)=>set('status', e.target.value)}>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Descrição</label>
            <textarea className="w-full border rounded-xl px-3 py-2" rows={4}
              value={form.descricao} onChange={(e)=>set('descricao', e.target.value)} />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}

          <div className="flex gap-3">
            <button disabled={loading}
              className="rounded-xl bg-violet-600 text-white px-4 py-2.5 font-bold disabled:opacity-60">
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button type="button" className="rounded-xl border px-4 py-2.5"
              onClick={()=>navigate("/eventos")}>
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
 