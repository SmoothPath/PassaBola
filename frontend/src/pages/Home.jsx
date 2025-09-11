import React from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import videoBg from "../assets/passa.mp4";
import Login from "../components/Login";

export default function Home() {
  return (
    <div className="page">
      <Navbar /> {/* 👈 cabeçalho aparece no topo */}

      {/* Vídeo de fundo */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={videoBg} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
        <div className="overlay">
          <h1 className="title">PASSA A BOLA</h1>
        </div>
      </div>

      {/* Conteúdo depois do vídeo */}
      <main className="container">
        <section className="stats-grid">
          <StatsCard value="+10" label="Eventos criados" color="#4D1473" />
          <StatsCard value="124" label="Participantes ativos" color="3F1859" />
          <StatsCard value="86" label="Presenças registradas" color="CB5B85" />
          <StatsCard value="23" label="Ausências registradas" color="588C23" />
        </section>
        <section>
          <Login/>
        </section>
      </main>
    </div>
  );
}
