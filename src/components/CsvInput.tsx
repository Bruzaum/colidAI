type CsvInputProps = {
  onLoad: (content: string) => void
}

export function CsvInput({ onLoad }: CsvInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onLoad(reader.result as string)
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-200">
        Arquivo CSV
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="text-slate-200 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-semibold file:text-slate-900 hover:file:bg-emerald-400"
      />
    </div>
  )
}
