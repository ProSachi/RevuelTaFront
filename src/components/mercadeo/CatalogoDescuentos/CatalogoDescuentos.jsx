import { useState } from 'react';
import { catalogoDescuentos, categoriasDescuentos } from '../../../data/descuentosMock';
import Paginacion from '../Paginacion/Paginacion';
import styles from './CatalogoDescuentos.module.css';

const ITEMS_POR_PAGINA = 6;

const formatearDescuento = (item) =>
  item.tipo === 'porcentaje'
    ? `Descuento: ${item.valor}%`
    : `Descuento: $${item.valor.toLocaleString('es-CO')} COP`;

const CatalogoDescuentos = ({ onSeleccionarCanje }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);

  const descuentosFiltrados =
    categoriaSeleccionada === 'Todos'
      ? catalogoDescuentos
      : catalogoDescuentos.filter((d) => d.categoria === categoriaSeleccionada);

  const totalPaginas = Math.max(1, Math.ceil(descuentosFiltrados.length / ITEMS_POR_PAGINA));
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const descuentosPagina = descuentosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  const cambiarCategoria = (nombre) => {
    setCategoriaSeleccionada(nombre);
    setPaginaActual(1);
  };

  return (
    <div className={`${styles.root} card shadow-sm border-0 p-4`}>
      <h5 className={`${styles.title} fw-bold mb-3`}>Catálogo de descuentos</h5>

      <div className={`${styles.categoryBar} d-flex gap-2 mb-3 flex-nowrap overflow-auto pb-1`}>
        <button
          type="button"
          className={`btn btn-sm rounded-pill px-3 flex-shrink-0 fw-semibold ${categoriaSeleccionada === 'Todos' ? '' : 'btn-outline-secondary'}`}
          style={categoriaSeleccionada === 'Todos' ? { backgroundColor: 'var(--ink)', color: '#fff' } : {}}
          onClick={() => cambiarCategoria('Todos')}
        >
          Todos
        </button>
        {categoriasDescuentos.map((cat) => (
          <button
            type="button"
            key={cat.id}
            className={`btn btn-sm rounded-pill px-3 flex-shrink-0 fw-semibold ${categoriaSeleccionada === cat.nombre ? '' : 'btn-outline-secondary'}`}
            style={categoriaSeleccionada === cat.nombre ? { backgroundColor: 'var(--ink)', color: '#fff' } : {}}
            onClick={() => cambiarCategoria(cat.nombre)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div className="row g-3">
        {descuentosPagina.map((item) => (
          <div key={item.id} className="col-sm-6 col-lg-4">
            <div
              className={`${styles.card} card border-0 h-100`}
              role="button"
              tabIndex={0}
              onClick={() => onSeleccionarCanje?.(item)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSeleccionarCanje?.(item)}
            >
              <div className="p-2">
                <span className={`${styles.tag} badge rounded-pill mb-2`}>
                  <i className="bi bi-flag-fill me-1"></i>{item.categoria}
                </span>
                <div className={`${styles.thumb} d-flex justify-content-center align-items-center rounded mb-2`}>
                  <i className="bi bi-image fs-3"></i>
                </div>
                <p className={`${styles.itemTitle} fw-bold small mb-1`}>{formatearDescuento(item)}</p>
                <p className={`${styles.itemText} small text-muted mb-2`}>{item.condicion}</p>
                <p className={`${styles.points} small fw-semibold mb-3`}>
                  <i className={`bi bi-star-fill me-1 ${styles.iconPuntos}`}></i>
                  {item.puntos} puntos
                </p>
                <button
                  type="button"
                  className={`${styles.confirmButton} btn btn-sm w-100 fw-bold border-0`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSeleccionarCanje?.(item);
                  }}
                >
                  <i className="bi bi-gift me-1"></i> Canjear
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPaginaActual}
      />
    </div>
  );
};

export default CatalogoDescuentos;
