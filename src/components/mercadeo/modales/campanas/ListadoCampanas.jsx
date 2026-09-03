import Paginacion from '../../Paginacion/Paginacion';
import styles from './ListadoCampanas.module.css';

/**
 * MER-DC04 · Componente 3: ListadoCampanas
 * Muestra las tarjetas de campañas del estado seleccionado y su paginación.
 * Seleccionar una tarjeta no ejecuta navegación: es contenido informativo.
 */
const ListadoCampanas = ({ campanas, paginaActual, totalPaginas, onCambiarPagina }) => {
  const esActiva = (campana) => campana.estado === 'Activa';

  return (
    <div>
      <div className="d-flex flex-column gap-3">
        {campanas.map((campana) => (
          <div
            key={campana.id}
            className={`d-flex gap-3 p-3 rounded ${styles.card}`}
          >
            <div
              className={`d-flex justify-content-center align-items-center rounded flex-shrink-0 ${styles.thumb}`}
              style={{
                backgroundImage: campana.imagen ? `url(${campana.imagen})` : 'none',
              }}
            >
              {!campana.imagen && <i className="bi bi-image fs-4"></i>}
            </div>

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <p className={`fw-bold mb-1 ${styles.name}`}>{campana.nombre}</p>
                <span
                  className={`badge rounded-pill fw-semibold flex-shrink-0 ${esActiva(campana) ? styles.badgeActiva : styles.badgeFinalizada}`}
                >
                  {esActiva(campana) ? 'Activa' : 'Finalizada'}
                </span>
              </div>
              <p className={`small mb-1 ${styles.description}`}>{campana.descripcion}</p>
              <p className={`small mb-0 ${styles.vigencia}`}>
                <i className="bi bi-calendar-event me-1"></i>
                {campana.vigencia}
              </p>
            </div>
          </div>
        ))}

        {campanas.length === 0 && (
          <p className={`text-center small py-4 mb-0 ${styles.empty}`}>
            No hay campañas para mostrar en este estado.
          </p>
        )}
      </div>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambiarPagina={onCambiarPagina}
      />
    </div>
  );
};

export default ListadoCampanas;
