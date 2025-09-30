import React from "react";
import { Link } from "react-router-dom";

export default function ComoFunciona() {
  const steps = [
    { title: "Crie sua conta", desc: "Cadastre-se e complete seu perfil." },
    { title: "Escolha um evento", desc: "Veja vagas abertas e candidate-se." },
    { title: "Receba confirmação", desc: "Você terá briefing e instruções." },
    { title: "Atue no evento", desc: "Faça check-in e execute sua função." },
    { title: "Ganhe pontos", desc: "Some pontos no JogaJunto e feedback." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link to="/voluntarios" className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/15">
            ← Voltar
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight font-[Anton]">Como funciona o voluntariado</h1>
          <p className="mt-2 text-white/90 max-w-2xl">Passo a passo simples para começar a atuar.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.8fr]">
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-700 text-white font-bold shadow">{i + 1}</span>
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Benefícios</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>🎓 Formação e experiência</li>
                <li>🏅 Reconhecimento e badges</li>
                <li>🤝 Comunidade engajada</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex gap-3">
          <Link to="/voluntarios/oportunidades" className="rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-800">
            Ver oportunidades
          </Link>
        </div>
      </main>
    </div>
  );
}
