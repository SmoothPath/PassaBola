import React, { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import api from "../services/api"; // Axios já configurado com token

const quizQuestions = [
  {
    question: "Qual é a sua posição favorita?",
    options: ["Goleira", "Defensora", "Meio-campo", "Atacante"],
    key: "position",
  },
  {
    question: "Em qual cidade você mora?",
    options: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Outro"],
    key: "location",
  },
  {
    question: "Qual é a sua idade?",
    options: ["< 15", "15-18", "19-25", "26+"],
    key: "age",
  },
  {
    question: "Você já participou de eventos antes?",
    options: ["Sim", "Não"],
    key: "eventsParticipated",
  },
  {
    question: "Qual é o seu nível de experiência no esporte?",
    options: ["Iniciante", "Intermediário", "Avançado", "Profissional"],
    key: "experience",
  },
];

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [localUser, setLocalUser] = useState(user);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Atualiza localUser quando o contexto muda
  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  if (!localUser)
    return (
      <p className="flex justify-center items-center min-h-screen">
        Carregando perfil...
      </p>
    );

  const handleOptionChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);

    try {
      // Cria objeto com apenas os campos que o backend espera
      const updatedUser = {
        points: localUser.points + 10,
        ...(answers.position && { position: answers.position }),
        ...(answers.location && { location: answers.location }),
        ...(answers.age && { age: answers.age }),
        ...(answers.eventsParticipated && { eventsParticipated: answers.eventsParticipated }),
        ...(answers.experience && { experience: answers.experience }),
      };

      // Envia atualização para o backend
      const res = await api.put("/profile", updatedUser);
      updateUser(res.data.user); // atualiza contexto e localStorage
      setLocalUser(res.data.user);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert("Erro ao enviar quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow px-4 py-8">
        {/* Perfil da jogadora */}
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">Foto</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{localUser.name}</h2>
            <p className="text-gray-600 mb-1">{localUser.email}</p>
            <p className="text-gray-800 font-semibold">
              Pontos: {localUser.points}
            </p>
            {localUser.position && <p>Posição: {localUser.position}</p>}
            {localUser.location && <p>Localização: {localUser.location}</p>}
          </div>
        </div>

        {/* Quiz */}
        {!submitted ? (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quiz da Jogadora</h3>
            {quizQuestions.map((q, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium mb-2">{q.question}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.key}
                        value={option}
                        checked={answers[q.key] === option}
                        onChange={() => handleOptionChange(q.key, option)}
                        className="accent-pink-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmitQuiz}
              disabled={loading}
              className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar Quiz"}
            </button>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-green-100 text-green-800 rounded-lg shadow p-6 text-center">
            <p className="font-semibold">
              Quiz concluído! Seus dados foram atualizados e você ganhou 10
              pontos.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;
