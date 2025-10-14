import React from "react";
import { Link } from "react-router-dom";

export default function QueroSer() {
  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* header */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
          <Link
            to="/voluntarios"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            ← Voltar
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight font-anton">
            Quero me voluntariar
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 text-lg">
            Comece agora: crie sua conta, complete o perfil e aplique para uma oportunidade.
          </p>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Passo a passo rápido</h2>
            <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Crie sua conta ou faça login.</li>
              <li>Complete seu perfil (disponibilidade e áreas de interesse).</li>
              <li>Escolha uma oportunidade e aplique.</li>
              <li>Confirme presença e leia o briefing enviado pela equipe.</li>
              <li>No dia, faça check-in no app e atue na função combinada.</li>
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition"
              >
                Criar conta / Entrar
              </Link>
              <Link
                to="/voluntarios/oportunidades"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Ver oportunidades
              </Link>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Dicas para primeira atuação</h3>
              <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-slate-700">
                <li>Chegue 15–20 minutos antes para o check-in.</li>
                <li>Leia o briefing e salve o contato do líder.</li>
                <li>Vista-se conforme o dress code do evento.</li>
                <li>Seja proativo(a) e comunique impedimentos.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Regras rápidas</h3>
              <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-slate-700">
                <li>O no-show reduz pontuação no JogaJunto.</li>
                <li>Respeito às lideranças e demais participantes.</li>
                <li>Uso obrigatório do crachá/QR nos acessos.</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-600">Pronto(a) para começar?</span>
          <Link
            to="/voluntarios/oportunidades"
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition"
          >
            Ver vagas abertas
          </Link>
          <Link
            to="/voluntarios/como-funciona"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Entender o fluxo
          </Link>
        </div>
      </main>
    </div>
  );
}
