export async function analisarColidencia(
  marcasCliente: any[],
  marcasINPI: any[]
) {
  const response = await fetch('http://localhost:3333/api/analisar-colisao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      marcasCliente,
      marcasINPI,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Erro backend:', error)
    throw new Error('Erro ao analisar colisões')
  }

  return response.json()
}
