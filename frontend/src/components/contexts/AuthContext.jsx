import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../services/api';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega sessão existente
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user: u } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(u);

    return u;
  };

  // REGISTER
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user: u } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(u);

    return u;
  };

  // Atualiza user global + localStorage
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // ===== Persistência do status do quiz por usuário =====
  const getQuizKey = (u) => {
    try {
      const id = u?.id || u?._id || u?.email || 'anon';
      return `quizConcluido:${id}`;
    } catch {
      return 'quizConcluido:anon';
    }
  };

  const getQuizStatus = (u) => {
    const key = getQuizKey(u || user);
    return localStorage.getItem(key) === 'true';
  };

  const setQuizStatus = (done, u) => {
    const key = getQuizKey(u || user);
    localStorage.setItem(key, done ? 'true' : 'false');
  };
  // ======================================================

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        loading,
        getQuizStatus,
        setQuizStatus,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
