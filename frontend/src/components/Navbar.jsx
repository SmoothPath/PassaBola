// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

export default function NavBar() {
  return (
   <nav className="navbar">
        <div className="navbar-left">
          <img src="" alt="Logo" className="logo" />
          <div className="brand">PASSA A BOLA</div>
        </div>
        <div className="navbar-right">
          <a href="#" className="hover:text-gray-300 transition">Login</a>
          <a href="#" className="hover:text-gray-300 transition">Camisa 10</a>
          <a href="#" className="hover:text-gray-300 transition">Joga Junto</a>
          <a href="#" className="hover:text-gray-300 transition">Voluntários</a>
          <a href="#" className="hover:text-gray-300 transition">Doação</a>
          <a href="#" className="hover:text-gray-300 transition">Parceiros</a>
        </div>
      </nav>

  );
}
