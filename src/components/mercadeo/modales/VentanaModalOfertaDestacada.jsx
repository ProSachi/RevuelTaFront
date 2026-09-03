import styles from './VentanaModalOfertaDestacada.module.css'

const VentanaModalOfertaDestacada = ({ oferta, onCerrar }) => {
  if (!oferta) return null

  return (
    <div
      className={`modal d-block ${styles.overlay}`}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0">
            <h5 className={`modal-title fw-bold ${styles.title}`}>
              Oferta destacada
            </h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
          </div>
          <div className="modal-body">
            <img src={oferta.imagen} alt={oferta.nombre} className={styles.imagen} />
            <h6 className="fw-bold">{oferta.nombre}</h6>
            <p className="text-muted mb-0">{oferta.descripcionCorta}</p>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-outline-secondary" onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VentanaModalOfertaDestacada
