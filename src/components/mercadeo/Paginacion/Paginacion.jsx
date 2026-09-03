
const Paginacion = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
  if (totalPaginas < 1) return null;

  const paginas = [];
  const ventana = 1;

  for (let i = 1; i <= totalPaginas; i++) {
    const esBorde = i === 1 || i === totalPaginas;
    const esCercana = Math.abs(i - paginaActual) <= ventana;
    if (esBorde || esCercana) {
      paginas.push(i);
    } else if (paginas[paginas.length - 1] !== '...') {
      paginas.push('...');
    }
  }

  const irA = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) onCambiarPagina(pagina);
  };

  return (
    <nav className="d-flex justify-content-center mt-3">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => irA(paginaActual - 1)} aria-label="Anterior">
            &lsaquo;
          </button>
        </li>
        {paginas.map((p, idx) =>
          p === '...' ? (
            <li key={`ellipsis-${idx}`} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li key={p} className={`page-item ${p === paginaActual ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => irA(p)}
                style={p === paginaActual ? { backgroundColor: 'var(--pine)', borderColor: 'var(--pine)' } : {}}
              >
                {p}
              </button>
            </li>
          )
        )}
        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => irA(paginaActual + 1)} aria-label="Siguiente">
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacion;
