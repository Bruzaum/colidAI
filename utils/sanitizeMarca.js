export function sanitizeMarca(marca) {
  return {
    nome: marca.nome?.trim(),
    tipo: marca.tipo,
    especificacao: marca.especificacao?.slice(0, 200) // corta excesso
  };
}
