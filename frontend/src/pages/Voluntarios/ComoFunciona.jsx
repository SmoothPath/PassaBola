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
    <div className="min-h-screen bg-slate-50 font-poppins">
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
          <Link
            to="/voluntarios"
            className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight font-anton">
            Como funciona o voluntariado
          </h1>
          <p className="mt-3 text-white/90 max-w-3xl text-lg">
            Passo a passo simples para começar a atuar.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-violet-700 text-white font-bold shadow-md text-lg">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Benefícios</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 list-disc list-inside">
                <li>🎓 Formação e experiência</li>
                <li>🏅 Reconhecimento e badges</li>
                <li>🤝 Comunidade engajada</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <Link
            to="/voluntarios/oportunidades"
            className="inline-block rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-violet-800 transition"
          >
            Ver oportunidades
          </Link>
        </div>
      </main>
    </div>
  );
}
