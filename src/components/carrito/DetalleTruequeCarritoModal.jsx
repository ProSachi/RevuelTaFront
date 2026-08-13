import { formatoMoneda } from './formatoMoneda.js'

const TITULOS_TIPO = {
  intercambio_y_diferencia: 'Intercambio de prenda y pagar diferencia',
  solo_intercambio: 'Solo intercambio de prenda',
  pago: 'Propuesta de pago',
}

const ETIQUETAS_ESTADO = {
  propuesto: 'Propuesto',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
}

// Modal de solo lectura para consultar, desde el Carrito, el trueque asociado a un
// producto. No modifica la URL. No permite responder la propuesta: eso corresponde
// a la HU de Mis Trueques (MKT-TR02).
export default function DetalleTruequeCarritoModal({ producto, detalle, onClose }) {
  if (!producto || !detalle) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <button type="button" className="modal__cerrar" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <h2>Detalle Trueque</h2>
        <span className={`estado-pill estado-${detalle.estado}`}>{ETIQUETAS_ESTADO[detalle.estado]}</span>

        <p className="detalle-trueque__tipo">{TITULOS_TIPO[detalle.tipo]}</p>

        <div className="detalle-trueque__resumen">
          <div>
            <span className="etiqueta">Quieres esto</span>
            <p>{detalle.recibes}</p>
          </div>
          <div className="icono-intercambio" aria-hidden="true">⇄</div>
          <div>
            <span className="etiqueta">Tú ofreces</span>
            <p>{detalle.ofreces}</p>
          </div>
        </div>

        {detalle.tipo !== 'solo_intercambio' && (
          <p className="detalle-trueque__diferencia">
            {detalle.diferencia === 0 && 'No hay diferencia económica en este trueque.'}
            {detalle.diferencia > 0 && `Debes pagar una diferencia de ${formatoMoneda(detalle.diferencia)}.`}
            {detalle.diferencia < 0 && `El vendedor paga una diferencia de ${formatoMoneda(Math.abs(detalle.diferencia))}.`}
          </p>
        )}

        <p className="detalle-trueque__fecha">
          Actualizado: {new Date(detalle.fecha).toLocaleString('es-CO')}
        </p>
      </div>
    </div>
  )
}
