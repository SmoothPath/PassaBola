// frontend/src/pages/PerfilADM.jsx
import React from "react";
import { useAuth } from "../components/contexts/AuthContext";
import {
  ShieldCheck,
  User,
  Mail,
  CalendarPlus,
  ClipboardList,
  FileDown,
} from "lucide-react";

export default function PerfilADM() {
  const { user } = useAuth();
  const nome = user?.name || "Administrador(a)";
  const email = user?.email || "admin@passabola.com";
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-violet-50 to-white font-poppins text-gray-900">
      {/* Cabeçalho */}
      <header className="border-b border-slate-200 bg-white py-8 shadow-sm text-center">
        <h1 className="text-4xl font-extrabold flex justify-center items-center gap-2 text-gray-900">
          <ShieldCheck className="text-violet-700 w-8 h-8" />
          Painel Administrativo
        </h1>
        <p className="text-gray-600 text-base mt-2">
          Gerencie eventos, inscrições e informações de administrador.
        </p>
      </header>

      {/* Conteúdo */}
      <main className="mx-auto mt-12 max-w-5xl px-12 space-y-10">
        {/* Informações do Administrador */}
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-violet-700">
            <User className="w-5 h-5" /> Informações da Conta
          </h2>

          {!isAdmin && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              ⚠️ Seu usuário não possui permissão de administrador.
            </div>
          )}

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-gray-500">NOME</p>
              <p className="text-base font-semibold">{nome}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">EMAIL</p>
              <p className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-600" />
                {email}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">PERFIL</p>
              <p className="text-base font-semibold">
                {isAdmin ? "Administrador(a)" : "Usuário comum"}
              </p>
            </div>
          </div>
        </section>

        {/* Ações do Administrador */}
        <section className="grid grid-cols-2 gap-10">
          {/* Criar Evento */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-violet-700">
              <CalendarPlus className="w-5 h-5" /> Criar evento
            </h3>
            <p className="text-sm text-gray-600">
              Cadastre um novo evento no sistema.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => (window.location.href = "/admin/eventos/novo")}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 transition"
              >
                Novo evento
              </button>
              <a
                href="/eventos/novo?template=rapido"
                className="rounded-xl border border-violet-600 px-5 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition"
              >
                Modelo rápido
              </a>
            </div>
          </div>

          {/* Gerenciar Eventos */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-violet-700">
              <ClipboardList className="w-5 h-5" /> Gerenciar eventos
            </h3>
            <p className="text-sm text-gray-600">
              Edite inscrições, presença e exporte relatórios.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => (window.location.href = "/admin/eventos")}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 transition"
              >
                Abrir lista
              </button>
              <button
                onClick={() =>
                  alert("Exportar CSV – integração com /api/eventos/export")
                }
                className="rounded-xl border border-violet-600 px-5 py-2.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" /> Exportar CSV
              </button>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 gap-5 mt-8">
              <div className="rounded-2xl bg-green-600 text-white p-5 text-center shadow-md">
                <div className="text-2xl font-extrabold">10</div>
                <div className="text-sm font-medium opacity-90">Eventos</div>
              </div>
              <div className="rounded-2xl bg-blue-600 text-white p-5 text-center shadow-md">
                <div className="text-2xl font-extrabold">86</div>
                <div className="text-sm font-medium opacity-90">Presenças</div>
              </div>
              <div className="rounded-2xl bg-rose-500 text-white p-5 text-center shadow-md">
                <div className="text-2xl font-extrabold">23</div>
                <div className="text-sm font-medium opacity-90">Ausências</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
