import React from "react";
import { Link } from "react-router-dom";

export default function Historias() {
  const stories = [
    {
      nome: "Fernanda Barros",
      tag: "Recepção",
      texto:
        "Comecei na recepção e hoje coordeno um time de 12 voluntárias. Foi transformador!",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      nome: "Ana Paula",
      tag: "Produção",
      texto:
        "Descobri que amo produção. Aprendi muito e agora trabalho com eventos esportivos.",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      nome: "Letícia Souza",
      tag: "Mídias",
      texto: "Fotografar os jogos me abriu portas e um portfólio incrível.",
      foto: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

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
            Histórias do voluntariado
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 text-lg">
            Relatos reais de quem coloca a mão na massa com a gente.
          </p>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <article
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={s.foto}
                  alt={s.nome}
                  className="h-10 w-10 rounded-full object-cover shadow-sm"
                />
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-bold text-slate-900">{s.nome}</h3>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    {s.tag}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700 italic">“{s.texto}”</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
