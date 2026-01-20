import * as XLSX from 'xlsx'
import type { RelatorioColisao } from "../models/RelatorioColisao"


export function exportRelatorioExcel(data: RelatorioColisao[]) {
  const rows = data.flatMap(item =>
    item.colidencias.map(c => ({
      Marca_Cliente: item.marcaCliente.nome,
      Classe_Cliente: item.marcaCliente.classe,
      Marca_INPI: c.nome,
      Classe_INPI: c.classe,
      Grau_Risco: c.grauRisco,
      Fundamentacao: c.fundamentacao,
    }))
  )

  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Colidencias')

  XLSX.writeFile(workbook, 'relatorio-colidencias.xlsx')
}
