type JsonResponseProps = {
  data: unknown;
};

export function JsonResponse({ data }: JsonResponseProps) {
  if (!data) return null;

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-lg font-semibold text-emerald-400">
        Resultado (JSON)
      </h2>

      <pre className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
