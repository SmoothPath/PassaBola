// server.js
const express = require('express');
const cors = require('cors'); // Se precisar de CORS
const { router: authRoutes } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors()); // Habilita CORS para todas as origens

// Rotas
app.use('/api/auth', authRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API do Passa a Bola funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

