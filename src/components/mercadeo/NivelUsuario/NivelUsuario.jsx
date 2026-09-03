import styles from './NivelUsuario.module.css';

const NivelUsuario = ({ nivelActual, siguienteNivel, puntosFaltantes, progresoPorcentaje, onVerNiveles }) => {
return (
    <div className={`${styles.root} card shadow-sm border-0 p-4 mb-3`}>
    <div className={`${styles.header} d-flex justify-content-between align-items-start`}>
        <div className="d-flex align-items-center gap-3">
        <div className={`${styles.iconWrap} d-flex justify-content-center align-items-center rounded-circle flex-shrink-0`}>
            <i className="bi bi-award-fill"></i>
        </div>
        <div>
            <p className="small text-muted mb-0">Tu nivel</p>
            <h5 className={`${styles.levelTitle} fw-bold mb-0`}>{nivelActual}</h5>
            <p className="small text-muted mb-0">Siguiente nivel: {siguienteNivel}</p>
        </div>
        </div>

        <button
        type="button"
        className={`${styles.button} btn btn-sm fw-semibold border-0 text-nowrap`}
        onClick={() => onVerNiveles?.()}
        >
        Ver niveles y beneficios
        </button>
    </div>

    <div className={`progress mt-3 ${styles.progressTrack}`}>
        <div
        className={`progress-bar ${styles.progressBar}`}
        role="progressbar"
        style={{ width: `${progresoPorcentaje}%` }}
        aria-valuenow={progresoPorcentaje}
        aria-valuemin="0"
        aria-valuemax="100"
        />
    </div>
    <p className={`${styles.helper} small text-muted mt-2 mb-0`}>
        Te faltan <strong>{puntosFaltantes} pts</strong> para subir de nivel
    </p>
    </div>
);
};

export default NivelUsuario;
