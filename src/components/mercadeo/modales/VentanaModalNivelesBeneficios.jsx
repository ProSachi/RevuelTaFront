import styles from './VentanaModalNivelesBeneficios.module.css'

const VentanaModalNivelesBeneficios = ({
  nivelActualId,
  puntosFaltantes,
  siguienteNivel,
  niveles = [],
  onCerrar,
}) => {
  if (!niveles.length) return null;

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
              Niveles y beneficios
            </h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
          </div>

          <div className="modal-body">
            <p className="mb-3 text-muted">
              Nivel actual: <strong>{nivelActualId ?? 'Sin nivel'}</strong>
            </p>

            {siguienteNivel && (
              <p className="mb-3">
                Te faltan <strong>{puntosFaltantes}</strong> puntos para llegar a{' '}
                <strong>{siguienteNivel.nombre ?? siguienteNivel}</strong>.
              </p>
            )}

            <ul className="list-group list-group-flush">
              {niveles.map((nivel) => (
                <li key={nivel.id ?? nivel.nombre} className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">{nivel.nombre}</span>
                    <span className={`badge rounded-pill ${styles.badge}`}>
                      {nivel.puntos ?? 'N/A'}
                    </span>
                  </div>
                  <small className="text-muted d-block mt-1">{nivel.descripcion ?? 'Beneficios del nivel'}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaModalNivelesBeneficios;
