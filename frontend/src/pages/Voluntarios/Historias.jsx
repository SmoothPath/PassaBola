import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HeartHandshake, Quote } from "lucide-react"; // ← ÍCONES ELEGANTES

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 font-poppins">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
          <Link
            to="/voluntarios"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Voltar
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <HeartHandshake className="w-10 h-10 text-white drop-shadow-sm" strokeWidth={2.2} />
            <h1 className="font-anton text-4xl font-extrabold tracking-tight drop-shadow-sm">
              Histórias do Voluntariado
            </h1>
          </div>

          <p className="mt-3 max-w-2xl text-white/90 text-lg leading-relaxed">
            Relatos reais de quem transforma o jogo fora das quatro linhas.
          </p>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="mx-auto max-w-6xl px-6 py-14 sm:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <article
              key={i}
              className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-violet-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute top-4 right-4 text-violet-400">
                <Quote className="w-6 h-6 opacity-40" />
              </div>

              <div className="p-7">
                <div className="flex items-center gap-3">
                  <img
                    src={s.foto}
                    alt={s.nome}
                    className="h-12 w-12 rounded-full object-cover shadow-sm border border-violet-200"
                  />
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-bold text-slate-900">{s.nome}</h3>
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 shadow-sm">
                      {s.tag}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-slate-700 text-sm italic leading-relaxed">
                  “{s.texto}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
