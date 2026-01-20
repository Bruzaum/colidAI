import type { RelatorioColisao } from "../models/RelatorioColisao"

type Props = {
  data: RelatorioColisao[]
}

export function RelatorioColisoes({ data }: Props) {
  return (
    <div className="space-y-6">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-emerald-700 p-4"
        >
          <h2 className="text-lg font-bold text-emerald-400">
            {item.marcaCliente.nome} — Classe {item.marcaCliente.classe}
          </h2>

          {item.colidencias.length === 0 ? (
            <p className="text-sm text-gray-400">
              Nenhuma colidência relevante identificada.
            </p>
          ) : (
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-emerald-300">
                  <th>Marca INPI</th>
                  <th>Classe</th>
                  <th>Risco</th>
                  <th>Fundamentação</th>
                </tr>
              </thead>
              <tbody>
                {item.colidencias.map(c => (
                  <tr key={c.marcaINPIId} className="border-t border-zinc-700">
                    <td>{c.nome}</td>
                    <td>{c.classe}</td>
                    <td className="font-bold">{c.grauRisco}</td>
                    <td>{c.fundamentacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  )
}
