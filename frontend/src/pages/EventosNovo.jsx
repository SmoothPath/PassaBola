import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvento } from "../services/eventos";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../components/contexts/AuthContext";

// Corrige ícones do Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Componente para centralizar o mapa
function Recenter({ lat, lon }) {
  const map = useMap();
  map.setView([lat, lon], 15);
  return null;
}

// Modal estilizado com Tailwind 4.1
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-[90%] text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function EventoNovo() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redireciona se não for admin
  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/eventos");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    titulo: "",
    dataISO: "",
    local: "",
    capacidade: "",
    descricao: "",
    status: "ativo",
  });

  const [coords, setCoords] = useState({ lat: -23.55052, lon: -46.633308 }); // SP padrão
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const buscarEndereco = async () => {
    if (!form.local) return alert("Digite o endereço do evento!");
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.local)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data || data.length === 0) return alert("Endereço não encontrado!");
      setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
    } catch (e) {
      console.error("Erro ao buscar endereço:", e);
      alert("Falha ao buscar endereço.");
    }
  };

  const onSubmit = async (e) => {
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
        latitude: coords.lat,
        longitude: coords.lon,
      });
      setShowModal(true);
    } catch (e) {
      console.error(e);
      setErr("Falha ao criar evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Criar evento</h1>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl shadow p-5 space-y-4 relative z-10"
        >
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold mb-1">Título *</label>
            <input
              className="w-full border rounded-xl px-3 py-2"
              value={form.titulo}
              onChange={(e) => set("titulo", e.target.value)}
            />
          </div>

          {/* Data/Hora e Local */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Data/Hora (ISO) *
              </label>
              <input
                type="datetime-local"
                className="w-full border rounded-xl px-3 py-2"
                value={form.dataISO}
                onChange={(e) => set("dataISO", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Local *</label>
              <input
                className="w-full border rounded-xl px-3 py-2"
                value={form.local}
                onChange={(e) => set("local", e.target.value)}
              />
              <button
                type="button"
                className="rounded-xl bg-violet-600 text-white px-3 py-1 mt-2"
                onClick={buscarEndereco}
              >
                Localizar no mapa
              </button>
            </div>
          </div>

          {/* Capacidade e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Capacidade
              </label>
              <input
                type="number"
                min="0"
                className="w-full border rounded-xl px-3 py-2"
                value={form.capacidade}
                onChange={(e) => set("capacidade", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold mb-1">Descrição</label>
            <textarea
              className="w-full border rounded-xl px-3 py-2"
              rows={4}
              value={form.descricao}
              onChange={(e) => set("descricao", e.target.value)}
            />
          </div>

          {/* Latitude e Longitude */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Latitude</label>
              <input
                type="text"
                readOnly
                value={coords.lat}
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Longitude
              </label>
              <input
                type="text"
                readOnly
                value={coords.lon}
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>
          </div>

          {/* Mapa */}
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={13}
            className="z-0"
            style={{ height: "300px", width: "100%", marginTop: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[coords.lat, coords.lon]}>
              <Popup>Local do evento</Popup>
            </Marker>
            <Recenter lat={coords.lat} lon={coords.lon} />
          </MapContainer>

          {err && <p className="text-sm text-red-600">{err}</p>}

          {/* Botões */}
          <div className="flex gap-3">
            <button
              disabled={loading}
              className="rounded-xl bg-violet-600 text-white px-4 py-2.5 font-bold disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              className="rounded-xl border px-4 py-2.5"
              onClick={() => navigate("/eventos")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>

      {/* ✅ Modal de sucesso */}
      <Modal isOpen={showModal} onClose={() => navigate("/eventos")}>
        <h2 className="text-xl font-bold mb-4 text-violet-700">
          Evento criado com sucesso!
        </h2>
        <p>
          <strong>Título:</strong> {form.titulo}
        </p>
        <p>
          <strong>Data:</strong> {form.dataISO}
        </p>
        <p>
          <strong>Local:</strong> {form.local}
        </p>
        <p>
          <strong>Capacidade:</strong> {form.capacidade}
        </p>
        <p>
          <strong>Status:</strong> {form.status}
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/eventos")}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl"
          >
            Voltar à lista
          </button>
        </div>
      </Modal>
    </div>
  );
}
