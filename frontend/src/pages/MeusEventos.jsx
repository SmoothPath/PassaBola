import React, { useState, useEffect } from "react";
import api from "../services/api";

const MeusEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar eventos inscritos
  const fetchMeusEventos = async () => {
    try {
      const res = await api.get("/eventos/meus/inscritos");
      setEventos(res.data.eventos || []);
    } catch (err) {
      console.error("Erro ao buscar meus eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cancelar inscrição
  const cancelarInscricao = async (id) => {
    try {
      await api.post(`/eventos/${id}/cancelar`);
      setEventos((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Erro ao cancelar inscrição:", err);
    }
  };

  useEffect(() => {
    fetchMeusEventos();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando eventos...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Meus Eventos</h1>

        {eventos.length === 0 ? (
          <p className="text-center text-gray-600">Você ainda não se inscreveu em nenhum evento.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold">{evento.titulo}</h2>
                <p className="text-gray-600">{evento.local}</p>
                <p className="text-sm text-gray-500">
                  Data: {new Date(evento.dataISO).toLocaleString("pt-BR")}
                </p>
                <p className="mt-2">{evento.descricao}</p>

                <button
                  onClick={() => cancelarInscricao(evento.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl w-full transition"
                >
                  Cancelar inscrição
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
     
    </div>
  );
};

export default MeusEventos;
