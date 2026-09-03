/**
 * MER-DC04 · Componente 2: SelectorEstadoCampanas
 * Alterna entre campañas activas y finalizadas, actualizando el listado
 * mostrado en la modal. No decide el filtrado; solo informa el cambio.
 */
import styles from './SelectorEstadoCampanas.module.css';

const SelectorEstadoCampanas = ({ estadoSeleccionado, onCambiarEstado }) => {
  const opciones = ['Activas', 'Finalizadas'];

  return (
    <div className={`d-flex gap-4 border-bottom mb-3 ${styles.bar}`}>
      {opciones.map((opcion) => {
        const activo = opcion === estadoSeleccionado;
        return (
          <button
            key={opcion}
            type="button"
            onClick={() => onCambiarEstado(opcion)}
            className={`btn btn-link text-decoration-none fw-semibold px-0 pb-2 ${styles.tab} ${activo ? styles.tabActivo : ''}`}
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );
};

export default SelectorEstadoCampanas;
