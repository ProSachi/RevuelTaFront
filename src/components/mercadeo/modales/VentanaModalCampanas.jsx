import { useState } from 'react';
import { campanas } from '../../../data/campanasMock';
import SelectorEstadoCampanas from './campanas/SelectorEstadoCampanas';
import ListadoCampanas from './campanas/ListadoCampanas';
import styles from './VentanaModalCampanas.module.css';

const ITEMS_POR_PAGINA = 4;

const VentanaModalCampanas = ({ onCerrar }) => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activas');
  const [paginaActual, setPaginaActual] = useState(1);

  const handleCambiarEstado = (nuevoEstado) => {
    setEstadoSeleccionado(nuevoEstado);
    setPaginaActual(1);
  };

  const estadoFiltro = estadoSeleccionado === 'Activas' ? 'Activa' : 'Finalizada';
  const campanasFiltradas = campanas.filter((c) => c.estado === estadoFiltro);

  const totalPaginas = Math.max(1, Math.ceil(campanasFiltradas.length / ITEMS_POR_PAGINA));
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const campanasPagina = campanasFiltradas.slice(inicio, inicio + ITEMS_POR_PAGINA);

  return (
    <div
      className={`modal d-block ${styles.overlay}`}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0">
            <h5 className={`modal-title fw-bold ${styles.title}`}>
              Campañas
            </h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
          </div>

          <div className={`modal-body ${styles.body}`}>
            <SelectorEstadoCampanas
              estadoSeleccionado={estadoSeleccionado}
              onCambiarEstado={handleCambiarEstado}
            />

            <ListadoCampanas
              campanas={campanasPagina}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          </div>

          <div className="modal-footer border-0 justify-content-center">
            <button
              type="button"
              className={`btn fw-semibold px-4 ${styles.btnCerrar}`}
              onClick={onCerrar}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentanaModalCampanas;
