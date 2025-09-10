import React from "react";
import logo from "../assets/logo.png"; // coloque um logo.png em src/assets

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Passa a Bola" className="logo" />
        <h1 className="brand">PASSA A BOLA</h1>
      </div>
      <nav className="navbar-right">
        <a href="#">Perfil</a>
        <a href="#">Camisa 10</a>
        <a href="#">Joga Junto</a>
        <a href="#">Voluntários</a>
        <a href="#">Doação</a>
        <a href="#">Painel Administrativo</a>
      </nav>
    </header>
  );
}