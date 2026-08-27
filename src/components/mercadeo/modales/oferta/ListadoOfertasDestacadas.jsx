import Paginacion from '../../Paginacion/Paginacion';

const formatearDescuento = (item) =>
    item.tipo === 'porcentaje' ? `${item.valor}%` : `$${item.valor.toLocaleString('es-CO')} COP`;


const ListadoOfertasDestacadas = ({ descuentos, paginaActual, totalPaginas, onCambiarPagina, onSeleccionarCanje }) => {
    return (
    <div>
        <div className="row g-3">
        {descuentos.map((item) => (
            <div key={item.id} className="col-sm-6 col-lg-4">
            <div className="card border-0 h-100 p-2" style={{ backgroundColor: 'var(--paper)' }}>
            <span
                className="badge rounded-pill mb-2 align-self-start"
                style={{ backgroundColor: 'var(--ink)', color: '#fff' }}
                >
                <i className="bi bi-flag-fill me-1"></i>{item.categoria}
                </span>
                <div
                className="d-flex justify-content-center align-items-center rounded mb-2"
                style={{ height: '90px', backgroundColor: 'var(--paper-2)', color: 'var(--line)' }}
                >
                <i className="bi bi-image fs-3"></i>
                </div>
                <p className="fw-bold small mb-1" style={{ color: 'var(--ink)' }}>Descuento: {formatearDescuento(item)}</p>
                <p className="small text-muted mb-2">{item.condicion}</p>
                <p className="small fw-semibold mb-3" style={{ color: 'var(--pine)' }}>
                <i className="bi bi-star-fill me-1" style={{ color: 'var(--marigold)' }}></i>
                {item.puntos} puntos
                </p>
                <button
                type="button"
                className="btn btn-sm w-100 fw-bold border-0"
                style={{ backgroundColor: 'var(--pine)', color: '#ffffff' }}
                onClick={() => onSeleccionarCanje(item)}
                >
                <i className="bi bi-gift me-1"></i> Canjear
                </button>
            </div>
            </div>
        ))}

        {descuentos.length === 0 && (
            <p className="text-center small py-4 mb-0" style={{ color: 'var(--ink)', opacity: 0.6 }}>
            No hay descuentos para esta categoría.
            </p>
        )}
        </div>

        <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onCambiarPagina={onCambiarPagina} />
    </div>
    );
};

export default ListadoOfertasDestacadas;
