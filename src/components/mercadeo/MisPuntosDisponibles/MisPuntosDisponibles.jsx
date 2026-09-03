import styles from './MisPuntosDisponibles.module.css';

const MisPuntosDisponibles = ({ puntosDisponibles, onVerHistorial }) => {
  return (
    <div className={`${styles.root} card shadow-sm border-0 p-4 h-100`}>
      <div className={`${styles.header} d-flex justify-content-between align-items-start mb-2`}>
        <h6 className={`${styles.title} fw-bold mb-0`}>
          Mis puntos disponibles
        </h6>
        <div className={`${styles.iconWrap} d-flex justify-content-center align-items-center rounded-circle flex-shrink-0`}>
          <i className="bi bi-star-fill"></i>
        </div>
      </div>

      <h1 className={`${styles.value} fw-bold mb-3`}>
        {puntosDisponibles}
      </h1>

      <button
        type="button"
        className={`${styles.button} btn btn-sm fw-semibold border-0 align-self-start`}
        onClick={onVerHistorial}
      >
        Historial de puntos
      </button>
    </div>
  );
};

export default MisPuntosDisponibles;
