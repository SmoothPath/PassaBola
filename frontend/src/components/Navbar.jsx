// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Passa a Bola" className="logo" />
        <h1 className="brand">PASSA A BOLA</h1>
      </div>
      <div className="navbar-right">
        <Link to="/">LOGIN</Link>
        <Link to="/">CAMISA 10</Link>
        <Link to="/">JOGA JUNTO</Link>
        <Link to="/voluntarios">VOLUNTÁRIOS</Link>
        <Link to="/">DOAÇÃO</Link>
        <Link to="/admin">PAINEL ADMINISTRATIVO</Link>
      </div>
    </nav>
  );
}
