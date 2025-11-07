// backend/routes/doacoes.js
const express = require('express');
const router = express.Router();

let DoacaoModel = null;
try {
  DoacaoModel = require('../models/Doacao'); // se existir, usará Mongo/Mongoose
} catch (e) {
  DoacaoModel = null;
}

// Fallback em memória quando não há DB (persistência apenas enquanto servidor roda)
let doacoesMemory = [];
// Se quiser carregar de arquivo, podemos adaptar mais tarde.

function formatPorMesFromArray(arr) {
  // arr: itens com { data: Date }
  const counts = Array(12).fill(0);
  arr.forEach((d) => {
    const date = d.data ? new Date(d.data) : new Date();
    const m = date.getMonth(); // 0..11
    counts[m] = (counts[m] || 0) + 1;
  });
  // transforma em [{ mes: 1, quantidade: x }, ...]
  return counts.map((q, idx) => ({ mes: idx + 1, quantidade: q }));
}

/**
 * GET /doacoes/por-mes
 * Retorna doações agrupadas por mês (1..12)
 */
router.get('/por-mes', async (req, res) => {
  try {
    if (DoacaoModel) {
      // Mongoose aggregate (compatível com campo data)
      const agg = await DoacaoModel.aggregate([
        {
          $group: {
            _id: { $month: '$data' },
            quantidade: { $sum: 1 },
          },
        },
        { $project: { mes: '$_id', quantidade: 1, _id: 0 } },
        { $sort: { mes: 1 } },
      ]);

      // Agg retorna apenas meses com dados; precisamos normalizar para 1..12
      const result = Array(12).fill(0);
      agg.forEach((r) => {
        const m = Number(r.mes);
        if (m >= 1 && m <= 12) result[m - 1] = r.quantidade;
      });
      const formatted = result.map((q, idx) => ({ mes: idx + 1, quantidade: q }));
      return res.json(formatted);
    } else {
      // Fallback memória
      const formatted = formatPorMesFromArray(doacoesMemory);
      return res.json(formatted);
    }
  } catch (err) {
    console.error('Erro ao buscar doações por mês:', err);
    return res.status(500).json({ erro: 'Erro ao buscar doações por mês.' });
  }
});

/**
 * POST /doacoes
 * body: { nome, email, valor, mensagem }
 * Cria uma doação (simulada)
 */
router.post('/', async (req, res) => {
  try {
    const { nome, email, valor, mensagem } = req.body || {};

    // validações básicas
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }
    const valorNum = Number(valor) || 0;
    if (valor !== undefined && isNaN(valorNum)) {
      return res.status(400).json({ erro: 'Valor inválido.' });
    }

    const nova = {
      nome,
      email,
      valor: valorNum,
      mensagem: mensagem || '',
      data: new Date(),
    };

    if (DoacaoModel) {
      // criar no Mongo
      const created = await DoacaoModel.create(nova);
      return res.status(201).json(created);
    } else {
      // criar em memória (gera id simples)
      const id = (Date.now() + Math.floor(Math.random() * 1000)).toString();
      const record = { id, ...nova };
      doacoesMemory.push(record);
      return res.status(201).json(record);
    }
  } catch (err) {
    console.error('Erro ao criar doação:', err);
    return res.status(500).json({ erro: 'Não foi possível processar a doação.' });
  }
});

module.exports = { router };
