import { obtenerVendedoresPedido } from '../data/vendedores'
import { obtenerResenasPedido } from '../data/resenas'

const VentanaVerResenas = ({ pedidoId, onCerrar }) => {
  const vendedores = obtenerVendedoresPedido(pedidoId)
  const resenas = obtenerResenasPedido(pedidoId)

  const nombreVendedor = (vendedorId) =>
    vendedores.find((vendedor) => vendedor.id === vendedorId)?.nombre ?? 'Vendedor'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Tus reseñas</h2>
          <button
            type="button"
            onClick={onCerrar}
            className="text-ink/50 transition hover:text-clay"
            aria-label="Cerrar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {resenas.length === 0 ? (
          <p className="text-sm text-ink/60">Todavía no hay reseñas registradas para este pedido.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {resenas.map((resena) => (
              <div key={resena.id} className="rounded-lg border border-line bg-paper-2 p-4">
                <p className="font-display text-base text-ink">{nombreVendedor(resena.vendedorId)}</p>

                <div className="mt-1 flex gap-0.5 text-lg leading-none">
                  {[1, 2, 3, 4, 5].map((valor) => (
                    <span key={valor} className={valor <= resena.calificacion ? 'text-marigold' : 'text-line'}>
                      ★
                    </span>
                  ))}
                </div>

                {resena.comentario && (
                  <p className="mt-2 text-sm text-ink/70">{resena.comentario}</p>
                )}

                {resena.fotos?.length > 0 && (
                  <p className="mt-2 font-mono text-xs text-ink/40">
                    {resena.fotos.length} foto{resena.fotos.length > 1 ? 's' : ''} adjunta
                    {resena.fotos.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VentanaVerResenas
