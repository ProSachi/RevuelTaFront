const ResumenPuntosActuales = ({ saldoActual }) => {
    return (
    <div
        className="d-flex justify-content-between align-items-center p-3 rounded mb-3"
        style={{ backgroundColor: 'var(--paper)' }}
    >
        <div>
        <p className="small text-muted mb-0">Saldo actual</p>
        <h3 className="fw-bold mb-0" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
            {saldoActual} puntos
        </h3>
        </div>
        <div
        className="d-flex justify-content-center align-items-center rounded-circle flex-shrink-0"
        style={{ width: '44px', height: '44px', backgroundColor: 'var(--paper-2)', color: 'var(--marigold)' }}
        >
        <i className="bi bi-star-fill"></i>
        </div>
    </div>
    );
};

export default ResumenPuntosActuales;
