import ImagenPlaceholder from './ImagenPlaceholder.jsx'
import { formatoMoneda } from './formatoMoneda.js'

// Al seleccionarse debe redirigir al detalle del producto (cambia la URL).
// La página de detalle la implementa el equipo de Catálogo (CAT-PD01);
// aquí solo dejamos el enlace apuntando a su ruta.
export default function ProductoSugeridoCard({ producto }) {
  return (
    <a className="sugerido-card" href={`/producto/${producto.id}`}>
      <ImagenPlaceholder nombre={producto.nombre} size={96} />
      <p className="sugerido-card__nombre">{producto.nombre}</p>
      <p className="sugerido-card__marca">{producto.marca}</p>
      <p className="sugerido-card__precio">{formatoMoneda(producto.precio)}</p>
    </a>
  )
}
