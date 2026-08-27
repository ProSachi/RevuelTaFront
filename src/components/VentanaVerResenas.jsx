import { obtenerVendedoresPedido } from '../data/vendedores'
import { obtenerResenasPedido } from '../data/resenas'
import './VentanaVerResenas.css'

const VentanaVerResenas = ({ pedidoId, onCerrar }) => {
  const vendedores = obtenerVendedoresPedido(pedidoId)
  const resenas = obtenerResenasPedido(pedidoId)

  const nombreVendedor = (vendedorId) =>
    vendedores.find((vendedor) => vendedor.id === vendedorId)?.nombre ?? 'Vendedor'

  return (
    <div className="vvr-backdrop">
      <div className="vvr-modal">
        <div className="vvr-header">
          <h2 className="vvr-title">Tus reseñas</h2>
          <button
            type="button"
            onClick={onCerrar}
            className="vvr-close-btn"
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
          <p className="vvr-empty-text">Todavía no hay reseñas registradas para este pedido.</p>
        ) : (
          <div className="vvr-list">
            {resenas.map((resena) => (
              <div key={resena.id} className="vvr-card">
                <p className="vvr-vendor-name">{nombreVendedor(resena.vendedorId)}</p>

                <div className="vvr-stars-row">
                  {[1, 2, 3, 4, 5].map((valor) => (
                    <span
                      key={valor}
                      className={valor <= resena.calificacion ? 'vvr-star-active' : 'vvr-star-inactive'}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {resena.comentario && (
                  <p className="vvr-comment">{resena.comentario}</p>
                )}

                {resena.fotos?.length > 0 && (
                  <p className="vvr-photos-count">
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