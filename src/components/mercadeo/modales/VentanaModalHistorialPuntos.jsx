import styles from './VentanaModalHistorialPuntos.module.css'

const VentanaModalHistorialPuntos = ({ historial, onCerrar }) => (
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
            Historial de puntos
          </h5>
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
        </div>
        <div className="modal-body">
          {historial.length > 0 ? (
            <div className="list-group list-group-flush">
              {historial.map((movimiento) => (
                <div key={movimiento.id} className="list-group-item px-0 d-flex align-items-center gap-3">
                  <i className={`bi ${movimiento.icono} fs-5 ${styles.itemIcon}`}></i>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-semibold">{movimiento.accion}</p>
                    <small className="text-muted">{movimiento.fecha}</small>
                  </div>
                  <span className={styles.itemPuntos}>+{movimiento.puntos}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">Aún no tienes movimientos de puntos.</p>
          )}
        </div>
        <div className="modal-footer border-0 justify-content-center">
          <button type="button" className={`btn fw-semibold px-4 ${styles.btnCerrar}`} onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default VentanaModalHistorialPuntos
