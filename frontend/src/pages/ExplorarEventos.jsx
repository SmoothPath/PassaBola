import React, { useState, useEffect } from "react";
import api from "../services/api";

const ExplorarEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar todos os eventos disponíveis
  const fetchEventos = async () => {
    try {
      const res = await api.get("/eventos"); // Todos os eventos ativos
      setEventos(res.data.eventos || []);

      // Também carregamos os já inscritos para desabilitar inscrição duplicada
      const resInscricoes = await api.get("/eventos/meus/inscritos");
      setInscricoes(resInscricoes.data.eventos.map(e => e.id) || []);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Inscrever no evento
  const handleInscrever = async (id) => {
    try {
      await api.post(`/eventos/${id}/inscrever`);
      setInscricoes((prev) => [...prev, id]);
      alert("Inscrição realizada com sucesso!");
    } catch (err) {
      console.error("Erro ao inscrever-se:", err);
      alert(err.response?.data?.error || "Erro ao inscrever-se no evento");
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando eventos...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Explorar Eventos
        </h1>

        {eventos.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum evento disponível no momento.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">{evento.titulo}</h2>
                <p className="text-gray-600 mt-1">{evento.local}</p>
                <p className="text-sm text-gray-500">
                  Data: {new Date(evento.dataISO).toLocaleString("pt-BR")}
                </p>
                <p className="mt-2 text-gray-700">{evento.descricao}</p>
                <p className="mt-1 text-gray-500">
                  Capacidade: {evento.capacidade || "Ilimitada"} | Inscritos: {evento.inscritos.length}
                </p>

                <button
                  onClick={() => handleInscrever(evento.id)}
                  disabled={inscricoes.includes(evento.id)}
                  className={`mt-4 w-full py-2 px-4 rounded-xl font-medium text-white transition ${
                    inscricoes.includes(evento.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {inscricoes.includes(evento.id) ? "Inscrito" : "Inscrever-se"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
     
    </div>
  );
};

export default ExplorarEventos;
