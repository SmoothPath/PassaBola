const express = require("express");
const fs = require("fs");
const router = express.Router();

let rankingData = []; // armazenado em memória (ou pode gravar num arquivo)

// Recebe dados do Python
router.post("/", (req, res) => {
  rankingData = req.body;
  fs.writeFileSync("rankingData.json", JSON.stringify(rankingData, null, 2));
  res.status(200).json({ message: "Ranking atualizado com sucesso!" });
});

// Retorna dados para o frontend
router.get("/", (req, res) => {
  if (fs.existsSync("rankingData.json")) {
    const data = JSON.parse(fs.readFileSync("rankingData.json"));
    return res.json(data);
  }
  res.json(rankingData);
});

module.exports = { router };