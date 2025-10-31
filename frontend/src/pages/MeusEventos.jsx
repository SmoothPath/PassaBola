import React, { useState, useEffect } from "react";
import api from "../services/api";

const MeusEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <p className="text-center mt-10 text-purple-700 font-semibold animate-pulse">
        Carregando eventos...
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Meus Eventos
        </h1>

        {eventos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Você ainda não se inscreveu em nenhum evento.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-purple-700 mb-1">
                  {evento.titulo}
                </h2>
                <p className="text-gray-600 font-medium">{evento.local}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Data: {new Date(evento.dataISO).toLocaleString("pt-BR")}
                </p>
                <p className="text-gray-700 mb-4">{evento.descricao}</p>

                <button
                  onClick={() => cancelarInscricao(evento.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 active:scale-95"
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
