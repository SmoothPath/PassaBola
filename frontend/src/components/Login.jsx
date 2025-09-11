import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

const Login = () => {
  const { user, login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (isLogin) {
        const loggedUser = await login(email, password);
        setMessage(`Bem-vindo, ${loggedUser.name}! Email: ${loggedUser.email} - ${loggedUser.points} Pontos`);
      } else {
        const newUser = await register(email, password, name);
        setMessage(`Cadastro realizado com sucesso! Bem-vindo, ${newUser.name} - ${newUser.points} Pontos`);
        setIsLogin(true); // muda para login após cadastro
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.error('Erro de autenticação:', err);
      setError(err.response?.data?.error || 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4D1473] to-[#3F1859] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#4D1473] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/>
              </svg>
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#1a1a1a]">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-center text-sm text-[#4D1473]">
            Sistema Passa a Bola
          </p>
        </div>

        {/* Mensagens de sucesso/erro/boas-vindas */}
        {message && <div className="mb-4 text-green-600 text-center font-medium">{message}</div>}
        {error && <div className="mb-4 text-red-600 text-center font-medium">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Nome: só no cadastro */}
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CB5B85] focus:border-[#CB5B85] sm:text-sm mb-3"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CB5B85] focus:border-[#CB5B85] sm:text-sm mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-b-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CB5B85] focus:border-[#CB5B85] sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4D1473] hover:bg-[#3F1859] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CB5B85] transition-colors duration-300"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setError('');
              }}
              className="text-[#4D1473] hover:text-[#9124BF] text-sm transition-colors duration-300"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
