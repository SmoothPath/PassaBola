// backend/routes/eventos.js
const express = require("express");
const QRCode = require("qrcode");

// Se você já tem esse middleware em outro arquivo, mantenha seu import.
// Aqui vai um stub caso seu projeto use `authenticateToken` de ./auth.
let authenticateToken;
try {
  ({ authenticateToken } = require("./auth"));
} catch {
  // Fallback simples (aceita tudo) — troque pelo seu real se existir.
  authenticateToken = (req, _res, next) => {
    // Simula usuário logado; substitua pelos dados reais do JWT
    req.user = req.user || {
      email: "user@example.com",
      name: "Usuário Demo",
      role: "user",
    };
    next();
  };
}

const router = express.Router();

/** Apenas admin */
function requireAdmin(req, res, next) {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ error: "Acesso restrito a administradores" });
}

/** "Banco" em memória */
let eventos = [];
let nextId = 1;

/** Helpers */
function getEvento(id) {
  return eventos.find((e) => e.id === Number(id)) || null;
}

/** LISTAR (público) */
router.get("/", (_req, res) => {
  res.json({ ok: true, eventos });
});

/** CRIAR (admin) */
router.post("/", authenticateToken, requireAdmin, (req, res) => {
  const { titulo, descricao, data, local, vagas } = req.body || {};
  if (!titulo) return res.status(400).json({ error: "titulo é obrigatório" });

  const novo = {
    id: nextId++,
    titulo,
    descricao: descricao || "",
    data: data || "", // ex.: '2025-11-10 15:00'
    local: local || "",
    vagas: typeof vagas === "number" ? vagas : null,
    inscritos: [], // emails
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  eventos.push(novo);
  res.status(201).json({ ok: true, evento: novo });
});

/** LER (público) */
router.get("/:id", (req, res) => {
  const evt = getEvento(req.params.id);
  if (!evt) return res.status(404).json({ error: "Evento não encontrado" });
  res.json({ ok: true, evento: evt });
});

/** ATUALIZAR (admin) */
router.put("/:id", authenticateToken, requireAdmin, (req, res) => {
  const evt = getEvento(req.params.id);
  if (!evt) return res.status(404).json({ error: "Evento não encontrado" });

  const { titulo, descricao, data, local, vagas } = req.body || {};
  if (titulo !== undefined) evt.titulo = titulo;
  if (descricao !== undefined) evt.descricao = descricao;
  if (data !== undefined) evt.data = data;
  if (local !== undefined) evt.local = local;
  if (vagas !== undefined) evt.vagas = vagas;
  evt.updatedAt = new Date().toISOString();

  res.json({ ok: true, evento: evt });
});

/** REMOVER (admin) */
router.delete("/:id", authenticateToken, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const idx = eventos.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ error: "Evento não encontrado" });
  eventos.splice(idx, 1);
  res.json({ ok: true });
});

/** INSCREVER (autenticado) — GERA QR CODE */
router.post("/:id/inscrever", authenticateToken, async (req, res) => {
  const evt = getEvento(req.params.id);
  if (!evt) return res.status(404).json({ error: "Evento não encontrado" });

  // já inscrito? (aqui eu deixo retornar o QR mesmo assim)
  const jaInscrito = evt.inscritos.includes(req.user.email);
  if (!jaInscrito) {
    if (typeof evt.vagas === "number" && evt.inscritos.length >= evt.vagas) {
      return res.status(409).json({ error: "Evento sem vagas disponíveis" });
    }
    evt.inscritos.push(req.user.email);
    evt.updatedAt = new Date().toISOString();
  }

  const qrPayload = {
    tipo: "checkin_evento",
    eventoId: evt.id,
    eventoTitulo: evt.titulo,
    email: req.user.email,
    nome: req.user.name || "",
    data: evt.data || "",
  };

  try {
    const qrcodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), {
      errorCorrectionLevel: "M",
      width: 512,
      margin: 1,
    });

    return res.json({
      ok: true,
      jaInscrito,
      msg: jaInscrito ? "Você já estava inscrito. QR recarregado." : "Inscrição confirmada!",
      evento: evt,
      qrcodeDataUrl,
      qrPayload,
    });
  } catch (err) {
    console.error("Erro ao gerar QR:", err);
    return res.status(500).json({ error: "Falha ao gerar QR Code" });
  }
});

/** DESINSCREVER (autenticado) */
router.post("/:id/desinscrever", authenticateToken, (req, res) => {
  const evt = getEvento(req.params.id);
  if (!evt) return res.status(404).json({ error: "Evento não encontrado" });

  evt.inscritos = evt.inscritos.filter((e) => e !== req.user.email);
  evt.updatedAt = new Date().toISOString();
  res.json({ ok: true, evento: evt });
});

/** REGERAR/EXIBIR QR (autenticado) */
router.get("/:id/qrcode", authenticateToken, async (req, res) => {
  const evt = getEvento(req.params.id);
  if (!evt) return res.status(404).json({ error: "Evento não encontrado" });
  if (!evt.inscritos.includes(req.user.email)) {
    return res.status(403).json({ error: "Você não está inscrito neste evento" });
  }

  const qrPayload = {
    tipo: "checkin_evento",
    eventoId: evt.id,
    eventoTitulo: evt.titulo,
    email: req.user.email,
    nome: req.user.name || "",
    data: evt.data || "",
  };

  try {
    const qrcodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), {
      errorCorrectionLevel: "M",
      width: 512,
      margin: 1,
    });
    res.json({ ok: true, qrcodeDataUrl, qrPayload });
  } catch (err) {
    console.error("Erro ao gerar QR:", err);
    res.status(500).json({ error: "Falha ao gerar QR Code" });
  }
});

module.exports = { router };
