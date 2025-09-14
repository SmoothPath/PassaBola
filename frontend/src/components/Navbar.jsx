import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handlePerfilClick = () => {
    setIsOpen(false); // fecha menu mobile se estiver aberto
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/perfiladm");
    } else {
      navigate("/perfil");
    }
  };

  // Fecha menu mobile ao clicar em links normais
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-700 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Esquerda: logo + marca */}
          <div className="flex items-center space-x-3">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            <span className="text-white text-xl font-bold tracking-wide">
              PASSA A BOLA
            </span>
          </div>

          {/* Botão hambúrguer (mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links (desktop) */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            <Link to="/" onClick={handleLinkClick} className="hover:text-gray-300 transition">Início</Link>
            <button
              onClick={handlePerfilClick}
              className="hover:text-gray-300 transition"
            >
              Perfil
            </button>
            <Link to="/camisa10" onClick={handleLinkClick} className="hover:text-gray-300 transition">Camisa 10</Link>
            <Link to="/jogajunto" onClick={handleLinkClick} className="hover:text-gray-300 transition">Joga Junto</Link>
            <Link to="/voluntarios" onClick={handleLinkClick} className="hover:text-gray-300 transition">Voluntários</Link>
            <Link to="/doacao" onClick={handleLinkClick} className="hover:text-gray-300 transition">Doação</Link>
            <Link to="/parceiros" onClick={handleLinkClick} className="hover:text-gray-300 transition">Parceiros</Link>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-3 space-y-2">
          <button onClick={handlePerfilClick} className="block text-white hover:text-gray-300">Perfil</button>
          <Link to="/camisa10" onClick={handleLinkClick} className="block text-white hover:text-gray-300">Camisa 10</Link>
          <Link to="/jogajunto" onClick={handleLinkClick} className="block text-white hover:text-gray-300">Joga Junto</Link>
          <Link to="/voluntarios" onClick={handleLinkClick} className="block text-white hover:text-gray-300">Voluntários</Link>
          <Link to="/doacao" onClick={handleLinkClick} className="block text-white hover:text-gray-300">Doação</Link>
          <Link to="/parceiros" onClick={handleLinkClick} className="block text-white hover:text-gray-300">Parceiros</Link>
        </div>
      )}
    </nav>
  );
}
