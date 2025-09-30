// backend/server.js
const express = require('express');
const cors = require('cors');

const { router: authRoutes } = require('./routes/auth');
const { router: eventosRoutes } = require('./routes/eventos');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS

const allowed = [
  'https://passa-bola-8d13.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOpts = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    return allowed.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOpts));
app.options('*', cors(corsOpts)); // responde preflight


// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventosRoutes);

// Health/padrão
app.get('/', (req, res) => {
  res.json({ message: 'API do Passa a Bola funcionando!' });
});
app.get('/healthz', (req, res) => res.send('ok'));

// Iniciar servidor (Render)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
