// frontend/src/pages/EventoDetalhes.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEvento,
  updateEvento,
  deleteEvento,
  inscreverNoEvento,
  desinscreverDoEvento,
  removerInscrito, // só funciona se aplicar o patch backend opcional
  getQrDoEvento,   // 👈 ADICIONE este export no services/eventos.js (ver abaixo)
} from "../services/eventos";
import { useAuth } from "../components/contexts/AuthContext";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(d);
  } catch {
    return iso || "-";
  }
}

export default function EventoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [evt, setEvt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // form de edição (só admin)
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ titulo: "", dataISO: "", local: "", capacidade: 0, descricao: "", status: "ativo" });
  const isAdmin = user?.role === "admin" || user?.isAdmin;
  const isInscrito = useMemo(() => evt?.inscritos?.includes(user?.email), [evt, user]);

  // 👇 estado do QR
  const [qr, setQr] = useState("");
  const [qrMsg, setQrMsg] = useState("");

  async function load() {
    try {
      setErr("");
      setLoading(true);
      const { data } = await getEvento(id);
      setEvt(data?.evento || null);
      if (data?.evento) {
        const e = data.evento;
        setForm({
          titulo: e.titulo || "",
          dataISO: e.dataISO || "",
          local: e.local || "",
          capacidade: e.capacidade ?? 0,
          descricao: e.descricao || "",
          status: e.status || "ativo",
        });
      }
    } catch (e) {
      setErr(e?.response?.data?.error || "Não foi possível carregar o evento.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [id]);

  const handleInscrever = async () => {
    try {
      setQr(""); setQrMsg("");
      const { data } = await inscreverNoEvento(id);
      // backend deve retornar { ok, msg, evento, qrcodeDataUrl }
      if (data?.ok) {
        setQr(data.qrcodeDataUrl || "");
        setQrMsg(data.msg || "Inscrição confirmada!");
      }
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "Falha ao inscrever-se.");
    }
  };

  const handleDesinscrever = async () => {
    try {
      setQr(""); setQrMsg("");
      await desinscreverDoEvento(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "Falha ao sair do evento.");
    }
  };

  // 👇 buscar/regenar o QR se já inscrito
  const handleMostrarQr = async () => {
    try {
      setQr(""); setQrMsg("");
      const { data } = await getQrDoEvento(id);
      if (data?.ok) {
        setQr(data.qrcodeDataUrl || "");
        setQrMsg("QR Code carregado.");
      }
    } catch (e) {
      alert(e?.response?.data?.error || "Erro ao exibir QR.");
    }
  };

  const handleSave = async () => {
    try {
      await updateEvento(id, {
        ...form,
        capacidade: Number(form.capacidade) || 0,
      });
      setEditOpen(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "Falha ao salvar alterações.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      await deleteEvento(id);
      navigate("/admin/eventos"); // volta para a lista
    } catch (e) {
      alert(e?.response?.data?.error || "Falha ao excluir.");
    }
  };

  const handleRemoverInscrito = async (email) => {
    if (!isAdmin) return;
    if (!confirm(`Remover ${email} deste evento?`)) return;
    try {
      await removerInscrito(id, email); // requer patch de backend
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "Não foi possível remover o inscrito.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="text-sm text-slate-600 hover:text-slate-900 mb-4">← Voltar</button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-4">Detalhes do Evento</h1>

        {loading ? (
          <div className="rounded-2xl bg-white border border-slate-100 shadow h-48 animate-pulse" />
        ) : err ? (
          <div className="rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 p-4">{err}</div>
        ) : !evt ? (
          <div className="text-slate-500">Evento não encontrado.</div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-100 shadow p-6 space-y-6">
            {/* Cabeçalho */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                {evt.titulo?.[0]?.toUpperCase() || "E"}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold text-slate-900">{evt.titulo}</h2>
                <p className="text-slate-500">{evt.local || "—"}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs self-start ${
                evt.status === "ativo" ? "bg-emerald-100 text-emerald-700"
                  : evt.status === "encerrado" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                {evt.status}
              </span>
            </div>

            {/* Infos principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><div className="font-semibold text-slate-500">Data</div><div className="text-slate-800">{formatDate(evt.dataISO)}</div></div>
              <div><div className="font-semibold text-slate-500">Capacidade</div><div className="text-slate-800">{evt.capacidade ?? 0}</div></div>
              {evt.descricao && (
                <div className="sm:col-span-2"><div className="font-semibold text-slate-500">Descrição</div><p className="text-slate-800">{evt.descricao}</p></div>
              )}
            </div>

            {/* Ações do usuário */}
            {user && (
              <div className="flex flex-wrap gap-3">
                {!isInscrito ? (
                  <button onClick={handleInscrever} className="rounded-xl bg-pink-600 text-white font-semibold px-5 py-2.5 hover:bg-pink-700">
                    Inscrever-se
                  </button>
                ) : (
                  <>
                    <button onClick={handleDesinscrever} className="rounded-xl border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 hover:bg-slate-100">
                      Cancelar inscrição
                    </button>
                    <button onClick={handleMostrarQr} className="rounded-xl bg-indigo-600 text-white font-semibold px-5 py-2.5 hover:bg-indigo-700">
                      Mostrar meu QR
                    </button>
                  </>
                )}
              </div>
            )}

            {/* QR Code */}
            {(qr || qrMsg) && (
              <div className="rounded-xl border border-slate-200 p-4">
                {qrMsg && <p className="text-slate-700 mb-2">{qrMsg}</p>}
                {qr && (
                  <>
                    <img src={qr} alt="QR Code do evento" className="w-64 h-64 object-contain border rounded" />
                    <a
                      href={qr}
                      download={`qrcode-evento-${id}.png`}
                      className="inline-block mt-2 text-indigo-600 underline"
                    >
                      Baixar QR Code
                    </a>
                  </>
                )}
              </div>
            )}

            {/* Inscritos */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Inscritos</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  {evt.inscritos?.length ?? 0} pessoa(s)
                </span>
              </div>
              {evt.inscritos?.length ? (
                <ul className="mt-3 space-y-2">
                  {evt.inscritos.map((email) => (
                    <li key={email} className="flex items-center justify-between text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                      <span>{email}</span>
                      {isAdmin && (
                        <button
                          onClick={() => handleRemoverInscrito(email)}
                          className="text-rose-600 hover:text-rose-700"
                          title="Remover deste evento"
                        >
                          Remover
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : <p className="mt-3 text-sm text-slate-500">Nenhum inscrito ainda.</p>}
            </div>

            {/* Painel admin */}
            {isAdmin && (
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-bold text-slate-900">Gerenciamento</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button onClick={() => setEditOpen(!editOpen)} className="rounded-xl border border-slate-300 text-slate-700 font-semibold px-4 py-2.5 hover:bg-slate-100">
                    {editOpen ? "Fechar edição" : "Editar dados"}
                  </button>
                  <button onClick={handleDelete} className="rounded-xl bg-rose-600 text-white font-semibold px-4 py-2.5 hover:bg-rose-700">
                    Excluir evento
                  </button>
                </div>

                {editOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input className="border rounded-xl px-3 py-2" placeholder="Título" value={form.titulo} onChange={(e)=>setForm(f=>({...f,titulo:e.target.value}))}/>
                    <input className="border rounded-xl px-3 py-2" placeholder="Data ISO (YYYY-MM-DDTHH:mm)" value={form.dataISO} onChange={(e)=>setForm(f=>({...f,dataISO:e.target.value}))}/>
                    <input className="border rounded-xl px-3 py-2" placeholder="Local" value={form.local} onChange={(e)=>setForm(f=>({...f,local:e.target.value}))}/>
                    <input type="number" className="border rounded-xl px-3 py-2" placeholder="Capacidade" value={form.capacidade} onChange={(e)=>setForm(f=>({...f,capacidade:e.target.value}))}/>
                    <select className="border rounded-xl px-3 py-2" value={form.status} onChange={(e)=>setForm(f=>({...f,status:e.target.value}))}>
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                      <option value="encerrado">Encerrado</option>
                    </select>
                    <textarea rows={3} className="border rounded-xl px-3 py-2 sm:col-span-2" placeholder="Descrição" value={form.descricao} onChange={(e)=>setForm(f=>({...f,descricao:e.target.value}))}/>
                    <div className="sm:col-span-2">
                      <button onClick={handleSave} className="rounded-xl bg-violet-600 text-white font-semibold px-5 py-2.5 hover:bg-violet-700">Salvar alterações</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
