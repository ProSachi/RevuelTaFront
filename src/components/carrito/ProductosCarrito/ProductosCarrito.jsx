import { Link } from 'react-router-dom'
import ProductoCarrito from '../ProductoCarrito/ProductoCarrito.jsx'
import styles from './ProductosCarrito.module.css'

export default function ProductosCarrito({
  productos = [],
  onCambiarCantidad,
  onIniciarEliminar,
  onProponerTrueque,
  onVerTrueque,
  precioActual,
}) {
  return (
    <div className={styles.listaContenedor}>
      {productos.map((producto) => (
        <ProductoCarrito
          key={producto.id}
          producto={producto}
          onCambiarCantidad={onCambiarCantidad}
          onIniciarEliminar={onIniciarEliminar}
          onProponerTrueque={onProponerTrueque}
          onVerTrueque={onVerTrueque}
          precioActual={precioActual}
        />
      ))}

      <Link to="#" className={styles.linkSeguirComprando}>
        ← Seguir comprando
      </Link>
    </div>
  )
}
