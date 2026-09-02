import styles from './Aviso.module.css'

export default function Aviso({ mensaje, onCerrar }) {
  if (!mensaje) return null

  return (
    <div className={styles.aviso} role="status">
      <span>{mensaje}</span>
      <button
        type="button"
        className={styles.cerrar}
        onClick={onCerrar}
        aria-label="Cerrar aviso"
      >
        ✕
      </button>
    </div>
  )
}
