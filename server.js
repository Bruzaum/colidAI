import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = 3333;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* =========================
   OPENAI CLIENT
========================= */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY não encontrada no .env");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =========================
   PROMPT BUILDER
========================= */
function buildColisaoPrompt(marcasCliente, marcasINPI) {
  return `
Você é um especialista jurídico em análise de colisão de marcas segundo critérios do INPI.

Analise POSSÍVEIS CONFLITOS entre marcas do cliente e marcas do INPI.

REGRAS ABSOLUTAS:
- Responda APENAS em JSON válido
- Não escreva explicações fora do JSON
- Não use markdown
- Não adicione comentários extras

FORMATO EXATO:
{
  "resultados": [
    {
      "marcaCliente": "string",
      "marcaINPI": "string",
      "risco": "BAIXO | MÉDIO | ALTO",
      "fundamento": "string"
    }
  ]
}

Marcas do Cliente:
${JSON.stringify(marcasCliente)}

Marcas do INPI:
${JSON.stringify(marcasINPI)}
`;
}

/* =========================
   ROUTE
========================= */
app.post("/api/analisar-colisao", async (req, res) => {
  try {
    const { marcasCliente, marcasINPI } = req.body;

    console.log("Cliente:", marcasCliente?.length);
    console.log("INPI:", marcasINPI?.length);

    /* ========= VALIDAÇÕES ========= */
    if (!Array.isArray(marcasCliente) || !Array.isArray(marcasINPI)) {
      return res.status(400).json({ error: "Payload inválido" });
    }

    if (marcasCliente.length === 0 || marcasINPI.length === 0) {
      return res.status(400).json({ error: "Listas vazias" });
    }

    if (marcasCliente.length > 20 || marcasINPI.length > 100) {
      return res.status(400).json({
        error: "Limite excedido (máx 20 cliente x 100 INPI)",
      });
    }

    /* ========= OPENAI ========= */
    const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,

    text: {
      format: {
        type: "json_schema",
        json_schema: {
          name: "analise_colisao",
          schema: {
            type: "object",
            properties: {
              resultados: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    marcaCliente: { type: "string" },
                    marcaINPI: { type: "string" },
                    risco: {
                      type: "string",
                      enum: ["BAIXO", "MÉDIO", "ALTO"]
                    },
                    fundamento: { type: "string" }
                  },
                  required: [
                    "marcaCliente",
                    "marcaINPI",
                    "risco",
                    "fundamento"
                  ]
                }
              }
            },
            required: ["resultados"]
          }
        }
      }
    }
  });

    const parsed = response.output_parsed;

    if (!parsed || !parsed.resultados) {
      console.error("❌ Resposta inválida:", response.output_text);
      return res.status(500).json({ error: "Resposta não parseável" });
    }

    console.log("✅ Colisões encontradas:", parsed.resultados.length);
    return res.json(parsed);
  } catch (err) {
    console.error("🔥 Erro geral:", err);

    return res.status(500).json({
      error: "Erro interno",
      detalhe: err.message,
    });
  }
});

/* =========================
   START
========================= */
app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
