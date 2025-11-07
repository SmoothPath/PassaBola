const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Caminho para o arquivo de armazenamento local
const FILE_PATH = path.join(__dirname, '../data/doacoes.json');

// Garante que o arquivo exista
function ensureFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
    fs.writeFileSync(FILE_PATH, '[]', 'utf8');
  }
}

// Lê as doações do arquivo
function readDoacoes() {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Escreve as doações no arquivo
function writeDoacoes(arr) {
  ensureFile();
  fs.writeFileSync(FILE_PATH, JSON.stringify(arr, null, 2), 'utf8');
}

// Formata dados agrupados por mês
function formatPorMesFromArray(arr) {
  const counts = Array(12).fill(0);
  arr.forEach((d) => {
    const date = d.data ? new Date(d.data) : new Date();
    const m = date.getMonth(); // 0..11
    counts[m] = (counts[m] || 0) + 1;
  });
  return counts.map((q, idx) => ({ mes: idx + 1, quantidade: q }));
}

/**
 * GET /doacoes/por-mes
 * Retorna doações agrupadas por mês (1..12)
 */
router.get('/por-mes', (req, res) => {
  try {
    const doacoes = readDoacoes();
    const formatted = formatPorMesFromArray(doacoes);
    return res.json(formatted);
  } catch (err) {
    console.error('Erro ao buscar doações por mês:', err);
    return res.status(500).json({ erro: 'Erro ao buscar doações por mês.' });
  }
});

/**
 * POST /doacoes
 * body: { nome, email, valor, mensagem }
 * Cria uma doação e salva em JSON local
 */
router.post('/', (req, res) => {
  try {
    const { nome, email, valor, mensagem } = req.body || {};

    // validações básicas
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
    }

    const valorNum = valor === '' || valor === undefined ? 0 : Number(valor);
    if (isNaN(valorNum) || valorNum < 0) {
      return res.status(400).json({ erro: 'Valor inválido.' });
    }

    const nova = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: email.trim(),
      valor: valorNum,
      mensagem: (mensagem || '').trim(),
      data: new Date().toISOString(),
    };

    const doacoes = readDoacoes();
    doacoes.push(nova);
    writeDoacoes(doacoes);

    return res.status(201).json({ mensagem: 'Doação registrada com sucesso!', doacao: nova });
  } catch (err) {
    console.error('Erro ao criar doação:', err);
    return res.status(500).json({ erro: 'Não foi possível processar a doação.' });
  }
});

module.exports = { router };