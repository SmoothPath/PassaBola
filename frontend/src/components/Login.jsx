import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

const Login = () => {
  const { login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (isLogin) {
        const loggedUser = await login(email, password);
        setMessage(
          `Bem-vindo, ${loggedUser.name}! Email: ${loggedUser.email} - ${loggedUser.points} Pontos`
        );
      } else {
        const newUser = await register(email, password, name);
        setMessage(
          `Cadastro realizado com sucesso! Bem-vindo, ${newUser.name} - ${newUser.points} Pontos`
        );
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Erro de autenticação:", err);
      setError(
        err.response?.data?.error || "Ocorreu um erro. Tente novamente."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          {isLogin ? "Entre na sua conta" : "Crie sua conta"}
        </h1>

        {/* Mensagens */}
        {message && (
          <div className="mb-4 text-green-600 font-medium">{message}</div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-pink-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-pink-700"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-700">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setError("");
            }}
            className="text-indigo-600 underline transition-colors hover:text-pink-600"
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
