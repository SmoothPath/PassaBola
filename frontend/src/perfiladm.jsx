import React from "react";
import Navbar from "../components/Navbar";       
import { useAuth } from "../components/contexts/AuthContext";

export default function PerfilADM() {
  const { user } = useAuth();
  const nome  = user?.name  || "Administrador(a)";
  const email = user?.email || "admin@passabola.app";
  const role  = user?.role  || "user";
  const isAdmin = role === "admin" || user?.isAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
     
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-sm text-gray-500">Gerencie eventos, inscrições e relatórios.</p>
        </div>

        {!isAdmin && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Seu usuário não possui permissão de administrador. Algumas ações podem estar bloqueadas.
          </div>
        )}

        {/* Informações da ADM */}
        <section className="mb-6 rounded-2xl bg-white shadow-md p-5">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">Informações da ADM</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-bold text-gray-500">NOME</div>
              <div className="text-base font-semibold text-gray-900">{nome}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">EMAIL</div>
              <div className="text-base font-semibold text-gray-900">{email}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">PERFIL</div>
              <div className="text-base font-semibold text-gray-900">
                {isAdmin ? "Administrador(a)" : role}
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Gerenciamento */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criar evento */}
          <div className="rounded-2xl bg-white shadow-md p-5">
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">Criar evento</h3>
            <p className="text-sm text-gray-600">
              Cadastre um novo evento com data, local, capacidade e regras de inscrição.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-violet-700 focus:outline-none"
                onClick={() => (window.location.href = "/eventos/novo")}
                disabled={!isAdmin}
              >
                Novo evento
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border-2 border-violet-600 px-4 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50"
                onClick={() => (window.location.href = "/eventos/novo?template=rapido")}
                disabled={!isAdmin}
              >
                Modelo rápido
              </button>
            </div>
          </div>

          {/* Gerenciar eventos */}
          <div className="rounded-2xl bg-white shadow-md p-5">
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">Gerenciar eventos</h3>
            <p className="text-sm text-gray-600">
              Edite inscrições, presença, pontuação e exporte relatórios.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-violet-700"
                onClick={() => (window.location.href = "/eventos")}
                disabled={!isAdmin}
              >
                Abrir lista
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border-2 border-violet-600 px-4 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50"
                onClick={() => alert("Exportar CSV – integrar /api/eventos/export")}
                disabled={!isAdmin}
              >
                Exportar CSV
              </button>
            </div>

            {/* mini KPIs */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="rounded-2xl text-white p-4 shadow bg-green-600">
                <div className="text-3xl font-extrabold leading-none">10</div>
                <div className="font-semibold opacity-95">Eventos</div>
              </div>
              <div className="rounded-2xl text-white p-4 shadow bg-green-600">
                <div className="text-3xl font-extrabold leading-none">86</div>
                <div className="font-semibold opacity-95">Presenças</div>
              </div>
              <div className="rounded-2xl text-white p-4 shadow bg-rose-500">
                <div className="text-3xl font-extrabold leading-none">23</div>
                <div className="font-semibold opacity-95">Ausências</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
