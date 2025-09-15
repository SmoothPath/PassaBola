// backend/routes/eventos.js
const express = require('express');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Middleware de autorização (somente admin)
function requireAdmin(req, res, next) {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ error: 'Acesso restrito a administradores' });
}

// "banco" em memória
let eventos = [];
let nextId = 1;

/**
 * CREATE – cria evento (apenas ADMIN)
 */
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { titulo, dataISO, local, capacidade, descricao, status = 'ativo' } = req.body;

  if (!titulo || !dataISO || !local) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, dataISO, local' });
  }

  const novo = {
    id: nextId++,
    titulo,
    dataISO, // ex: "2025-09-13T14:00:00.000Z" (ou "YYYY-MM-DDTHH:mm")
    local,
    capacidade: Number(capacidade) || 0,
    descricao: descricao || '',
    status, // 'ativo' | 'inativo' | 'encerrado'
    createdBy: req.user?.email || 'desconhecido',
    createdAt: new Date().toISOString(),
    inscritos: [],
  };

  eventos.push(novo);
  return res.status(201).json({ ok: true, evento: novo });
});

/**
 * LIST – lista eventos (apenas autenticado)
 */
router.get('/', authenticateToken, (req, res) => {
  const { q, status } = req.query;
  let lista = [...eventos];

  if (status) lista = lista.filter(e => e.status === status);
  if (q) {
    const s = String(q).toLowerCase();
    lista = lista.filter(e =>
      e.titulo.toLowerCase().includes(s) ||
      e.local.toLowerCase().includes(s)
    );
  }
  res.json({ ok: true, eventos: lista });
});

/**
 * LISTAR EVENTOS INSCRITOS – do usuário atual
 * ( precisa ficar antes de /:id para não ser interceptado)
 */
router.get('/meus/inscritos', authenticateToken, (req, res) => {
  const meus = eventos.filter(e => e.inscritos.includes(req.user.email));
  res.json({ ok: true, eventos: meus });
});

/**

/**
 * READ – obter 1 evento (apenas autenticado)
 */
router.get('/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const evt = eventos.find(e => e.id === id);
  if (!evt) return res.status(404).json({ error: 'Evento não encontrado' });
  res.json({ ok: true, evento: evt });
});

/**
 * UPDATE – editar (apenas ADMIN)
 */
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const idx = eventos.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Evento não encontrado' });

  const patch = req.body || {};
  eventos[idx] = { ...eventos[idx], ...patch };
  res.json({ ok: true, evento: eventos[idx] });
});

/**
 * DELETE – remover (apenas ADMIN)
 */
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const before = eventos.length;
  eventos = eventos.filter(e => e.id !== id);
  if (eventos.length === before) return res.status(404).json({ error: 'Evento não encontrado' });
  res.json({ ok: true });
});



/**
 * INSCRIÇÃO – usuário se inscreve em um evento
 */
router.post('/:id/inscrever', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const evt = eventos.find(e => e.id === id);
  if (!evt) return res.status(404).json({ error: 'Evento não encontrado' });

  if (evt.inscritos.includes(req.user.email)) {
    return res.status(400).json({ error: 'Usuário já inscrito' });
  }

  if (evt.capacidade > 0 && evt.inscritos.length >= evt.capacidade) {
    return res.status(400).json({ error: 'Capacidade máxima atingida' });
  }

  evt.inscritos.push(req.user.email);
  res.json({ ok: true, evento: evt });
});

// remover inscrito específico (apenas ADMIN)
router.delete('/:id/inscritos/:email', authenticateToken, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const email = decodeURIComponent(req.params.email || "").toLowerCase();

  const evt = eventos.find(e => e.id === id);
  if (!evt) return res.status(404).json({ error: 'Evento não encontrado' });
  if (!email) return res.status(400).json({ error: 'Email inválido' });

  const before = evt.inscritos.length;
  evt.inscritos = evt.inscritos.filter(e => e.toLowerCase() != email);
  const removed = evt.inscritos.length < before;

  res.json({ ok: true, removed, evento: evt });
});


/**
 * CANCELAR INSCRIÇÃO – usuário sai do evento
 */
router.post('/:id/cancelar', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const evt = eventos.find(e => e.id === id);
  if (!evt) return res.status(404).json({ error: 'Evento não encontrado' });

  evt.inscritos = evt.inscritos.filter(email => email !== req.user.email);
  res.json({ ok: true, evento: evt });
});

/**
 * LISTAR EVENTOS INSCRITOS – do usuário atual
 */
router.get('/meus/inscritos', authenticateToken, (req, res) => {
  const meus = eventos.filter(e => e.inscritos.includes(req.user.email));
  res.json({ ok: true, eventos: meus });
});

module.exports = { router };
