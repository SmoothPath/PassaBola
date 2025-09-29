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
app.use(cors({
    origin: [
      'https://passa-bola-8d13.vercel.app',
      'http://localhost:3000',             
      'http://localhost:5173'               
  ], 

  credentials: true
}));


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

// Exporta p/ serverless (Vercel)
module.exports = app;

// Só escuta porta em ambiente local (npm run dev)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}