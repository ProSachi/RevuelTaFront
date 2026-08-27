import { SlidersHorizontal } from "lucide-react";

function FiltrosOfertaDestacada({
  categoriaSeleccionada,
  criterioOrden,
  categorias,
  onCambiarCategoria,
  onCambiarOrden,
}) {
  return (
    <div className="filtros-oferta">
      <div className="filtro">
        <label htmlFor="categoria">
          Categoría
        </label>

        <select
          id="categoria"
          value={categoriaSeleccionada}
          onChange={(e) =>
            onCambiarCategoria(e.target.value)
          }
        >
          <option value="todas">
            Todas las categorías
          </option>

          {categorias.map((categoria) => (
            <option
              key={categoria}
              value={categoria}
            >
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro">
        <label htmlFor="orden">
          <SlidersHorizontal size={16} />

          Ordenar por
        </label>

        <select
          id="orden"
          value={criterioOrden}
          onChange={(e) =>
            onCambiarOrden(e.target.value)
          }
        >
          <option value="default">
            Recomendados
          </option>

          <option value="alfabetico">
            Alfabéticamente
          </option>

          <option value="menorPrecio">
            Menor precio
          </option>

          <option value="mayorPrecio">
            Mayor precio
          </option>
        </select>
      </div>
    </div>
  );
}

export default FiltrosOfertaDestacada;