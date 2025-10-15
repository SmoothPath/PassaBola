import React from "react";
import Login from "../components/Login";
import Sobre from "../components/Sobre";
import Noticias from "../components/Noticias"; // Importa o componente de notícias

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Seção de boas-vindas com vídeo */}
        <section
          id="home"
          className="relative flex items-center justify-start px-6 sm:px-12"
          style={{ height: "500px" }}
          aria-label="Seção de boas-vindas com vídeo de fundo"
        >
          {/* Vídeo de fundo */}
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

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

          {/* Container do texto */}
          <div
            className="relative z-20 max-w-xl p-6 sm:p-8 rounded-lg text-white text-left shadow-lg"
            role="region"
            aria-labelledby="home-title"
          >
            <h1
              id="home-title"
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: "#f0e9f3" }}
            >
              Bem-vinda ao Passa a Bola!
            </h1>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-6">
              Conectando mulheres através do esporte e criando experiências inesquecíveis.
            </p>
            <a
              href="#sobre"
              className="inline-block bg-[#7D1FA6] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#6b1a92] transition"
            >
              Conheça mais
            </a>
          </div>
        </section>

        {/* Seção Sobre */}
        <Sobre />

        {/* Seção de Notícias Esportivas */}
        <Noticias />

        {/* Seção de Login */}
        {/* <Login /> */}
      </main>
    </div>
  );
};

export default Home;
