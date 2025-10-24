// backend/routes/posts.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { authenticateToken, users } = require('./auth'); // Importa autenticação do auth.js

const router = express.Router();
const POSTS_FILE = path.join(__dirname, '../data/posts.json');

// Middleware para verificar se usuário é admin
const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Não autorizado' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Acesso negado: Admins apenas' });
  next();
};

// Função para ler posts do arquivo
function readPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Função para salvar posts no arquivo
function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Listar posts (público)
router.get('/', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// Criar post (admin)
router.post('/', authenticateToken, isAdmin, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Campos obrigatórios' });

  const posts = readPosts();

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
});

// Editar post (admin)
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const posts = readPosts();
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) return res.status(404).json({ error: 'Post não encontrado' });

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };

  savePosts(posts);
  res.json(posts[postIndex]);
});

// Deletar post (admin)
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;

  let posts = readPosts();
  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) return res.status(404).json({ error: 'Post não encontrado' });

  posts.splice(postIndex, 1);
  savePosts(posts);

  res.json({ message: 'Post deletado com sucesso' });
});

module.exports = { router };
