const ListadoHistorialPuntos = ({ historial }) => {
    return (
    <div className="d-flex flex-column gap-2">
        {historial.map((mov) => (
        <div
            key={mov.id}
            className="d-flex justify-content-between align-items-center p-3 rounded"
            style={{ border: '1px solid var(--line)' }}
        >
            <div className="d-flex align-items-center gap-3">
            <div
                className="d-flex justify-content-center align-items-center rounded-circle flex-shrink-0"
                style={{ width: '40px', height: '40px', backgroundColor: 'var(--paper-2)', color: 'var(--pine)' }}
            >
                <i className={`bi ${mov.icono}`}></i>
            </div>
            <div>
                <p className="fw-semibold small mb-0" style={{ color: 'var(--ink)' }}>{mov.accion}</p>
                <p className="small text-muted mb-0">{mov.fecha}</p>
            </div>
            </div>
            <span className="fw-bold small text-nowrap" style={{ color: 'var(--moss)' }}>
            +{mov.puntos} pts
            </span>
        </div>
        ))}

        {historial.length === 0 && (
        <p className="text-center small py-4 mb-0" style={{ color: 'var(--ink)', opacity: 0.6 }}>
            Aún no tienes movimientos de puntos.
        </p>
        )}
    </div>
    );
};

export default ListadoHistorialPuntos;
