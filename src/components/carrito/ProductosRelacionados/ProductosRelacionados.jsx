import { Link } from 'react-router-dom'
import ImagenPlaceholder from '../ImagenPlaceholder/ImagenPlaceholder.jsx'
import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './ProductosRelacionados.module.css'

export default function ProductosRelacionados({ productos = [] }) {
  if (!productos || productos.length === 0) return null

  return (
    <section className={styles.seccion} aria-labelledby="titulo-sugeridos">
      <h2 id="titulo-sugeridos" className={styles.titulo}>
        También te podría interesar
      </h2>

      <div className={styles.grid}>
        {productos.map((producto) => (
          <Link
            key={producto.id}
            to={`/producto/${producto.id}`}
            className={styles.tarjeta}
          >
            <ImagenPlaceholder nombre={producto.nombre} size={90} />
            <p className={styles.nombre}>{producto.nombre}</p>
            <p className={styles.marca}>{producto.marca}</p>
            <p className={styles.precio}>{formatoMoneda(producto.precio)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
