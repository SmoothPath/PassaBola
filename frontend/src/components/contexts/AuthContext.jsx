import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);

      // Retorna user e token
      return { user, token };
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await api.post('/register', { email, password, name });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);

      // Retorna user e token
      return { user, token };
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
