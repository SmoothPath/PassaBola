import React from "react";
import { useAuth } from "../components/contexts/AuthContext";

export default function PerfilADM() {
  const { user } = useAuth();
  const nome = user?.name || "Administrador(a)";
  const email = user?.email || "admin@passabola.com";
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Painel Administrativo
        </h1>
        {!isAdmin && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Seu usuário não possui permissão de administrador.
          </div>
        )}

        <section className="mb-6 rounded-2xl bg-white shadow-md p-5">
          <h2 className="text-lg font-extrabold text-gray-900 mb-3">
            Informações da ADM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-bold text-gray-500">NOME</div>
              <div className="text-base font-semibold">{nome}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">EMAIL</div>
              <div className="text-base font-semibold">{email}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">PERFIL</div>
              <div className="text-base font-semibold">
                {isAdmin ? "Administrador(a)" : user?.role || "user"}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criar evento */}
          <div className="rounded-2xl bg-white shadow-md p-5">
            <h3 className="text-lg font-extrabold mb-1">Criar evento</h3>
            <p className="text-sm text-gray-600">Cadastre um novo evento.</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => (window.location.href = "admin/eventos/novo")}
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Novo evento
              </button>
              <a
                href="/eventos/novo?template=rapido"
                className="rounded-xl border-2 border-violet-600 px-4 py-2.5 text-sm font-bold text-violet-700"
              >
                Modelo rápido
              </a>
            </div>
          </div>

          {/* Gerenciar eventos */}
          <div className="rounded-2xl bg-white shadow-md p-5">
            <h3 className="text-lg font-extrabold mb-1">Gerenciar eventos</h3>
            <p className="text-sm text-gray-600">
              Edite inscrições, presença e exporte relatórios.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => (window.location.href = "/admin/eventos")}
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Abrir lista
              </button>
              <button
                className="rounded-xl border-2 border-violet-600 px-4 py-2.5 text-sm font-bold text-violet-700"
                onClick={() =>
                  alert("Exportar CSV – integrar /api/eventos/export")
                }
              >
                Exportar CSV
              </button>
            </div>
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
    </div>
  );
}
