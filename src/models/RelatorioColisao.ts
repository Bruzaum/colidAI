export type RelatorioColisao = {
  marcaCliente: {
    id: number
    nome: string
    classe: string
  }
  colidencias: {
    marcaINPIId: number
    nome: string
    classe: string
    grauRisco: 'BAIXO' | 'MEDIO' | 'ALTO'
    fundamentacao: string
  }[]
}