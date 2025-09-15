import React from "react";
import Login from "../components/Login";
import Sobre from "../components/Sobre";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <main className="flex-grow">
        
        <section className="flex flex-col lg:flex-row items-center justify-center bg-[#7D1FA6]  py-12 px-6">
  <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-white text-left">
    <h1 className="text-5xl mb-4 font-anton font-bold">Bem-vindo à Passa a Bola!</h1>
    <p className="text-xl font-agrandir">
      Conectando pessoas através do esporte e criando experiências inesquecíveis.
    </p>
  </div>

  <div className="w-full lg:w-1/2">
    <video
      className="w-full h-auto rounded-lg shadow-lg"
      autoPlay
      loop
      muted
      playsInline
      controls
    >
      <source src="/assets/videos/passaabola.mp4" type="video/mp4" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  </div>
</section>


        <Sobre />
        <Login />
      </main>

    </div>
  );
};

export default Home;
