import React from "react";
import Sobre from "../components/Sobre";
import Noticias from "../components/Noticias";
import TeamInfo from "../components/LastMatches";
import LastMatches from "../components/LastMatches";

const Home = () => {
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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "#f0e9f3" }}>
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

        {/* Sobre o projeto */}
        <Sobre />

        {/* Notícias */}
        <Noticias />

        {/* Últimos placares de futebol feminino */}
      < LastMatches />
      </main>
    </div>
  );
};

export default Home;
