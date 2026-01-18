type FileInputProps = {
  label: string;
  onFileLoad: (content: string) => void;
};

export function FileInput({ label, onFileLoad }: FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onFileLoad(reader.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-200">{label}</label>

      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        className="text-slate-200 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-semibold file:text-slate-900 hover:file:bg-emerald-400"
      />
    </div>
  );
}
