export function buildColisaoPrompt(marcasCliente, marcasINPI) {
  return `
Você é um especialista jurídico em marcas (INPI).

Analise colisões entre marcas.

⚠️ REGRAS OBRIGATÓRIAS:
- Responda EXCLUSIVAMENTE em JSON válido
- NÃO escreva texto fora do JSON
- NÃO use markdown
- NÃO explique nada fora dos campos

FORMATO EXATO DA RESPOSTA:
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

DADOS DO CLIENTE:
${JSON.stringify(marcasCliente)}

DADOS DO INPI:
${JSON.stringify(marcasINPI)}
`;
}
