export function LoadingSpinner() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      <span className="text-sm text-slate-300">Processando XML...</span>
    </div>
  );
}
