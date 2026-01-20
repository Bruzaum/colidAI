type DownloadJsonButtonProps = {
  data: unknown
  fileName?: string
}

export function DownloadJsonButton({
  data,
  fileName = 'resultado.json',
}: DownloadJsonButtonProps) {
  const handleDownload = () => {
    if (!data) return

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-600"
    >
      Download JSON
    </button>
  )
}
