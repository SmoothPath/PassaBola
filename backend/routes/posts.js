// backend/routes/posts.js
const express = require("express");
const fs = require("fs");
const path = require("path");

// Usa a mesma autenticação dos eventos
let authenticateToken;
try {
  ({ authenticateToken } = require("./auth"));
} catch {
  authenticateToken = (req, _res, next) => {
    req.user = req.user || {
      email: "user@example.com",
      name: "Usuário Demo",
      role: "user",
    };
    next();
  };
}

const router = express.Router();
const POSTS_FILE = path.join(__dirname, "../data/posts.json");

/** Apenas admin */
function requireAdmin(req, res, next) {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ error: "Acesso restrito a administradores" });
}

/** Helpers: ler/salvar arquivo */
function readPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function savePosts(posts) {
  // Garante que o diretório existe
  const dir = path.dirname(POSTS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

function getPost(id) {
  const posts = readPosts();
  return posts.find((p) => p.id === Number(id)) || null;
}

/** -------------------- ROTAS -------------------- **/

/** LISTAR (público) */
router.get("/", (_req, res) => {
  const posts = readPosts();
  res.json({ ok: true, posts });
});

/** CRIAR (admin) */
router.post("/", authenticateToken, requireAdmin, (req, res) => {
  const { title, content } = req.body || {};
  
  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const posts = readPosts();

  const novoPost = {
    id: Date.now(),
    title,
    content: content || "",
    author: req.user.name || req.user.email || "Administrador",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.unshift(novoPost);
  savePosts(posts);

  res.status(201).json({ ok: true, post: novoPost });
});

/** LER UM POST (público) */
router.get("/:id", (req, res) => {
  const post = getPost(req.params.id);
  if (!post) return res.status(404).json({ error: "Post não encontrado" });
  res.json({ ok: true, post });
});

/** ATUALIZAR (admin) */
router.put("/:id", authenticateToken, requireAdmin, (req, res) => {
  const { title, content } = req.body || {};
  
  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const posts = readPosts();
  const postIndex = posts.findIndex((p) => p.id === Number(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post não encontrado" });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content: content || "",
    updatedAt: new Date().toISOString(),
  };

  savePosts(posts);
  res.json({ ok: true, post: posts[postIndex] });
});

/** REMOVER (admin) */
router.delete("/:id", authenticateToken, requireAdmin, (req, res) => {
  const posts = readPosts();
  const postIndex = posts.findIndex((p) => p.id === Number(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post não encontrado" });
  }

  posts.splice(postIndex, 1);
  savePosts(posts);

  res.json({ ok: true });
});

module.exports = { router };