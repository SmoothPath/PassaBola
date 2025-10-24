// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Sobre from "../components/Sobre";
import Noticias from "../components/Noticias";
import LastMatches from "../components/LastMatches";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      // Garante que posts seja sempre um array
      const data = res.data.posts || res.data;
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar postagens:", err);
      setPosts([]); // fallback seguro
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
          <div className="relative z-20 max-w-xl p-6 sm:p-8 rounded-lg text-white shadow-lg">
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

          {posts.length === 0 ? (
            <p className="text-gray-600">Nenhuma postagem disponível.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
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
