import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Perguntas do quiz
const quizQuestions = [
  { key: "posicao", question: "Qual posição você prefere jogar?", options: ["Goleira","Zagueira","Meio-campo","Atacante","Ala/Lateral"] },
  { key: "experiencia", question: "Qual seu nível de experiência em jogos/eventos?", options: ["Iniciante","Intermediária","Avançada","Profissional"] },
  { key: "disponibilidade", question: "Qual sua disponibilidade média por mês?", options: ["1 evento","2 eventos","3+ eventos"] },
  { key: "condicao", question: "Seu condicionamento físico atual é:", options: ["Baixo","Moderado","Alto"] },
  { key: "preferencia", question: "Prefere eventos com foco em:", options: ["Diversão","Competição","Misto"] },
];

// rótulos amigáveis para exibir no card
const quizLabels = Object.fromEntries(quizQuestions.map(q => [q.key, q.question]));

const Perfil = () => {
  const { user, updateUser, getQuizStatus, setQuizStatus } = useAuth();
  const [localUser, setLocalUser] = useState(user);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // pular quiz se já concluído
  useEffect(() => {
    setLocalUser(user);
    if (user && getQuizStatus(user)) setSubmitted(true);
  }, [user, getQuizStatus]);

  const totalQuestions = quizQuestions.length;
  const answeredCount = useMemo(
    () => Object.keys(answers).filter((k) => answers[k] != null).length,
    [answers]
  );
  const allAnswered = answeredCount === totalQuestions && totalQuestions > 0;

  if (!user) {
    return <p className="flex justify-center items-center min-h-screen">Carregando perfil...</p>;
  }

  const handleOptionChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!allAnswered) return;
    setLoading(true);
    try {
      // monta o user atualizado
      const updated = {
        ...localUser,
        points: (localUser?.points || 0) + 50,
        position: answers.posicao || localUser?.position,
        quizAnswers: answers,
        quizCompletedAt: new Date().toISOString(),
      };

      // tenta salvar no backend; se não existir rota, segue sem travar
      try { await api.put("/profile", updated); } catch (_) {}

      // persiste no app
      updateUser(updated);
      setLocalUser(updated);     // garante re-render imediato com pontos e respostas
      setQuizStatus(true);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar quiz:", err);
      alert("Erro ao enviar quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefazerQuiz = () => {
    setQuizStatus(false);
    const cleaned = { ...localUser };
    delete cleaned.quizAnswers;
    setLocalUser(cleaned);
    updateUser(cleaned);
    setSubmitted(false);
    setAnswers({});
  };

  // localização se houver
  const location =
    localUser?.location || localUser?.cidade || localUser?.city || "";

  // respostas para exibir no card (usa o que já está salvo ou o que acabou de responder)
  const displayAnswers =
    (localUser && localUser.quizAnswers) && Object.keys(localUser.quizAnswers).length
      ? localUser.quizAnswers
      : answers;

  const currentPoints = (localUser?.points ?? user?.points ?? 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>

        {/* CARD DO PERFIL COM RESPOSTAS DENTRO */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8 mb-6">
          <div className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              Foto
            </div>
            <h2 className="text-xl font-semibold">{localUser?.name}</h2>
            {localUser?.email && (
              <a href={`mailto:${localUser.email}`} className="text-sm text-blue-600">
                {localUser.email}
              </a>
            )}
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>
                <strong>Pontos:</strong>{" "}
                <span className="font-bold">{currentPoints}</span>
              </p>
              {localUser?.position && <p>Posição: {localUser.position}</p>}
              {location && <p>Localização: {location}</p>}
            </div>
          </div>

          {/* respostas do quiz (se houver) */}
          {displayAnswers && Object.keys(displayAnswers).length > 0 && (
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Minhas respostas do quiz</h3>
                <button
                  onClick={handleRefazerQuiz}
                  className="text-sm text-blue-600 hover:underline"
                  title="Limpar conclusão e responder novamente"
                >
                  Refazer quiz
                </button>
              </div>

              <ul className="space-y-2 text-sm text-gray-800">
                {Object.entries(displayAnswers).map(([key, value]) => (
                  <li key={key} className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-medium">{quizLabels[key] || key}:</span>
                    <span>{String(value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* QUIZ ou SUCESSO */}
        {!submitted ? (
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg font-semibold">Quiz</h3>
              <span className="text-sm text-gray-500">
                {answeredCount}/{totalQuestions} respondidas
              </span>
            </div>

       {quizQuestions.map((q, idx) => (
  <div key={q.key} className="mb-6">
    <p className="font-medium mb-2">
      {idx + 1}. {q.question}
    </p>

    {/* container em coluna */}
    <div className="space-y-2">
      {q.options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* coluna da bolinha centralizada */}
          <div className="w-6 flex justify-center">
            <input
              type="radio"
              name={`q_${q.key}`}
              value={option}
              checked={answers[q.key] === option}
              onChange={() => handleOptionChange(q.key, option)}
              className="form-radio text-purple-600 w-4 h-4"
            />
          </div>

          {/* coluna do texto (mantida à esquerda) */}
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
))}


            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered || loading}
              className={`mt-4 w-full py-2 rounded-md text-white transition
                ${allAnswered && !loading ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {loading ? "Enviando..." : "Enviar Quiz"}
            </button>
          </div>
        ) : (
          <>
            <div className="max-w-xl mx-auto bg-green-100 text-green-800 rounded-lg shadow p-4 text-center font-medium">
              Quiz concluído! Seus dados foram atualizados e você ganhou 50 pontos.
            </div>
            <div className="max-w-xl mx-auto text-center mt-4">
              <button
                onClick={() => navigate("/eventos")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Explorar eventos
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Perfil;
