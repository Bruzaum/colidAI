import { useEffect, useState } from 'react'

import { FileInput } from '../components/FileInput'
import { CsvInput } from '../components/CsvInput'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { RelatorioColisoes } from '../components/RelatorioColisoes'

import { xmlToJson } from '../utils/xmlToJson'
import { csvToMarcasCliente } from '../utils/csvToMarcasCliente'
import { xmlJsonToMarcasINPI } from '../utils/xmlJsonToMarcasINPI'
import { buildColisaoPrompt } from '../utils/buildColisaoPrompt'
import { exportRelatorioExcel } from '../utils/exportRelatorioExcel'

import { analisarColidencia } from '../services/openaiService'

import type { MarcasCliente } from '../models/MarcasCliente'
import type { MarcasINPI } from '../models/MarcasINPI'

import { parseStringPromise } from 'xml2js'

/*
async function convertXmlToJson(xml: string) {
  return await parseStringPromise(xml, {
    explicitArray: false,
    mergeAttrs: true,
    ignoreAttrs: false
  })
}
  */

type RelatorioColisao = {
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

export function Home() {
  const [xmlContent, setXmlContent] = useState('')
  const [csvContent, setCsvContent] = useState('')

  const [marcasCliente, setMarcasCliente] = useState<MarcasCliente[]>([])
  const [marcasINPI, setMarcasINPI] = useState<MarcasINPI[]>([])
  const [relatorio, setRelatorio] = useState<RelatorioColisao[]>([])

  const [isLoading, setIsLoading] = useState(false)

  /**
   * Processa automaticamente XML + CSV
   
  useEffect(() => {

    console.log('XML:', xmlContent.length)
    console.log('CSV:', csvContent.length)
    
    if (!xmlContent || !csvContent) return

    const processarArquivos = async () => {
      setIsLoading(true)
      setRelatorio([])

      const xmlConverted = xmlToJson(xmlContent)
      const inpi = xmlJsonToMarcasINPI(xmlConverted)
      const cliente = csvToMarcasCliente(csvContent)

      setMarcasINPI(inpi)
      setMarcasCliente(cliente)

      setIsLoading(false)
    }

    processarArquivos()
  }, [xmlContent, csvContent]) */



  useEffect(() => {
  if (!xmlContent || !csvContent) return

  const xmlConverted = xmlToJson(xmlContent)

  const cliente = csvToMarcasCliente(csvContent)
  const inpi = xmlJsonToMarcasINPI(xmlConverted)

  console.log('Cliente length:', cliente.length)
  console.log('INPI length:', inpi.length)

  setMarcasCliente(cliente)
  setMarcasINPI(inpi)
}, [xmlContent, csvContent])

  /**
   * 🔥 Chamada do ChatGPT (botão Verificar Colidências)
   */
  const verificarColidencias = async () => {
    if (!marcasCliente.length || !marcasINPI.length) return

    setIsLoading(true)

    try {
      const resultados: RelatorioColisao[] = []

      for (const marcaCliente of marcasCliente) {
        const prompt = buildColisaoPrompt(marcaCliente, marcasINPI)
        const resposta = await analisarColidencia(prompt)

        const parsed = JSON.parse(resposta)

        // Só adiciona se houver colidências
        if (parsed.colidencias && parsed.colidencias.length > 0) {
          resultados.push(parsed)
        }
      }

      setRelatorio(resultados)
    } catch (error) {
      console.error('Erro ao verificar colidências:', error)
      alert('Erro ao analisar colidências. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">
      <h1 className="text-3xl font-bold text-emerald-400">
        Análise de Colidência de Marcas
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FileInput
          label="Arquivo XML — INPI"
          onFileLoad={setXmlContent}
        />

        <CsvInput onLoad={setCsvContent} />
      </div>

      {xmlContent && csvContent && (
        <Button
          label="Verificar Colidências"
          onClick={verificarColidencias}
        />
      )}


      {isLoading && <LoadingSpinner />}

      {!isLoading && relatorio.length > 0 && (
        <>
          <div className="flex justify-end">
            <Button
              label="Baixar Relatório (Excel)"
              onClick={() => exportRelatorioExcel(relatorio)}
            />
          </div>

          <RelatorioColisoes data={relatorio} />
        </>
      )}

      {!isLoading &&
        marcasCliente.length > 0 &&
        marcasINPI.length > 0 &&
        relatorio.length === 0 && (
          <p className="text-sm text-gray-400">
            Nenhuma colidência relevante identificada.
          </p>
        )}
    </div>
  )
}
function convertXmlToJson(xmlContent: string) {
  throw new Error('Function not implemented.')
}

