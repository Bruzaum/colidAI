import type { MarcasINPI } from '../models/MarcasINPI'

export function xmlJsonToMarcasINPI(xmlJson: any): MarcasINPI[] {
  console.log('📥 XML JSON root keys:', Object.keys(xmlJson))

  const rawProcessos =
    xmlJson?.processo ||
    xmlJson?.['processo'] ||
    xmlJson?.revista?.processo ||
    []

  const processos = Array.isArray(rawProcessos)
    ? rawProcessos
    : [rawProcessos]

  const resultado: MarcasINPI[] = []
  let idCounter = 1

  for (const processo of processos) {
    if (!processo) continue

    const nomeTitular =
      processo?.titulares?.titular?.['@attributes']?.['nome-razao-social']

    if (!nomeTitular) {
      console.warn('⚠ Processo ignorado (sem titular)')
      continue
    }

    const classeNiceRaw =
      processo?.['lista-classe-nice']?.['classe-nice']

    if (!classeNiceRaw) continue

    const classesNice = Array.isArray(classeNiceRaw)
      ? classeNiceRaw
      : [classeNiceRaw]

    for (const classe of classesNice) {
      const tipo = classe?.['@attributes']?.codigo
      const especificacao = classe?.especificacao?.trim()

      if (!tipo || !especificacao) continue

      resultado.push({
        id: idCounter++,
        nome: nomeTitular,
        tipo,
        especificacao
      })
    }
  }

  console.log('🏛 Marcas INPI extraídas:', resultado.length)
  return resultado
}
