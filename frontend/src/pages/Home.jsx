import React from "react";
import Login from "../components/Login";
import Sobre from "../components/Sobre";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <main className="flex-grow">
        
      <section
          id="home"
          className="relative flex items-center px-6"
          style={{ height: "400px" }}
          aria-label="Seção de boas-vindas com vídeo de fundo"
        >
          {/* Vídeo de fundo */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/videos/passaabola.mp4"
            aria-hidden="true"
            tabIndex={-1}
          />
       {/* Container do texto */}
          <div
            className="relative z-20 max-w-md p-6 rounded-md text-white font-anton text-left shadow-lg ml-10"
            role="region"
            aria-labelledby="home-title"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo preto semi-transparente para legibilidade
            }}
          >
            <h1
              id="home-title"
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ whiteSpace: "normal", overflow: "visible", textOverflow: "unset" }}
            >
              Bem-vinda ao Passa a Bola!
            </h1>
            <p className="text-lg font-medium leading-relaxed mt-2">
              Conectando mulheres através do esporte e criando experiências inesquecíveis.
            </p>
          </div>
        </section>
        <Sobre />
        <Login />
      </main>

    </div>
  );
};

export default Home;
