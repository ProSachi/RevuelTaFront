
const FiltrosOfertaDestacada = ({ categorias, categoriaSeleccionada, criterioOrden, onCambiarCategoria, onCambiarOrden }) => {
    return (
    <div className="d-flex flex-wrap gap-2 mb-3">
        <select
        className="form-select form-select-sm rounded-pill px-3"
        style={{ maxWidth: '200px', borderColor: 'var(--line)', color: 'var(--ink)' }}
        value={categoriaSeleccionada}
        onChange={(e) => onCambiarCategoria(e.target.value)}
        >
        <option value="Todas">Todas las categorías</option>
        {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
        ))}
        </select>

        <select
        className="form-select form-select-sm rounded-pill px-3"
        style={{ maxWidth: '200px', borderColor: 'var(--line)', color: 'var(--ink)' }}
        value={criterioOrden}
        onChange={(e) => onCambiarOrden(e.target.value)}
        >
        <option value="default">Ordenar por</option>
        <option value="puntos-asc">Menos puntos primero</option>
        <option value="puntos-desc">Más puntos primero</option>
        </select>
    </div>
    );
};

export default FiltrosOfertaDestacada;
