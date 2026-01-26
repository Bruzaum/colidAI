import type { MarcasCliente } from '../models/MarcasCliente'
import type { MarcasINPI } from '../models/MarcasINPI'

export function buildColisaoPrompt(
  marcaCliente: MarcasCliente,
  marcasINPI: MarcasINPI[]
): string {
  const marcasFormatadas = marcasINPI
    .map((m, index) => {
      return `${index + 1}. Nome: ${m.nome}, Classe: ${m.tipo} (Classificação de NICE)`
    })
    .join('\n')

  return `
Atue como um Paralegal especialista em Propriedade Intelectual, com foco em análise de colidência de marcas no Brasil, observando a prática do INPI.

DADOS DA MARCA DO CLIENTE:
- Nome: ${marcaCliente.nome}
- Classe: ${marcaCliente.tipo} (Classificação de NICE)

MARCAS EXISTENTES PARA ANÁLISE:
${marcasFormatadas}

CRITÉRIOS OBRIGATÓRIOS PARA A ANÁLISE:

A. Caso o nome da marca seja idêntico ou praticamente idêntico, a colidência deve ser apontada, independentemente da classe.

B. Avaliar a semelhança fonética, gráfica e semântica entre as marcas, considerando o núcleo distintivo do elemento nominativo.

C. Considerar colidência apenas quando as classes forem idênticas ou correlatas, com base na Classificação de NICE.
   - Classes sem qualquer afinidade NÃO devem gerar colidência.
   - Exceção: marcas na Classe 35 podem colidir com outras classes quando houver afinidade mercadológica.

D. Caso a classe informada utilize classificação nacional antiga (identificável pela presença de "/"), ela deve ser convertida para a classe correlata da Classificação de NICE atual.

E. Desconsiderar termos genéricos, descritivos ou de uso comum nas respectivas classes, tais como:
   - "Medic", "Clínica", "Farm", "Notícias", "Restaurante", entre outros.
   A análise deve focar exclusivamente no elemento distintivo da marca.

F. Avaliar a colidência sob a perspectiva prática do titular da marca do cliente, considerando quais marcas existentes poderiam gerar risco jurídico ou comercial relevante.

INSTRUÇÕES DE RESPOSTA (OBRIGATÓRIAS):

- Retorne APENAS as marcas em que haja colidência relevante.
- Caso não exista qualquer colidência relevante, retorne um array vazio.
- NÃO inclua explicações fora da estrutura solicitada.
- A resposta DEVE ser um JSON válido, sem comentários ou texto adicional.

FORMATO EXATO DA RESPOSTA:

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
`
}
