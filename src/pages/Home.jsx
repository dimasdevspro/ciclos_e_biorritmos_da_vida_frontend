// ================= FRONTEND (React App.jsx) =================
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const CustomDot = (props, tipo) => {
  const { cx, cy, payload } = props;

  if (!payload || !payload.status) return null; // 🛑 PROTEÇÃO

  const status = payload.status[tipo];

  if (!status) return null;

  let cor = "gray";
  let tamanho = 4;

  if (status.tipo === "positivo") cor = "green";
  if (status.tipo === "negativo") cor = "red";
  if (status.tipo === "critico") {
    cor = "purple";
    tamanho = 7;
  }
  if (status.tipo === "critico") {
    cor = "purple";
    tamanho = 7;
  } else if (status.alerta) {
    cor = "yellow";
  } else if (status.tipo === "positivo") {
    cor = "green";
  } else if (status.tipo === "negativo") {
    cor = "red";
  }

  return <circle cx={cx} cy={cy} r={tamanho} fill={cor} />;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const f = data.status?.fisico;
    const e = data.status?.emocional;
    const m = data.status?.intelectual;

    return (
      <div className="bg-blue-200 p-3 border rounded shadow">
        <p>
          <strong>Data:</strong> {data.data}
        </p>
        <p>
          <strong>Biorritmo Físico:</strong> {data.fisico} ({f?.tipo})
        </p>
        <p>
          <strong>Biorritmo Emocional:</strong> {data.emocional} ({e?.tipo})
        </p>
        <p>
          <strong>Biorritmo Intelectual:</strong> {data.intelectual} ({m?.tipo})
        </p>
      </div>
    );
  }
  return null;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [grafico, setGrafico] = useState([]);
  const [proximosCriticos, setProximosCriticos] = useState([]);
  const [diasPositivos, setDiasPositivos] = useState([]);
  const [ceu, setCeu] = useState(null);
  const [lua, setLua] = useState(null);
  const [aceite, setAceite] = useState(false);

  const calcular = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/calcular",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nascimento, nome }),
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setResultado(data);
      setGrafico(data?.grafico || []);

      // 🔴 próximos dias críticos
      const criticos = (data?.grafico || []).filter(
        (item) => item.dia > 0 && item.alerta,
      );

      // 🟢 melhores dias
      const positivos = (data?.grafico || [])
        .filter(
          (item) =>
            item.status?.fisico?.tipo === "positivo" &&
            item.status?.emocional?.tipo === "positivo" &&
            item.status?.intelectual?.tipo === "positivo",
        )
        .slice(0, 3);

      setProximosCriticos(criticos);
      setDiasPositivos(positivos);

      const resCeu = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/ceu",
      );
      const dataCeu = await resCeu.json();

      setCeu(dataCeu);

      const resLua = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/lua",
      );
      const dataLua = await resLua.json();

      setLua(dataLua);
    } catch (error) {
      console.error("Erro ao calcular:", error);
      alert(
        "Erro ao calcular. Verifique se o backend está rodando e os dados estão corretos.",
      );
    } finally {
      setLoading(false);
    }
  };

  const insight = resultado?.insight
    ? [
        resultado.insight.fisico,
        resultado.insight.emocional,
        resultado.insight.intelectual,
      ]
    : ["-", "-", "-"];

  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen bg-blue-50 p-4 md:p-8">
        <div className="flex gap-2 mb-4">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="bg-blue-100 border p-2 rounded w-full"
              placeholder="Nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="bg-blue-100 border p-2 rounded w-full"
              placeholder="Data de Nascimento"
              type="date"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
            />
            <button
              onClick={calcular}
              disabled={!aceite || loading}
              className={`px-4 py-2 rounded text-white ${
                !aceite || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Calculando..." : "Calcular"}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={aceite}
            onChange={(e) => setAceite(e.target.checked)}
          />
          <label className="text-xs text-gray-600">
            Li e concordo com a{" "}
            <a
              href="/privacidade"
              target="_blank"
              className="hover:underline text-blue-500"
            >
              Política de Privacidade.
            </a>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Seus dados são utilizados apenas para cálculo e não são armazenados.
        </p>
        {resultado && grafico.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {/* Cards de Resultado */}
            <div className="mt-6 p-6 rounded-2xl shadow-md bg-blue-100 border-blue-100">
              <h2 className="text-xl font-bold border-b pb-2">Resultado</h2>

              <p>
                <strong>Nome:</strong> {resultado.nome}
              </p>
              <p>
                <strong>Dias vividos:</strong> {resultado.diasVividos}
              </p>
              <p>
                <strong>Anos vividos:</strong> {resultado.anosVividos}
              </p>

              {/* Cards de Dia/Hora AMORC */}
              <h2 className="mt-6 font-semibold text-center">
                📅 Dia / ⏰ Hora (AMORC)
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-200 rounded-xl">
                  <p className="font-semibold">
                    📅 Dia: {hoje} ({resultado.diaSemana})
                  </p>
                  <p>Planeta: {resultado.planetaDia}</p>
                  <p>Nota: {resultado.notaDia}</p>
                </div>

                <div className="p-4 bg-blue-200 rounded-xl">
                  <p className="font-semibold">
                    ⏰ Hora: {new Date().toLocaleTimeString("pt-BR")}
                  </p>
                  <p>Planeta: {resultado.planetaHora}</p>
                  <p>Nota: {resultado.notaHora}</p>
                </div>
              </div>

              {/* Cards de Astronomia */}
              <h2 className="mt-6 font-semibold text-center">
                🔭 Céu atual (Astronomia)
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Céu */}
                <div className="p-4 bg-blue-200 rounded-xl shadow">
                  <p className="font-bold">
                    {" "}
                    🌍 Planetas visíveis no Horizonte
                  </p>

                  {!ceu && <p>Carregando...</p>}

                  {ceu?.visiveis?.length > 0 ? (
                    ceu.visiveis.map((p, i) => (
                      <p key={i}>
                        • {p.nome} — {p.altitude}°
                      </p>
                    ))
                  ) : ceu ? (
                    <p>Nenhum planeta visível agora</p>
                  ) : null}
                </div>

                {/* Lua */}
                <div className="mt-4 p-4 bg-blue-200 rounded-xl shadow">
                  <p className="font-bold">🌙 Lua</p>

                  {lua ? (
                    <>
                      <p>
                        <strong>Fase:</strong> {lua.fase}
                      </p>
                      <p>
                        <strong>Iluminação:</strong>{" "}
                        {(lua.iluminacao * 100).toFixed(0)}%
                      </p>
                    </>
                  ) : (
                    <p>Carregando...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-blue-100 rounded">
                <strong>Biorritmo Físico:</strong> {insight[0]?.tipo}
              </div>

              <div className="p-3 bg-blue-100 rounded">
                <strong>Biorritmo Emocional:</strong> {insight[1]?.tipo}
              </div>

              <div className="p-3 bg-blue-100 rounded">
                <strong>Biorritmo Intelectual:</strong> {insight[2]?.tipo}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-blue-100 shadow transition-all hover:scale-105">
                <p className="font-bold text-black-700 dark:text-black-300">
                  ⚠️ Dias Críticos
                </p>
                {proximosCriticos?.map((d, i) => (
                  <p key={i}>{d.data}</p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-100 shadow transition-all hover:scale-105">
                <p className="font-bold text-black-700 dark:text-g-black-300">
                  ✅ Melhores Dias
                </p>
                {diasPositivos?.map((d, i) => (
                  <p key={i}>{d.data}</p>
                ))}
              </div>
            </div>

            {/* Gráfico */}
            <div
              className="w-full h-[400px] md:h-[500px] mt-6 p-4 rounded-2xl shadow-md bg-blue-100 border-blue-100"
              style={{ width: "100%", height: 450 }}
            >
              <ResponsiveContainer>
                <LineChart data={grafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis domain={[0, 36]} ticks={[0, 7, 14, 21, 28, 33]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  {/* Linha HOJE */}
                  <ReferenceLine x={1} stroke="black" strokeDasharray="3 3" />

                  <Line
                    type="monotone"
                    dataKey="fisico"
                    dot={(props) => CustomDot(props, "fisico")}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    isAnimationActive
                  />
                  <Line
                    type="monotone"
                    dataKey="emocional"
                    dot={(props) => CustomDot(props, "emocional")}
                    stroke="#10b981"
                    strokeWidth={2}
                    isAnimationActive
                  />
                  <Line
                    type="linear"
                    dataKey="intelectual"
                    dot={(props) => CustomDot(props, "intelectual")}
                    stroke="#f59e0b"
                    strokeWidth={2}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legenda */}
            <div className="text-sm">
              <p>
                <strong>Legenda:</strong>
              </p>
              <p>🟢 Verde = positivo</p>
              <p>🔴 Vermelho = negativo</p>
              <p>🟣 Roxo = crítico</p>
              <p>🟡 Amarelo = precaução mínima</p>
              <p>📱 Visualização no celular, gire na horizontal.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
