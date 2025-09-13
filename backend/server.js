// backend/server.js
const express = require('express');
const cors = require('cors');

// importa os routers
const { router: authRoutes } = require('./routes/auth');
const { router: eventosRoutes } = require('./routes/eventos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventosRoutes); // ⬅️ agora plugado corretamente

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API do Passa a Bola funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
