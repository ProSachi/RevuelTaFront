import styles from './ImagenPlaceholder.module.css'

export default function ImagenPlaceholder({ nombre = '', size = 72 }) {
  const inicial = (nombre.trim()[0] ?? 'P').toUpperCase()
  return (
    <div
      className={styles.placeholder}
      style={{ width: size, height: size }}
      aria-label={`Imagen de ${nombre}`}
    >
      {inicial}
    </div>
  )
}
