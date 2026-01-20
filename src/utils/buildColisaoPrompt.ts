import type { MarcasCliente } from '../models/MarcasCliente'
import type { MarcasINPI } from '../models/MarcasINPI'

export function buildColisaoPrompt(
  marcaCliente: MarcasCliente,
  marcasINPI: MarcasINPI[]
) {
  return `
Atue como um Paralegal especializado em Colidência de Marcas, atuando no Brasil.

Marca do Cliente:
- ID: ${marcaCliente.id}
- Nome: ${marcaCliente.nome}
- Classe NICE: ${marcaCliente.tipo}
- Especificação: ${marcaCliente.especificacao}

Marcas existentes para análise:
${marcasINPI
  .map(
    m => `
- ID: ${m.id}
  Nome: ${m.nome}
  Classe: ${m.tipo}
  Especificação: ${m.especificacao}
`
  )
  .join('')}

Regras obrigatórias de análise:
A- Se o nome for exatamente igual, apontar colidência independentemente da classe.
B- Analisar semântica, fonética e similaridade visual.
C- Se as classes não possuírem relação alguma, não apontar colidência.
   Exceção: classe 35 e casos do item A.
D- Caso exista classificação nacional antiga (presença de "/"), converter para classe correlata da NICE.
E- Desconsiderar palavras de uso comum dentro da respectiva classe.
F- Focar exclusivamente no núcleo distintivo da marca.
G- Considere quais colidências seriam relevantes do ponto de vista de um empresário.

Retorne EXCLUSIVAMENTE um JSON válido no formato:

{
  "marcaCliente": {
    "id": ${marcaCliente.id},
    "nome": "${marcaCliente.nome}",
    "classe": "${marcaCliente.tipo}"
  },
  "colidencias": [
    {
      "marcaINPIId": number,
      "nome": string,
      "classe": string,
      "grauRisco": "BAIXO" | "MEDIO" | "ALTO",
      "fundamentacao": string
    }
  ]
}

⚠️ Caso não haja colidência relevante, retorne "colidencias": []
`
}
