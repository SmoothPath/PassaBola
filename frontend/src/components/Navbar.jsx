import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handlePerfilClick = () => {
    setIsOpen(false);
    if (!user) navigate("/login");
    else if (user.role === "admin") navigate("/perfiladm");
    else navigate("/perfil");
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleLinkClick = () => setIsOpen(false);

  const MenuLinks = ({ vertical = false }) => (
    <div className={`items-center gap-4 ${vertical ? "flex flex-col" : "flex"}`}>
      <button onClick={handlePerfilClick} className="text-white hover:text-gray-300">
        Perfil
      </button>
      <Link to="/camisa10" className="text-white hover:text-gray-300">Camisa 10</Link>
      <Link to="/jogajunto" className="text-white hover:text-gray-300">Joga Junto</Link>
      <Link to="/voluntarios" className="text-white hover:text-gray-300">Voluntários</Link>
      <Link to="/doacao" className="text-white hover:text-gray-300">Doação</Link>
      <Link to="/parceiros" className="text-white hover:text-gray-300">Parceiros</Link>
      {user && (
        <button onClick={handleLogout} className="text-white hover:text-gray-300">
          Sair
        </button>
      )}
    </div>
  );

  return (
    <nav className="bg-gray-900 px-4 py-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* ESQUERDA: logo + texto */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
          <span className="text-white font-bold text-lg">Passa a Bola</span>
        </Link>

        {/* DIREITA: menu desktop */}
        <div className="hidden md:flex ml-auto">
          <MenuLinks />
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gray-300 focus:outline-none ml-2"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* menu mobile */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden mt-3">
          <MenuLinks vertical />
        </div>
      )}
    </nav>
  );
}
