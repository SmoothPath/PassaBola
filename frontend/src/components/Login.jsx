// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const { login, register, updateUser, getQuizStatus } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let user;
      if (isLogin) {
        user = await login(email, password);
      } else {
        user = await register(name, email, password);
      }
      updateUser(user);

      // se tiver lógica de redirecionamento por role
      if (user?.role === "admin") {
        navigate("/admin/perfil");
      } else {
        const quiz = await getQuizStatus?.(user?.id);
        navigate(quiz?.done ? "/perfil" : "/");
      }

      setModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err?.message || "Falha na autenticação");
    }
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold
                   bg-violet-700 text-white shadow-sm hover:bg-violet-800 active:scale-[.99]
                   transition"
      >
        Entrar
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 grid place-items-center p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          {/* card */}
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            {/* Header com tabs */}
            <div className="flex">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-3 text-sm font-semibold rounded-tl-2xl transition
                  ${isLogin ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100"}`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-3 text-sm font-semibold rounded-tr-2xl transition
                  ${!isLogin ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100"}`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2
                                 text-slate-800 outline-none focus:ring-4 focus:ring-violet-200"
                      placeholder="Seu nome"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2
                               text-slate-800 outline-none focus:ring-4 focus:ring-violet-200"
                    placeholder="voce@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2
                               text-slate-800 outline-none focus:ring-4 focus:ring-violet-200"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-700
                             text-white font-semibold py-2.5 shadow-md hover:opacity-95 transition"
                >
                  {isLogin ? "Entrar" : "Criar conta"}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Ao continuar, você concorda com nossos termos.
              </p>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mt-6 w-full rounded-xl border border-slate-200 bg-white
                           text-slate-700 py-2 hover:bg-slate-50 transition"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
