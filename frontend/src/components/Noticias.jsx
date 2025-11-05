import React, { useEffect, useState } from "react";
import { getSportsNews } from "../services/newsService";

const NewspaperIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-[#7D1FA6]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6M9 8h6" />
  </svg>
);

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSportsNews();

        // Filtrar apenas notícias relacionadas ao futebol feminino
        const filtradas = data.filter((noticia) => {
          const titulo = noticia.title?.toLowerCase() || "";
          const descricao = noticia.description?.toLowerCase() || "";
          return (
            titulo.includes("futebol feminino") ||
            titulo.includes("women") ||
            titulo.includes("feminino") ||
            descricao.includes("futebol feminino") ||
            descricao.includes("women's football") ||
            descricao.includes("feminino")
          );
        });

        setNoticias(filtradas);
        setErro(filtradas.length === 0);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, []);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white py-12 px-6 sm:px-12" id="noticias">
      <div className="max-w-6xl mx-auto">
        {/* Título com ícone */}
        <div className="flex items-center gap-3 mb-8">
          <NewspaperIcon />
          <h2
            className="text-3xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #7D1FA6, #B97FC9, #7D1FA6)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Últimas Notícias de Futebol Feminino
          </h2>
        </div>
        <div className="w-16 h-1 mb-3 rounded-full bg-gradient-to-r from-[#7D1FA6] via-[#B97FC9] to-[#7D1FA6]" />

        {/* Mensagens de erro ou carregamento */}
        {erro ? (
          <p className="text-red-500 font-medium">
            Não foi possível carregar notícias de futebol feminino. Tente novamente mais tarde.
          </p>
        ) : carregando ? (
          <p className="text-gray-600 font-medium">Carregando notícias...</p>
        ) : noticias.length === 0 ? (
          <p className="text-gray-600 font-medium">Nenhuma notícia encontrada.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.slice(0, 6).map((noticia, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition bg-white"
              >
                {noticia.urlToImage ? (
                  <img
                    src={noticia.urlToImage}
                    alt={`Imagem da notícia: ${noticia.title}`}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-md mb-4 text-gray-400 text-sm">
                    Sem imagem disponível
                  </div>
                )}

                <a
                  href={noticia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg font-semibold text-[#333] hover:text-[#7D1FA6] transition"
                >
                  {noticia.title}
                </a>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {noticia.description || "Sem descrição disponível."}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  Publicado em: {formatarData(noticia.publishedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Noticias;
