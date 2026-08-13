import ImagenPlaceholder from './ImagenPlaceholder.jsx'
import { formatoMoneda } from './formatoMoneda.js'

const ETIQUETAS_TRUEQUE = {
  propuesto: 'Trueque Propuesto',
  aceptado: 'Trueque Aceptado',
  rechazado: 'Trueque Rechazado',
}

export default function ProductoCarritoCard({
  producto,
  onCambiarCantidad,
  onIniciarEliminar,
  onProponerTrueque,
  onVerTrueque,
  precioActual = () => producto.precio,
}) {
  const { id, nombre, marca, talla, color, vendedor, calificacionVendedor, precio, cantidad, cantidadDisponible, trueque } = producto

  const puedeRestar = cantidad > 0
  const puedeSumar = cantidad < cantidadDisponible

  const handleRestar = () => {
    if (cantidad === 1) {
      // Al llegar a 0 se pide confirmación antes de retirar el producto (criterio MKT-CR01).
      onIniciarEliminar(id)
      return
    }
    onCambiarCantidad(id, -1)
  }

  const handleSumar = () => {
    if (puedeSumar) onCambiarCantidad(id, 1)
  }

  return (
    <article className="carrito-item">
      <ImagenPlaceholder nombre={nombre} />

      <div className="carrito-item__info">
        <h3 className="carrito-item__nombre">{nombre}</h3>
        <p className="carrito-item__meta">
          {marca} · Talla {talla} · {color}
        </p>
        <p className="carrito-item__vendedor">
          Vendedor: {vendedor} <span className="rating">★ {calificacionVendedor.toFixed(1)}</span>
        </p>

        {trueque ? (
          <button
            type="button"
            className={`btn-trueque estado-${trueque}`}
            onClick={() => onVerTrueque(producto)}
          >
            {ETIQUETAS_TRUEQUE[trueque]}
          </button>
        ) : (
          <button type="button" className="btn-trueque" onClick={() => onProponerTrueque(producto)}>
            Proponer Trueque
          </button>
        )}
      </div>

      <div className="carrito-item__cantidad">
        <button
          type="button"
          aria-label="Disminuir cantidad"
          onClick={handleRestar}
          disabled={!puedeRestar}
        >
          −
        </button>
        <span>{cantidad}</span>
        <button
          type="button"
          aria-label="Aumentar cantidad"
          onClick={handleSumar}
          disabled={!puedeSumar}
        >
          +
        </button>
      </div>

      <div className="carrito-item__precio">{formatoMoneda(precioActual(producto) * cantidad)}</div>
    </article>
  )
}
