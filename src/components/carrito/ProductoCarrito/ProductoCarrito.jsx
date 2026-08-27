import ImagenPlaceholder from '../ImagenPlaceholder/ImagenPlaceholder.jsx'
import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './ProductoCarrito.module.css'

const ETIQUETAS_TRUEQUE = {
  propuesto: 'Trueque Propuesto',
  aceptado: 'Trueque Aceptado',
  rechazado: 'Trueque Rechazado',
}

const CLASES_TRUEQUE = {
  propuesto: styles.truequePropuesto,
  aceptado: styles.truequeAceptado,
  rechazado: styles.truequeRechazado,
}

export default function ProductoCarrito({
  producto,
  onCambiarCantidad,
  onIniciarEliminar,
  onProponerTrueque,
  onVerTrueque,
  precioActual = () => producto.precio,
}) {
  const {
    id,
    nombre,
    marca,
    talla,
    color,
    vendedor,
    calificacionVendedor,
    cantidad,
    cantidadDisponible,
    trueque,
  } = producto

  const puedeRestar = cantidad > 0
  const puedeSumar = cantidad < cantidadDisponible

  const handleRestar = () => {
    if (cantidad === 1) {
      // Al presionar menos cuando cantidad llega a 0, pedir confirmación (MKT-CR01)
      onIniciarEliminar(id)
      return
    }
    onCambiarCantidad(id, -1)
  }

  const handleSumar = () => {
    if (puedeSumar) onCambiarCantidad(id, 1)
  }

  const claseTrueque = trueque ? CLASES_TRUEQUE[trueque] || '' : ''

  return (
    <article className={styles.tarjeta}>
      <ImagenPlaceholder nombre={nombre} size={72} />

      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.meta}>
          {marca} · Talla {talla} · {color}
        </p>
        <p className={styles.vendedor}>
          Vendedor: {vendedor}{' '}
          <span className={styles.rating}>★ {calificacionVendedor?.toFixed(1) ?? '5.0'}</span>
        </p>

        {trueque ? (
          <button
            type="button"
            className={`${styles.btnTrueque} ${claseTrueque}`}
            onClick={() => onVerTrueque(producto)}
          >
            {ETIQUETAS_TRUEQUE[trueque] || 'Consultar Trueque'}
          </button>
        ) : (
          <button
            type="button"
            className={styles.btnTrueque}
            onClick={() => onProponerTrueque(producto)}
          >
            Proponer Trueque
          </button>
        )}
      </div>

      <div className={styles.cantidadWrapper}>
        <button
          type="button"
          className={styles.btnCantidad}
          aria-label="Disminuir cantidad"
          onClick={handleRestar}
          disabled={!puedeRestar}
        >
          −
        </button>
        <span className={styles.cantidadNumero}>{cantidad}</span>
        <button
          type="button"
          className={styles.btnCantidad}
          aria-label="Aumentar cantidad"
          onClick={handleSumar}
          disabled={!puedeSumar}
        >
          +
        </button>
      </div>

      <div className={styles.precioWrapper}>
        {formatoMoneda(precioActual(producto) * cantidad)}
      </div>
    </article>
  )
}
