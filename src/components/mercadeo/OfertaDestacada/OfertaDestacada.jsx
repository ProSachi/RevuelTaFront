import styles from './OfertaDestacada.module.css';

const OfertaDestacada = ({ oferta, onVerOfertas }) => {
return (
    <div className={`${styles.root} card shadow-sm border-0 overflow-hidden mb-3`}>
    <div className="row g-0">
        <div
        className={`${styles.imagePanel} col-4 col-md-3 d-flex justify-content-center align-items-center`}
        style={oferta.imagen ? { backgroundImage: `url(${oferta.imagen})` } : undefined}
        >
        {!oferta.imagen && <i className={`bi bi-image fs-2 ${styles.placeholderIcon}`}></i>}
        </div>

        <div className={`${styles.content} col-8 col-md-9 p-3 d-flex flex-column justify-content-center position-relative`}>
        <span className={`${styles.badge} badge rounded-pill position-absolute top-0 end-0 m-3 fw-bold`}>
            Hasta {oferta.descuentoTexto} OFF
        </span>

        <p className={`${styles.eyebrow} small text-muted mb-1`}>Oferta destacada</p>
        <h6 className={`${styles.title} fw-bold mb-1`}>{oferta.nombre}</h6>
        <p className={`${styles.description} small text-muted mb-3`}>{oferta.descripcionCorta}</p>

        <button
            type="button"
            className={`${styles.button} btn btn-sm fw-bold border-0 align-self-start px-3`}
            onClick={onVerOfertas}
        >
            Ver ofertas
        </button>
        </div>
    </div>
    </div>
);
};

export default OfertaDestacada;
