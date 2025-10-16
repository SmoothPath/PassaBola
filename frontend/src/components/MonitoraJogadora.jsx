import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceArea, ResponsiveContainer } from "recharts";

export default function MonitoraJogadora() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dados")
      .then(res => res.json())
      .then(setDados)
      .catch(err => console.error(err));
  }, []);

  if (!dados) return <p className="text-center text-gray-500 mt-10">Carregando dados...</p>;

  const renderGrafico = (titulo, data, faixaSegura, cor) => (
    <div className="bg-white rounded-2xl shadow p-6 my-6">
      <h2 className="text-xl font-semibold mb-4 text-center">{titulo}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          {faixaSegura && (
            <ReferenceArea y1={faixaSegura.min} y2={faixaSegura.max} fill={faixaSegura.cor} fillOpacity={0.2} />
          )}
          <Line type="monotone" dataKey="value" stroke={cor} strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {renderGrafico("🩸 Batimentos Cardíacos (bpm)", dados.batimento, { min: 60, max: 150, cor: "green" }, "#16a34a")}
      {renderGrafico("🌡️ Temperatura Corporal (°C)", dados.temperatura, { min: 36, max: 37.5, cor: "blue" }, "#2563eb")}
      {renderGrafico("🔥 Calorias (kcal acumuladas)", dados.calorias, null, "#f97316")}
    </div>
  );
}
