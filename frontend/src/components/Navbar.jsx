import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/" className="hover:text-gray-300 transition">Início</Link>
            <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            <Link to="/camisa10" className="hover:text-gray-300 transition">Camisa 10</Link>
            <Link to="/jogajunto" className="hover:text-gray-300 transition">Joga Junto</Link>
            <Link to="/voluntarios" className="hover:text-gray-300 transition">Voluntários</Link>
            <Link to="/doacao" className="hover:text-gray-300 transition">Doação</Link>
            <Link to="/parceiros" className="hover:text-gray-300 transition">Parceiros</Link>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-4 pb-3 space-y-2">
          <Link to="/login" className="block text-white hover:text-gray-300">Login</Link>
          <Link to="/camisa10" className="block text-white hover:text-gray-300">Camisa 10</Link>
          <Link to="/jogajunto" className="block text-white hover:text-gray-300">Joga Junto</Link>
          <Link to="/voluntarios" className="block text-white hover:text-gray-300">Voluntários</Link>
          <Link to="/doacao" className="block text-white hover:text-gray-300">Doação</Link>
          <Link to="/parceiros" className="block text-white hover:text-gray-300">Parceiros</Link>
        </div>
      )}
    </nav>
  );
}
