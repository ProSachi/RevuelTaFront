import React, { useState } from "react";
import styles from "./PuntoAcopio.module.css";

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
        <div className={styles["listado-puntos-acopio"]}>

            <div className={styles["buscador-container"]}>
                <input
                    type="text"
                    placeholder="Buscar Punto de Acopio"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className={styles["input-busqueda"]}
                />
            </div>

            <div className={styles["puntos-lista"]}>
                {puntosFiltrados.map((punto) => {
                    const esSeleccionado = puntoSeleccionado && puntoSeleccionado.id === punto.id;

                    return (
                        <div
                            className={`${styles["punto-card"]} ${esSeleccionado ? styles.seleccionado : ""} ${!puedeModificar ? styles.deshabilitado : ""}`}
                            key={punto.id}
                            onClick={() => puedeModificar && onSeleccionarPunto(punto)}
                        >
                            <section className={styles["punto-info-principal"]}>
                                <input
                                    type="radio"
                                    name="puntoRadio"
                                    checked={esSeleccionado}
                                    readOnly
                                />

                                <img
                                    src={punto.imagen}
                                    alt={punto.nombre}
                                    className={styles["punto-imagen"]}
                                />

                                <section className={styles["punto-detalles"]}>
                                    <h3>{punto.nombre}</h3>
                                    <p>{punto.direccion}</p>
                                    <p>{punto.horario}</p>
                                    <p>{punto.telefono}</p>
                                </section>
                            </section>

                            {punto.distintivo && (
                                <span className={styles["punto-distintivo"]}>
                                    {punto.distintivo}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ListadoPuntosAcopio;