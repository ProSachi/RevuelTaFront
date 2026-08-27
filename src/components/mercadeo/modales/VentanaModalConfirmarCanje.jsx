const VentanaModalConfirmarCanje = ({ oferta, saldoActual, onCerrar, onCanjeExitoso }) => {
  if (!oferta) return null;

  const costo = Number(oferta.puntos ?? 0);
  const puedeCanjear = saldoActual >= costo;

  const confirmar = () => {
    if (!puedeCanjear) return;
    onCanjeExitoso?.(costo);
    onCerrar?.();
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(21, 32, 27, 0.45)', backdropFilter: 'blur(2px)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
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
              Confirmar canje
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCerrar}
              style={{ filter: 'grayscale(100%) brightness(0.5)', opacity: 1 }}
            />
          </div>

          <div className="modal-body" style={{ padding: '1.25rem 1.5rem 1.25rem' }}>
            <p className="mb-2" style={{ color: 'var(--ink)', fontSize: '1rem' }}>
              Estás a punto de canjear <strong>{oferta.nombre ?? 'esta oferta'}</strong>.
            </p>
            <p className="mb-3" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Costo: <strong>{costo} puntos</strong>
            </p>

            {puedeCanjear ? (
              <p className="mb-0 fw-semibold" style={{ color: 'var(--color-pine)' }}>
                Tienes saldo suficiente para continuar.
              </p>
            ) : (
              <p className="mb-0 fw-semibold" style={{ color: '#b42318' }}>
                No tienes puntos suficientes para este canje.
              </p>
            )}
          </div>

          <div className="modal-footer border-0" style={{ padding: '0 1.5rem 1.5rem', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn"
              onClick={onCerrar}
              style={{
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--ink)',
                border: '1px solid var(--color-line)',
                borderRadius: '12px',
                minWidth: '120px',
                fontWeight: 600,
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn fw-bold"
              style={{
                backgroundColor: 'var(--pine)',
                color: '#fff',
                borderRadius: '12px',
                minWidth: '140px',
                boxShadow: '0 8px 18px rgba(31, 94, 74, 0.18)',
              }}
              onClick={confirmar}
              disabled={!puedeCanjear}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaModalConfirmarCanje;
