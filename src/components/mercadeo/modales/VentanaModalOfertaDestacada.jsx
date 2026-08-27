import { useState } from 'react';
import { categoriasOferta, descuentosOferta } from '../../../data/ofertaDestacadaMock';
import FiltrosOfertaDestacada from './oferta/FiltrosOfertaDestacada';
import ListadoOfertasDestacadas from './oferta/ListadoOfertasDestacadas';

const ITEMS_POR_PAGINA = 6;

const VentanaModalOfertaDestacada = ({ oferta, onCerrar, onSeleccionarCanje }) => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
    const [criterioOrden, setCriterioOrden] = useState('default');
    const [paginaActual, setPaginaActual] = useState(1);

    const handleCambiarCategoria = (cat) => {
    setCategoriaSeleccionada(cat);
    setPaginaActual(1);
    };

    let items =
    categoriaSeleccionada === 'Todas'
        ? descuentosOferta
        : descuentosOferta.filter((d) => d.categoria === categoriaSeleccionada);

    if (criterioOrden === 'puntos-asc') items = [...items].sort((a, b) => a.puntos - b.puntos);
    if (criterioOrden === 'puntos-desc') items = [...items].sort((a, b) => b.puntos - a.puntos);

    const totalPaginas = Math.max(1, Math.ceil(items.length / ITEMS_POR_PAGINA));
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const itemsPagina = items.slice(inicio, inicio + ITEMS_POR_PAGINA);

    return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
            <h5 className="modal-title fw-bold" style={{ color: 'var(--ink)' }}>{oferta.nombre}</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
            </div>

            <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
            <FiltrosOfertaDestacada
                categorias={categoriasOferta}
                categoriaSeleccionada={categoriaSeleccionada}
                criterioOrden={criterioOrden}
                onCambiarCategoria={handleCambiarCategoria}
                onCambiarOrden={setCriterioOrden}
            />
            <ListadoOfertasDestacadas
                descuentos={itemsPagina}
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={setPaginaActual}
                onSeleccionarCanje={onSeleccionarCanje}
            />
            </div>

            <div className="modal-footer border-0 justify-content-center">
            <button
                type="button"
                className="btn fw-semibold px-4"
                style={{ backgroundColor: 'var(--paper-2)', color: 'var(--ink)' }}
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

export default VentanaModalOfertaDestacada;
