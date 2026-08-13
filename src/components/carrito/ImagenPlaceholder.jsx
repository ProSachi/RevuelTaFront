// Mientras no haya imágenes reales del backend, mostramos un bloque con la inicial
// del producto para no dejar espacios vacíos en la interfaz.
export default function ImagenPlaceholder({ nombre, size = 72 }) {
  const inicial = nombre?.trim()?.charAt(0)?.toUpperCase() || '?'
  return (
    <div
      className="img-placeholder"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {inicial}
    </div>
  )
}
