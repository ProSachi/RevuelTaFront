import styles from './ConfirmarEliminarModal.module.css'

export default function ConfirmarEliminarModal({ producto, onConfirmar, onCancelar }) {
  if (!producto) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.titulo}>¿Eliminar producto?</h2>
        <p className={styles.descripcion}>
          Vas a retirar <strong>{producto.nombre}</strong> de tu carrito de compras.
        </p>
        <div className={styles.acciones}>
          <button type="button" className={styles.btnCancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button type="button" className={styles.btnEliminar} onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
