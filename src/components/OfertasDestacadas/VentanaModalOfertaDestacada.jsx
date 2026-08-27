import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { X } from "lucide-react";

import FiltrosOfertaDestacada from "./FiltrosOfertaDestacada";

import ListadoOfertasDestacadas from "./ListadoOfertasDestacadas";

function VentanaModalOfertaDestacada({
  oferta,
  onCerrar,
  onCanjear,
}) {
  const [
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  ] = useState("todas");

  const [
    criterioOrden,
    setCriterioOrden,
  ] = useState("default");

  const [
    paginaActual,
    setPaginaActual,
  ] = useState(1);

  const descuentosPorPagina = 4;

  const categorias = useMemo(() => {
    const categoriasUnicas = [
      ...new Set(
        oferta.descuentos.map(
          (descuento) =>
            descuento.categoria
        )
      ),
    ];

    return categoriasUnicas.sort();
  }, [oferta]);

  const descuentosFiltrados = useMemo(() => {
    let resultado = [
      ...oferta.descuentos,
    ];

    if (
      categoriaSeleccionada !==
      "todas"
    ) {
      resultado =
        resultado.filter(
          (descuento) =>
            descuento.categoria ===
            categoriaSeleccionada
        );
    }

    switch (criterioOrden) {
      case "alfabetico":
        resultado.sort((a, b) =>
          a.nombre.localeCompare(
            b.nombre
          )
        );
        break;

      case "menorPrecio":
        resultado.sort(
          (a, b) =>
            a.precio - b.precio
        );
        break;

      case "mayorPrecio":
        resultado.sort(
          (a, b) =>
            b.precio - a.precio
        );
        break;

      default:
        break;
    }

    return resultado;
  }, [
    oferta,
    categoriaSeleccionada,
    criterioOrden,
  ]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(
      descuentosFiltrados.length /
        descuentosPorPagina
    )
  );

  const descuentosPaginados =
    descuentosFiltrados.slice(
      (paginaActual - 1) *
        descuentosPorPagina,

      paginaActual *
        descuentosPorPagina
    );

  useEffect(() => {
    setPaginaActual(1);
  }, [
    categoriaSeleccionada,
    criterioOrden,
  ]);

  useEffect(() => {
    if (
      paginaActual >
      totalPaginas
    ) {
      setPaginaActual(
        totalPaginas
      );
    }
  }, [
    paginaActual,
    totalPaginas,
  ]);

  const cambiarCategoria = (
    categoria
  ) => {
    setCategoriaSeleccionada(
      categoria
    );
  };

  const cambiarOrden = (
    orden
  ) => {
    setCriterioOrden(orden);
  };

  const cambiarPagina = (
    pagina
  ) => {
    if (
      pagina >= 1 &&
      pagina <= totalPaginas
    ) {
      setPaginaActual(pagina);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-oferta">
        <div className="modal-header">
          <div>
            <span className="modal-subtitulo">
              Oferta destacada
            </span>

            <h2>
              {oferta.nombre}
            </h2>
          </div>

          <button
            className="btn-cerrar-icono"
            onClick={onCerrar}
            aria-label="Cerrar modal"
          >
            <X size={22} />
          </button>
        </div>

        <FiltrosOfertaDestacada
          categoriaSeleccionada={
            categoriaSeleccionada
          }
          criterioOrden={
            criterioOrden
          }
          categorias={categorias}
          onCambiarCategoria={
            cambiarCategoria
          }
          onCambiarOrden={
            cambiarOrden
          }
        />

        <ListadoOfertasDestacadas
          descuentos={
            descuentosPaginados
          }
          paginaActual={
            paginaActual
          }
          totalPaginas={
            totalPaginas
          }
          onCambiarPagina={
            cambiarPagina
          }
          onCanjear={onCanjear}
        />

        <button
          className="btn-cerrar"
          onClick={onCerrar}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default VentanaModalOfertaDestacada;