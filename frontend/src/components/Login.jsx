import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const { login, register, updateUser, getQuizStatus } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let u;
      if (isLogin) {
        u = await login(email, password);
      } else {
        u = await register(name, email, password);
      }

      updateUser(u);

      setModalOpen(false); // fecha modal após login

      if (u?.role === "admin" || u?.isAdmin) {
        navigate("/perfiladm");
      } else {
        const _done = getQuizStatus(u);
        navigate("/perfil");
      }
    } catch (err) {
      console.error("Erro de autenticação:", err);
      setError(err?.response?.data?.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700"
      >
        Entrar / Cadastrar
      </button>

      {modalOpen && (
        <>
          {/* Fundo escuro */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
              <h1 className="text-2xl font-bold mb-4">
                {isLogin ? "Entrar" : "Criar conta"}
              </h1>

              {error && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full border rounded px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                )}

                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full border rounded px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full border rounded px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
                >
                  {isLogin ? "Entrar" : "Cadastrar"}
                </button>
              </form>

              <button
                className="mt-4 text-sm text-blue-600 underline"
                onClick={() => setIsLogin((s) => !s)}
              >
                {isLogin ? "Criar conta" : "Já tenho conta"}
              </button>

              {/* Botão fechar */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
                aria-label="Fechar modal"
              >
                &times;
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
