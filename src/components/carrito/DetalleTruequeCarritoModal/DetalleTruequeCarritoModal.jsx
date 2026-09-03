import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './DetalleTruequeCarritoModal.module.css'

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

const CLASES_ESTADO = {
  propuesto: styles.estadoPropuesto,
  aceptado: styles.estadoAceptado,
  rechazado: styles.estadoRechazado,
}

// Modal de solo lectura para consultar, desde el Carrito, el trueque asociado a un producto.
// No modifica la URL (criterio MKT-CR01).
export default function DetalleTruequeCarritoModal({ producto, detalle, onClose }) {
  if (!producto || !detalle) return null

  const estadoClase = CLASES_ESTADO[detalle.estado] || styles.estadoPropuesto

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.cerrar}
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <h2 className={styles.titulo}>Detalle Trueque</h2>
        <span className={`${styles.estadoPill} ${estadoClase}`}>
          {ETIQUETAS_ESTADO[detalle.estado] || detalle.estado}
        </span>

        <p className={styles.tipo}>{TITULOS_TIPO[detalle.tipo] || detalle.tipo}</p>

        <div className={styles.resumenIntercambio}>
          <div>
            <span className={styles.etiqueta}>Quieres esto</span>
            <p className={styles.prendaNombre}>{detalle.recibes}</p>
          </div>
          <div className={styles.iconoIntercambio} aria-hidden="true">
            ⇄
          </div>
          <div>
            <span className={styles.etiqueta}>Tú ofreces</span>
            <p className={styles.prendaNombre}>{detalle.ofreces}</p>
          </div>
        </div>

        {detalle.tipo !== 'solo_intercambio' && (
          <p className={styles.diferencia}>
            {detalle.diferencia === 0 && 'No hay diferencia económica en este trueque.'}
            {detalle.diferencia > 0 &&
              `Debes pagar una diferencia de ${formatoMoneda(detalle.diferencia)}.`}
            {detalle.diferencia < 0 &&
              `El vendedor paga una diferencia de ${formatoMoneda(Math.abs(detalle.diferencia))}.`}
          </p>
        )}

        <p className={styles.fecha}>
          Actualizado: {new Date(detalle.fecha).toLocaleString('es-CO')}
        </p>

        <div className={styles.acciones}>
          <button type="button" className={styles.btnCerrar} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
