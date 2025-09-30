import React from "react";
import { Link } from "react-router-dom";

export default function Contato() {
  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      {/* header */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            to="/voluntarios"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/15"
          >
            ← Voltar
          </Link>
          <h1 className="font-[Anton] text-3xl font-extrabold tracking-tight">
            Fale com a equipe de Voluntários
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Estamos aqui pra te ajudar a dar o próximo passo.
          </p>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* form */}
          <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-violet-200"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                E-mail
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-violet-200"
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Assunto
              </label>
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-violet-200">
                <option>Selecione...</option>
                <option>Dúvidas gerais</option>
                <option>Problemas com aplicação</option>
                <option>Comprovante de horas</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Mensagem
              </label>
              <textarea
                className="w-full min-h-[110px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-violet-200"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="reset"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Limpar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-800"
              >
                Enviar
              </button>
            </div>
          </form>

          {/* aside */}
          <aside className="space-y-4">
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
