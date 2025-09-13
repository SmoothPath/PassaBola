import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, register, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let res;
      if (isLogin) {
        // Login
        res = await login(email, password);
      } else {
        // Registro
        res = await register(email, password, name);
      }

      // Atualiza estado global com os dados do usuário
      updateUser(res.user);

      // Redireciona para Perfil.jsx
      navigate("/perfil");
    } catch (err) {
      console.error("Erro de autenticação:", err);
      setError(err.response?.data?.error || "Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          {isLogin ? "Entre na sua conta" : "Crie sua conta"}
        </h1>

        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-700">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 underline"
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
