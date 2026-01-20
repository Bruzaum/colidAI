import type { MarcasINPI } from '../models/MarcasINPI'

/*
type ClasseNice = {
  '@attributes': {
    codigo: string
  }
  especificacao?: string
}

export function xmlJsonToMarcasINPI(xmlJson: any): MarcasINPI[] {
  const resultado: MarcasINPI[] = []
  let idCounter = 1

  const processos = Array.isArray(xmlJson?.processo)
    ? xmlJson.processo
    : [xmlJson?.processo]

  for (const processo of processos) {
    if (!processo) continue

    const nomeTitular =
      processo.titulares?.titular?.['@attributes']?.['nome-razao-social']

    if (!nomeTitular) continue

    const classeNiceRaw = processo['lista-classe-nice']?.['classe-nice']
    if (!classeNiceRaw) continue

    const classesNice: ClasseNice[] = Array.isArray(classeNiceRaw)
      ? classeNiceRaw
      : [classeNiceRaw]

    for (const classe of classesNice) {
      const tipo = classe['@attributes']?.codigo
      const especificacao = classe.especificacao?.trim()

      if (!tipo || !especificacao) continue

      resultado.push({
        id: idCounter++,
        nome: nomeTitular,
        tipo,
        especificacao,
      })
    }
  }

  return resultado
}
*/


export function xmlJsonToMarcasINPI(json: any) {
  const processos =
    json?.revista?.processo ||
    json?.revista?.['processo'] ||
    []

  if (!Array.isArray(processos)) return []

  return processos.map((proc: any, index: number) => {
    const titular =
      proc?.titulares?.titular?.['@attributes'] ||
      proc?.titulares?.titular ||
      {}

    const classeNice =
      proc?.['lista-classe-nice']?.['classe-nice'] ||
      {}

    return {
      id: index + 1,
      nome: titular['nome-razao-social'] ?? '',
      tipo: classeNice?.['@attributes']?.codigo ?? '',
      especificacao: classeNice?.especificacao ?? ''
    }
  })
}
