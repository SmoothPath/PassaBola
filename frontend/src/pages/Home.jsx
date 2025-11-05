// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Sobre from "../components/Sobre";
import Noticias from "../components/Noticias";
import LastMatches from "../components/LastMatches";
import { postsService } from "../services/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postsService.getAll();
      // Garante que posts seja sempre um array
      const postsData = response.posts || response || [];
      setPosts(Array.isArray(postsData) ? postsData : []);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar postagens:", err);
      setError("Erro ao carregar postagens");
      setPosts([]); // fallback seguro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Boas-vindas com vídeo */}
        <section
          id="home"
          className="relative flex items-center justify-start px-6 sm:px-12"
          style={{ height: "500px" }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/videos/passaabola.mp4"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative z-20 max-w-xl p-6 sm:p-8 rounded-lg text-white">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: "#f0e9f3" }}
            >
              Bem-vinda ao Passa a Bola!
            </h1>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-6">
              Conectando mulheres através do esporte e criando experiências
              inesquecíveis.
            </p>
            <a
              href="#sobre"
              className="inline-block bg-[#7D1FA6] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#6b1a92] transition"
            >
              Conheça mais
            </a>
          </div>
        </section>

        {/* Sobre o projeto */}
        <Sobre />

        {/* Notícias */}
        <Noticias />

        {/* Últimos placares de futebol feminino */}
        <LastMatches />

        {/* -------------------- SEÇÃO DE POSTAGENS -------------------- */}
        <section className="max-w-5xl mx-auto my-12 px-6 sm:px-12">
          <h2 className="text-2xl font-bold mb-6 text-violet-700">
            Últimas Postagens
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
              <p className="font-semibold">Erro ao carregar postagens</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={fetchPosts}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Nenhuma postagem disponível no momento.</p>
              <p className="text-gray-500 text-sm mt-2">
                Novas postagens aparecerão aqui em breve!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <span className="font-medium">{post.author}</span>
                    <span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;