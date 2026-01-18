type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-200">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none"
      />
    </div>
  );
}
