// src/pages/JogaJunto.jsx
import React, { useState } from "react";

export default function JogaJunto() {
  const [tab, setTab] = useState("pontuacao");

  const tabs = [
    { id: "pontuacao", label: "Pontuação" },
    { id: "niveis", label: "Níveis" },
    { id: "apostas", label: "Apostas" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar removido para evitar duplicação */}

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold mb-2">JogaJunto</h1>
        <p className="text-slate-600 mb-6">
          Entenda como funciona o sistema de pontos, níveis e apostas do{" "}
          <span className="font-semibold">Passa a Bola</span>.
        </p>

        {/* Navegação de abas */}
        <div className="flex gap-3 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                tab === t.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
              aria-selected={tab === t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={`tabpanel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Conteúdo da aba */}
        <section
          id={`tabpanel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          {tab === "pontuacao" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Sistema de Pontuação</h2>
              <p className="text-slate-700 mb-4">
                Ao se cadastrar na plataforma e completar o quiz, as jogadoras{" "}
                <span className="font-medium">ganham pontos iniciais</span>. Ao
                interagir com as redes sociais e conteúdos do Passa a Bola (como
                Instagram, vídeos do YouTube e podcast Fala Bebê), elas{" "}
                <span className="font-medium">ganham pontos extras</span>. Ao
                faltar nos jogos, elas <span className="font-medium">perdem pontos</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Como ganhar pontos:</h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li>Cadastro e conclusão do quiz inicial.</li>
                    <li>
                      Interação com redes sociais (Instagram, YouTube, podcast
                      Fala Bebê) — enviar print/foto na plataforma.
                    </li>
                    <li>Participar de eventos e lives do Passa a Bola.</li>
                    <li>Convidar amigas para a plataforma.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Como perder pontos:</h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                    <li>Faltar em jogos sem justificativa.</li>
                    <li>Comportamento antiético ou violar regras da comunidade.</li>
                    <li>Fraudes nas interações (prints ou fotos falsas).</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-slate-700 text-sm">
                As inscrições em campeonatos seguem prioridade:{" "}
                <span className="font-medium">nível Ouro</span> tem acesso
                primeiro, depois <span className="font-medium">nível Prata</span> e
                por último <span className="font-medium">nível Bronze</span>.
              </p>
            </div>
          )}

          {tab === "niveis" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Sistema de Níveis</h2>
              <p className="text-slate-700 mb-4">
                O acúmulo de pontos coloca as jogadoras em diferentes níveis.
                Esses níveis oferecem benefícios exclusivos dentro da
                plataforma.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h3 className="font-bold text-yellow-600 mb-2">Ouro</h3>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li>Prioridade máxima nas inscrições.</li>
                    <li>Acesso antecipado a eventos exclusivos.</li>
                    <li>Maior valorização em apostas.</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-bold text-gray-600 mb-2">Prata</h3>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li>Prioridade média nas inscrições.</li>
                    <li>Acesso parcial a eventos especiais.</li>
                    <li>Bônus em interações sociais.</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg bg-orange-50">
                  <h3 className="font-bold text-orange-600 mb-2">Bronze</h3>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    <li>Acesso regular às inscrições.</li>
                    <li>Possibilidade de subir com mais interações.</li>
                    <li>Apostas disponíveis, mas com retorno menor.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "apostas" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Sistema de Apostas</h2>
              <p className="text-slate-700 mb-4">
                O <span className="font-semibold">JogaJunto</span> também permite que jogadoras usem seus pontos para{" "}
                <span className="font-medium">apostar em jogos</span>. Dessa forma, é possível multiplicar a pontuação e subir de nível mais rápido.
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 text-sm">
                <li>Apostar em jogos da comunidade para tentar aumentar os pontos.</li>
                <li>Jogadoras de nível Ouro têm chances maiores de retorno em suas apostas.</li>
                <li>Jogadoras de nível Bronze ainda podem apostar, mas com ganhos menores.</li>
              </ul>

              <p className="mt-4 text-slate-600 text-sm italic">
                *O sistema de apostas é pensado como forma de engajamento saudável, sempre vinculado à participação nos jogos e conteúdos da comunidade.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer removido para evitar duplicação */}
    </div>
  );
}
