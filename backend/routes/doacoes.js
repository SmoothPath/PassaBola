// backend/routes/doacoes.js
const express = require('express');
const Doacao  = require('../models/Doacao');
const router  = express.Router();

// GET /api/doacoes/por-mes
router.get('/por-mes', async (req, res) => {
  try {
    const doacoesPorMes = await Doacao.aggregate([
      { $group: { _id: { $month: '$data' }, quantidade: { $sum: 1 } } },
      { $project: { mes: '$_id', quantidade: 1, _id: 0 } },
      { $sort: { mes: 1 } }
    ]);
    res.json(doacoesPorMes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar doações por mês.' });
  }
});

// POST / => registra uma nova doação
router.post('/', async (req, res) => {
  try {
    const { nome, email, valor, mensagem } = req.body;
    const novaDoacao = await Doacao.create({
      nome,
      email,
      valor,
      mensagem,
      data: new Date()
    });
    res.status(201).json(novaDoacao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Não foi possível processar a doação.' });
  }
});

module.exports = { router };
