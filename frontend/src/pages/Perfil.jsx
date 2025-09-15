import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const quizQuestions = [
  {
    key: "posicao",
    question: "Qual posição você prefere jogar?",
    options: ["Goleira", "Zagueira", "Meio-campo", "Atacante", "Ala/Lateral"],
  },
  {
    key: "experiencia",
    question: "Qual seu nível de experiência em jogos/eventos?",
    options: ["Iniciante", "Intermediária", "Avançada", "Profissional"],
  },
  {
    key: "disponibilidade",
    question: "Qual sua disponibilidade média por mês?",
    options: ["1 evento", "2 eventos", "3+ eventos"],
  },
  {
    key: "condicao",
    question: "Seu condicionamento físico atual é:",
    options: ["Baixo", "Moderado", "Alto"],
  },
  {
    key: "preferencia",
    question: "Prefere eventos com foco em:",
    options: ["Diversão", "Competição", "Misto"],
  },
];

const Perfil = () => {
  const { user, updateUser, getQuizStatus, setQuizStatus } = useAuth();
  const [localUser, setLocalUser] = useState(user);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // já concluiu? pula quiz
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
    return (
      <p className="flex justify-center items-center min-h-screen">
        Carregando perfil...
      </p>
    );
  }

  const handleOptionChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!allAnswered) return;
    setLoading(true);
    try {
      const updated = {
        ...localUser,
        points: (localUser?.points || 0) + 10,
        quizAnswers: answers,
        quizCompletedAt: new Date().toISOString(),
      };

      // Se backend não tiver /profile ainda, esse PUT vai falhar e a gente segue mesmo assim
      try {
        await api.put("/profile", updated);
      } catch (_) {}

      updateUser(updated);
      setQuizStatus(true);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar quiz:", err);
      alert("Erro ao enviar quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>

        {/* Dados do usuário */}
        <div className="mb-6 bg-white rounded-xl shadow p-4">
          <p><strong>Nome:</strong> {localUser?.name}</p>
          <p><strong>Email:</strong> {localUser?.email}</p>
        </div>

        {!submitted ? (
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-lg font-semibold">Quiz</h2>
              <span className="text-sm text-gray-500">
                {answeredCount}/{totalQuestions} respondidas
              </span>
            </div>

            {quizQuestions.length === 0 ? (
              <p className="text-sm text-gray-600">
                Nenhuma pergunta configurada no momento.
              </p>
            ) : (
              quizQuestions.map((q, idx) => (
                <div key={q.key} className="mb-4">
                  <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q_${q.key}`}
                          value={option}
                          checked={answers[q.key] === option}
                          onChange={() => handleOptionChange(q.key, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered || loading}
              className={`mt-4 w-full py-2 rounded-md text-white transition
                ${allAnswered && !loading ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {loading ? "Enviando..." : "Enviar Quiz"}
            </button>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-green-100 text-green-800 rounded-lg shadow p-6 text-center">
            <p className="font-semibold">Quiz concluído ✅ — você pode explorar eventos agora.</p>
            <div className="mt-4">
              <button
                onClick={() => navigate("/eventos")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Explorar eventos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;
