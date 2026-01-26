import type { MarcasCliente } from '../models/MarcasCliente'

export function csvToMarcasCliente(csv: string): MarcasCliente[] {
  const lines = csv.split('\n').map(l => l.trim()).filter(Boolean)

  // remove header
  const [, ...rows] = lines

  const result: MarcasCliente[] = []
  let idCounter = 1

  for (const row of rows) {
    const [nome, tipo, especificacao] = row.split(';')

    if (!nome || !tipo || !especificacao) continue

    const exists = result.some(item =>
      item.nome === nome &&
      item.tipo === tipo &&
      item.especificacao === especificacao
    )

    if (exists) continue

    result.push({
      id: idCounter++,
      nome: nome.trim(),
      tipo: tipo,
      especificacao: especificacao.trim(),
    })
  }

  console.log('📄 MarcasCliente criadas:', result.length);
  console.log('🧾 Exemplo MarcasCliente:', result[0]);

  return result
}
