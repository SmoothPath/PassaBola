import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/ranking")
      .then(res => {
        if (!res.ok) throw new Error("Falha ao carregar ranking");
        return res.json();
      })
      .then(data => setRanking(data))
      .catch(err => setErro(err.message));
  }, []);

  return (
    <div className="p-6 text-center">
    <Link
                    to="/perfil"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/40 transition"
                  >
                    ← Voltar
                  </Link>
      <h2 className="text-2xl font-bold mb-4">🏆 Ranking de Jogadoras</h2>

      {erro && <p className="text-red-500">{erro}</p>}
      {ranking.length === 0 && !erro && <p>Nenhum dado disponível ainda.</p>}

      <ul className="max-w-md mx-auto bg-white rounded-2xl shadow-md divide-y divide-gray-200">
        {ranking.map((jogadora, i) => (
          <li key={i} className="p-4 flex justify-between">
            <span>{i + 1}. {jogadora.nome}</span>
            <span className="font-semibold">{jogadora.eventos} eventos</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
