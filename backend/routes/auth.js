// auth.js (backend)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Simulação de banco de dados (em memória)
let users = [];

// Chave secreta para JWT (em produção, use variável de ambiente)
const JWT_SECRET = 'chave_secreta';

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso necessário' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar se usuário já existe
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      points: 0,
      role: 'user' // padrão: usuário comum
    };

    users.push(user);

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        points: user.points,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontrar usuário
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        points: user.points,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter perfil do usuário (protegida)
router.get('/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    points: user.points,
    role: user.role
  });
});

// Rota para atualizar perfil do usuário (protegida)
router.put('/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  const { points, position, location, age, eventsParticipated, experience } = req.body;

  if (points !== undefined) user.points = points;
  if (position) user.position = position;
  if (location) user.location = location;
  if (age) user.age = age;
  if (eventsParticipated) user.eventsParticipated = eventsParticipated;
  if (experience) user.experience = experience;

// Atualiza os campos recebidos no corpo da requisição
  res.json({ message: 'Perfil atualizado com sucesso', user });
});



module.exports = { router, authenticateToken, users };