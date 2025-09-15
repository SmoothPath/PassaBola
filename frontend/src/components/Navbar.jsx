import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const handlePerfilClick = () => {
    closeMenu();
    if (!user) navigate("/login");
    else if (user.role === "admin") navigate("/perfiladm");
    else navigate("/perfil");
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const linkBase =
    "text-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-md px-1.5 py-1";
  const linkInactive = "text-slate-300";
  const linkActive = "text-white font-semibold";

  const MenuLinks = ({ vertical = false }) => (
    <div className={`${vertical ? "flex flex-col gap-3" : "flex items-center gap-5"}`}>
      <button onClick={handlePerfilClick} className={`${linkBase} ${linkInactive}`}>
        Perfil
      </button>

      <NavLink
        to="/camisa10"
        onClick={closeMenu}
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        Camisa 10
      </NavLink>

      <NavLink
        to="/jogajunto"
        onClick={closeMenu}
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        Joga Junto
      </NavLink>

      <NavLink
        to="/voluntarios"
        onClick={closeMenu}
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        Voluntários
      </NavLink>

      <NavLink
        to="/doacao"
        onClick={closeMenu}
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        Doação
      </NavLink>

      <NavLink
        to="/parceiros"
        onClick={closeMenu}
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
      >
        Parceiros
      </NavLink>

      {user ? (
        <button
          onClick={handleLogout}
          className="ml-1 rounded-xl bg-pink-600 text-white text-sm font-semibold px-4 py-2 hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        >
          Sair
        </button>
      ) : (
        <button
          onClick={() => {
            closeMenu();
            navigate("/login");
          }}
          className="ml-1 rounded-xl bg-pink-600 text-white text-sm font-semibold px-4 py-2 hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
        >
          Entrar
        </button>
      )}
    </div>
  );

  return (
    <nav
      className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 shadow"
      aria-label="Barra de navegação principal"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* ESQUERDA: logo + texto */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img
            src="/assets/logo.jpg" // ajuste se seu caminho for diferente
            alt="Passa a Bola"
            className="w-8 h-8 object-cover rounded-full"
          />
          <span className="text-white font-bold text-lg tracking-tight">Passa a Bola</span>
        </Link>

        {/* DIREITA: menu desktop */}
        <div className="hidden md:flex ml-auto">
          <MenuLinks />
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ml-2"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
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
        <div id="mobile-menu" className="md:hidden mt-2 px-4 pb-3">
          <MenuLinks vertical />
        </div>
      )}
    </nav>
  );
}
