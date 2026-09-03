import styles from './CampanasActivas.module.css';
import { campanas } from '../../../data/campanasMock';

const CampanasActivas = ({ onVerTodas }) => {
  const activas = campanas.filter((c) => c.estado === 'Activa').slice(0, 2);

  return (
    <div className={`${styles.root} card shadow-sm border-0 p-4 mb-3`}>
      <div className={`${styles.header} d-flex justify-content-between align-items-center mb-3`}>
        <h6 className={`${styles.title} fw-bold mb-0`}>Campañas activas</h6>
        <button
          type="button"
          className={`${styles.link} btn btn-sm btn-link text-decoration-none fw-semibold p-0`}
          onClick={onVerTodas}
        >
          Ver todas
        </button>
      </div>

      <div className={`${styles.list} d-flex flex-column gap-3`}>
        {activas.map((campana) => (
          <div key={campana.id} className={`${styles.item} d-flex gap-3`}>
            <div className={`${styles.thumb} d-flex justify-content-center align-items-center rounded flex-shrink-0`}>
              <i className="bi bi-image"></i>
            </div>
            <div>
              <p className={`${styles.name} fw-bold small mb-0`}>{campana.nombre}</p>
              <p className={`${styles.description} small text-muted mb-1`}>{campana.descripcion}</p>
              <p className={`${styles.vigencia} small mb-0`}>
                <i className="bi bi-calendar-event me-1"></i>
                {campana.vigencia}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampanasActivas;
