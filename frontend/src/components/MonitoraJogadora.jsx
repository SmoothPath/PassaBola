import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

export default function MonitoraJogadora() {
  const [dados, setDados] = useState(null);
  const [mqttMsg, setMqttMsg] = useState("Aguardando dados MQTT...");
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false); // --- NOVO ---

  const buscarDados = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/dados");
      const data = await res.json();
      setDados(data);
      if (data.mqtt) setMqttMsg(data.mqtt);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- NOVO ---
  const enviarComando = async (comando) => {
    try {
      setEnviando(true);
      await fetch("http://localhost:5000/api/dados/comando", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comando }),
      });
      alert(`Comando enviado: ${comando}`);
    } catch (err) {
      console.error("Erro ao enviar comando:", err);
    } finally {
      setEnviando(false);
    }
  };
  // --- FIM NOVO ---

  // Atualiza dados a cada 10s
  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 10000);
    return () => clearInterval(intervalo);
  }, []);

  if (!dados)
    return (
      <p className="text-center text-gray-500 mt-10">Carregando dados...</p>
    );

   // --- NOVO ---
  const renderFaixaLegenda = (texto, cor) => (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <div className="w-4 h-4 rounded" style={{ backgroundColor: cor, opacity: 0.3 }}></div>
      <span>{texto}</span>
    </div>
  );
  // --- FIM NOVO ---
const renderGrafico = (titulo, data, faixaSegura, cor) => (
  <div className="bg-white rounded-2xl shadow p-6 my-6">
    <h2 className="text-xl font-semibold mb-2 text-center">{titulo}</h2>

    {faixaSegura && renderFaixaLegenda(
      `Faixa segura: ${faixaSegura.min} - ${faixaSegura.max}`,
      faixaSegura.cor
    )}

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        {/* --- FIX 1: força o eixo Y a incluir a faixa segura --- */}
        <YAxis domain={[faixaSegura ? faixaSegura.min - 10 : "auto", faixaSegura ? faixaSegura.max + 10 : "auto"]} />
        <Tooltip />
        {/* --- FIX 2: faixa mais visível --- */}
        {faixaSegura && (
          <ReferenceArea
            y1={faixaSegura.min}
            y2={faixaSegura.max}
            fill={faixaSegura.cor}
            fillOpacity={0.25} // Aumentado de 0.2 para 0.25
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={cor}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Monitoramento da Jogadora
        </h1>
        <button
          onClick={buscarDados}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Atualizando..." : "🔄 Atualizar dados"}
        </button>
      </div>

      {/* --- NOVO --- Botão para enviar comando MQTT */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => enviarComando("alertaOff")}
          disabled={enviando}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "🚫 Desativar Alerta"}
        </button>
      </div>
      {/* --- FIM NOVO --- */}

      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-xl mb-6">
        <strong>📡 Última mensagem MQTT recebida:</strong>
        <p className="mt-2 font-mono">{mqttMsg}</p>
      </div>

      
      {/* --- NOVO --- adicionadas faixas seguras em todos os gráficos */}
      {renderGrafico(
        "🩸 Batimentos Cardíacos (bpm)",
        dados.batimento,
        { min: 60, max: 150, cor: "#16a34a" },
        "#16a34a"
      )}

      {renderGrafico(
        "🌡️ Temperatura Corporal (°C)",
        dados.temperatura,
        { min: 36, max: 37.5, cor: "#2563eb" },
        "#2563eb"
      )}

      {renderGrafico(
        "🔥 Calorias (kcal acumuladas)",
        dados.calorias,
        { min: 0, max: 500, cor: "#f97316" },
        "#f97316"
      )}
      {/* --- FIM NOVO --- */}
    </div>
  );
}
