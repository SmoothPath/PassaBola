import React from "react";
import { Link } from "react-router-dom";

export default function Contato() {
  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* header */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
          <Link
            to="/voluntarios"
            className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            ← Voltar
          </Link>
          <h1 className="font-anton text-3xl font-extrabold tracking-tight">
            Fale com a equipe de Voluntários
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 text-lg">
            Estamos aqui pra te ajudar a dar o próximo passo.
          </p>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* form */}
          <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <label
                htmlFor="nome"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Nome
              </label>
              <input
                id="nome"
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="assunto"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Assunto
              </label>
              <select
                id="assunto"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option>Selecione...</option>
                <option>Dúvidas gerais</option>
                <option>Problemas com aplicação</option>
                <option>Comprovante de horas</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="mensagem"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                className="w-full min-h-[110px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="reset"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-violet-700 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition"
              >
                Enviar
              </button>
            </div>
          </form>

          {/* aside */}
          <aside className="space-y-8">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Canais</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                <li>
                  <strong>E-mail:</strong> voluntarios@exemplo.com
                </li>
                <li>
                  <strong>Discord:</strong> #voluntariado
                </li>
                <li>
                  <strong>Atendimento:</strong> Seg–Sex, 9h–18h
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Boas práticas</h3>
              <ul className="mt-3 list-inside list-disc text-sm text-slate-700">
                <li>Seja claro(a) no assunto e descreva o contexto.</li>
                <li>Anexe prints quando houver erro no app.</li>
                <li>Inclua seu usuário/e-mail da conta.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
