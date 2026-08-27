import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ListadoOfertasDestacadas({
  descuentos,
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  onCanjear,
}) {
  const formatearDescuento = (descuento) => {
    if (descuento.tipoDescuento === "porcentaje") {
      return `${descuento.descuento}%`;
    }

    return `$${descuento.descuento.toLocaleString(
      "es-CO"
    )}`;
  };

  return (
    <div className="listado-ofertas">
      <div className="grid-descuentos">
        {descuentos.map((descuento) => (
          <article
            className="tarjeta-descuento"
            key={descuento.id}
          >
            <img
              src={descuento.imagen}
              alt={descuento.nombre}
              className="imagen-descuento"
            />

            <div className="contenido-tarjeta">
              <span className="categoria">
                {descuento.categoria}
              </span>

              <h3>{descuento.nombre}</h3>

              <div className="valor-descuento">
                {formatearDescuento(descuento)}
              </div>

              <div className="precio">
                $
                {descuento.precio.toLocaleString(
                  "es-CO"
                )}
              </div>

              <p className="condicion">
                {descuento.condicion}
              </p>

              <div className="puntos">
                <span>
                  Puntos requeridos
                </span>

                <strong>
                  {descuento.puntos.toLocaleString(
                    "es-CO"
                  )}{" "}
                  pts
                </strong>
              </div>

              <button
                className="btn-canjear"
                onClick={() =>
                  onCanjear(descuento)
                }
              >
                Canjear
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="paginacion">
        <button
          onClick={() =>
            onCambiarPagina(
              paginaActual - 1
            )
          }
          disabled={paginaActual === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from(
          { length: totalPaginas },
          (_, index) => index + 1
        ).map((pagina) => (
          <button
            key={pagina}
            className={
              pagina === paginaActual
                ? "pagina-activa"
                : ""
            }
            onClick={() =>
              onCambiarPagina(pagina)
            }
          >
            {pagina}
          </button>
        ))}

        <button
          onClick={() =>
            onCambiarPagina(
              paginaActual + 1
            )
          }
          disabled={
            paginaActual === totalPaginas
          }
          aria-label="Página siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default ListadoOfertasDestacadas;