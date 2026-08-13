import React, { useState } from "react";

const ListadoPuntosAcopio = ({
    puntos = [],
    puntoSeleccionado,
    puedeModificar,
    onSeleccionarPunto
}) => {
    const [busqueda, setBusqueda] = useState("");

    const puntosFiltrados = puntos.filter((punto) =>
        punto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="listado-puntos-acopio">

            <div className="buscador-container">
                <input
                    type="text"
                    placeholder="Buscar Punto de Acopio"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="input-busqueda"
                />
            </div>

            <div className="puntos-lista">
                {puntosFiltrados.map((punto) => {
                    const esSeleccionado = puntoSeleccionado && puntoSeleccionado.id === punto.id;

                    return (
                        <div
                            className={`punto-card ${esSeleccionado ? "seleccionado" : ""} ${!puedeModificar ? "deshabilitado" : ""}`}
                            key={punto.id}
                            onClick={() => puedeModificar && onSeleccionarPunto(punto)}
                        >
                            <section className="punto-info-principal">
                                <input
                                    type="radio"
                                    name="puntoRadio"
                                    checked={esSeleccionado}
                                    readOnly
                                />

                                <img
                                    src={punto.imagen}
                                    alt={punto.nombre}
                                    className="punto-imagen"
                                />

                                <section className="punto-detalles">
                                    <h3>{punto.nombre}</h3>
                                    <p>{punto.direccion}</p>
                                    <p>{punto.horario}</p>
                                    <p>{punto.telefono}</p>
                                </section>
                            </section>

                            {punto.distintivo && (
                                <span className="punto-distintivo">
                                    {punto.distintivo}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <section className="paginacion-container">
                <button disabled>&lt;</button>
                <button className="activo">1</button>
                <button>2</button>
                <button>3</button>
                <button>&gt;</button>
            </section>

        </div>
    );
};

export default ListadoPuntosAcopio;