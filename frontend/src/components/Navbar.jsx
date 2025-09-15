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
    "text-sm font-agrandir whitespace-nowrap transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1FA6] rounded-md px-2 py-1";
  const linkInactive = "text-[#7D1FA6]/80 hover:text-[#7D1FA6]";
  const linkActive = "text-[#7D1FA6] font-semibold underline";

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
          className="ml-1 rounded-xl bg-[#7D1FA6] text-white text-sm font-semibold px-4 py-2 hover:bg-[#9124BF] transition"
        >
          Sair
        </button>
      ) : (
        <button
          onClick={() => {
            closeMenu();
            navigate("/login");
          }}
          className="ml-1 rounded-xl bg-[#7D1FA6] text-white text-sm font-semibold px-4 py-2 hover:bg-[#9124BF] transition"
        >
          Entrar
        </button>
      )}
    </div>
  );

  return (
    <nav
      className="sticky top-0 z-40 bg-white shadow-md"
      aria-label="Barra de navegação principal"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* LOGO E TEXTO */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img
            src="/assets/logo.jpg"
            alt="Passa a Bola"
            className="w-9 h-9 object-cover rounded-full border-2 border-[#7D1FA6]"
          />
          <span className="text-[#7D1FA6] font-anton text-xl tracking-tight">Passa a Bola</span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex ml-auto">
          <MenuLinks />
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#7D1FA6] hover:text-[#9124BF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1FA6] ml-2"
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

      {/* MENU MOBILE */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden mt-2 px-4 pb-3">
          <MenuLinks vertical />
        </div>
      )}
    </nav>
  );
}
