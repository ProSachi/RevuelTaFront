import { useState } from 'react';
import { campanas } from '../../../data/campanasMock';
import SelectorEstadoCampanas from './campanas/SelectorEstadoCampanas';
import ListadoCampanas from './campanas/ListadoCampanas';

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
      className="modal d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(21, 32, 27, 0.45)',
        backdropFilter: 'blur(2px)',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: '760px' }}>
        <div
          className="modal-content border-0 shadow"
          style={{
            borderRadius: '24px',
            border: '1px solid var(--color-line)',
            backgroundColor: 'rgba(255,255,255,0.96)',
            overflow: 'hidden',
          }}
        >
          <div
            className="modal-header border-0"
            style={{
              backgroundColor: 'rgba(246, 242, 233, 0.8)',
              padding: '1.25rem 1.5rem 1rem',
            }}
          >
            <h5 className="modal-title fw-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
              Campañas
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCerrar}
              style={{
                filter: 'grayscale(100%) brightness(0.5)',
                opacity: 1,
              }}
            />
          </div>

          <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto', padding: '1.25rem 1.5rem 1.5rem' }}>
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

          <div className="modal-footer border-0 justify-content-center" style={{ padding: '0 1.5rem 1.5rem' }}>
            <button
              type="button"
              className="btn fw-semibold px-4"
              style={{
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--ink)',
                borderRadius: '12px',
                border: '1px solid var(--color-line)',
                minWidth: '120px',
              }}
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
