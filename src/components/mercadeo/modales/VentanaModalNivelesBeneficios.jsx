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
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(21, 32, 27, 0.45)', backdropFilter: 'blur(2px)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '560px' }}>
        <div
          className="modal-content border-0 shadow"
          style={{
            borderRadius: '24px',
            border: '1px solid var(--color-line)',
            backgroundColor: 'rgba(255,255,255,0.97)',
            overflow: 'hidden',
          }}
        >
          <div
            className="modal-header border-0"
            style={{ backgroundColor: 'rgba(246, 242, 233, 0.8)', padding: '1.25rem 1.5rem 1rem' }}
          >
            <h5 className="modal-title fw-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
              Niveles y beneficios
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCerrar}
              style={{ filter: 'grayscale(100%) brightness(0.5)', opacity: 1 }}
            />
          </div>

          <div className="modal-body" style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
            <p className="mb-3" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Nivel actual: <strong>{nivelActualId ?? 'Sin nivel'}</strong>
            </p>

            {siguienteNivel && (
              <p className="mb-3" style={{ color: 'rgba(21,32,27,0.75)' }}>
                Te faltan <strong>{puntosFaltantes}</strong> puntos para llegar a{' '}
                <strong>{siguienteNivel.nombre ?? siguienteNivel}</strong>.
              </p>
            )}

            <ul className="list-group list-group-flush">
              {niveles.map((nivel) => (
                <li key={nivel.id ?? nivel.nombre} className="list-group-item px-0" style={{ background: 'transparent', padding: '0.9rem 0' }}>
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <span className="fw-semibold" style={{ color: 'var(--ink)' }}>{nivel.nombre}</span>
                    <span className="badge rounded-pill" style={{ backgroundColor: 'var(--pine)', color: '#fff', fontWeight: 700 }}>
                      {nivel.puntos ?? 'N/A'}
                    </span>
                  </div>
                  <small className="d-block mt-1" style={{ color: 'rgba(21,32,27,0.7)' }}>
                    {nivel.descripcion ?? 'Beneficios del nivel'}
                  </small>
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
