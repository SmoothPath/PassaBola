// frontend/src/pages/EventosLista.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { listEventos, deleteEvento } from "../services/eventos";
import { useNavigate } from "react-router-dom";

export default function EventosLista() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
    
  async function load() {
    setErr("");
    try {
      setLoading(true);
      const { data } = await listEventos({ q });
      setItems(data.eventos || []);
    } catch (e) {
      setErr("Falha ao carregar eventos.");
    } finally {
      setLoading(false);
    }

    return <div style={{ padding: 24 }}>Lista de eventos</div>;

  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function onDelete(id) {
    if (!confirm("Remover este evento?")) return;
    await deleteEvento(id);
    load();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <button className="rounded-xl bg-violet-600 text-white px-4 py-2.5 font-bold"
            onClick={() => navigate("/eventos/novo")}>
            Novo evento
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 mb-3">
          <div className="flex gap-3">
            <input className="border rounded-xl px-3 py-2 w-full"
              placeholder="Buscar por título ou local..."
              value={q} onChange={(e)=>setQ(e.target.value)} />
            <button className="rounded-xl border px-4 py-2.5" onClick={load}>Buscar</button>
          </div>
        </div>

        {err && <p className="text-red-600 mb-2">{err}</p>}

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Local</th>
                <th className="text-left p-3">Capacidade</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-3" colSpan={7}>Carregando...</td></tr>
              ) : items.length === 0 ? (
                <tr><td className="p-3" colSpan={7}>Nenhum evento encontrado.</td></tr>
              ) : items.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="p-3">{e.id}</td>
                  <td className="p-3">{e.titulo}</td>
                  <td className="p-3">{e.dataISO?.replace('T',' ').slice(0,16)}</td>
                  <td className="p-3">{e.local}</td>
                  <td className="p-3">{e.capacidade}</td>
                  <td className="p-3 capitalize">{e.status}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      {/* futuro: editar */}
                      {/* <button className="rounded-xl border px-3 py-1.5" onClick={()=>navigate(`/eventos/${e.id}/editar`)}>Editar</button> */}
                      <button className="rounded-xl border px-3 py-1.5 text-rose-600 border-rose-300"
                        onClick={()=>onDelete(e.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
