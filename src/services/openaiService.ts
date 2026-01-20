export async function analisarColidencia(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em análise de colidência de marcas registradas no INPI.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    throw new Error('Erro ao chamar OpenAI')
  }

  const data = await response.json()
  return data.choices[0].message.content
}
