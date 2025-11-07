// src/components/GraficoDoacoes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// meses fixos para garantir sempre 12 colunas
const MESES_PADRAO = [
  'Jan','Fev','Mar','Abr','Mai','Jun',
  'Jul','Ago','Set','Out','Nov','Dez'
];

export default function GraficoDoacoes({ refreshTrigger }) {
  const [dados, setDados]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('/api/doacoes/por-mes')
      .then(res => {
        const raw = res.data;

        // raw pode ser:
        // - [{ mes: 1, quantidade: X }, ...]
        // - [{ mes: "Jan", quantidade: X }, ...]
        // - array com 12 itens [{ mes: 1..12, quantidade }]
        const arr = Array.isArray(raw) ? raw : (raw && (raw.doacoes || raw.data || raw.result)) || [];

        // transforma em mapa para fácil lookup
        const mapa = new Map();

        arr.forEach(item => {
          if (!item) return;
          // se mes é numérico
          if (typeof item.mes === 'number') {
            const idx = item.mes - 1; // 0..11
            if (idx >= 0 && idx < 12) mapa.set(MESES_PADRAO[idx], Number(item.quantidade || 0));
            return;
          }
          // se mes é string tipo "Jan" ou "Janeiro" -> normaliza para 3 letras
          const mesStr = String(item.mes || '').slice(0,3);
          const match = MESES_PADRAO.find(m => m.toLowerCase() === mesStr.toLowerCase());
          if (match) {
            mapa.set(match, Number(item.quantidade || 0));
          }
        });

        // monta array final sempre com 12 elementos
        const mapeado = MESES_PADRAO.map(mes => ({
          mes,
          quantidade: mapa.has(mes) ? mapa.get(mes) : 0
        }));

        setDados(mapeado);
      })
      .catch(err => {
        console.error(err);
        setError('Não foi possível carregar o gráfico.');
      })
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-4 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Doações por Mês
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Carregando gráfico…</p>
      )}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
