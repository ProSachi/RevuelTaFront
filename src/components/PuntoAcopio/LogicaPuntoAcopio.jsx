import React, { useState } from "react";
import ListadoPuntosAcopio from "./ListadoPuntoAcopio";
import styles from "./PuntoAcopio.module.css";

const PuntoAcopio = ({
    isOpen = true,
    onClose,
    estadoLogistico = "Pendiente",
    puntoRecogidaOriginal,
    puntoEntregaOriginal,
    todosLosPuntos = []
}) => {
    const [modalAbierta, setModalAbierta] = useState(isOpen);
    const esPendiente = estadoLogistico === "Pendiente";

    const [puntoRecogidaSeleccionado, setPuntoRecogidaSeleccionado] = useState(puntoRecogidaOriginal);
    const [puntoEntregaSeleccionado, setPuntoEntregaSeleccionado] = useState(puntoEntregaOriginal);
    const [tipoPuntoActivo, setTipoPuntoActivo] = useState("Recogida");

    if (!modalAbierta) return null;

    const puntoActivoActual = tipoPuntoActivo === "Recogida"
        ? puntoRecogidaSeleccionado
        : puntoEntregaSeleccionado;

    const handleSeleccion = (nuevoPunto) => {
        if (tipoPuntoActivo === "Recogida") {
            setPuntoRecogidaSeleccionado(nuevoPunto);
        } else {
            setPuntoEntregaSeleccionado(nuevoPunto);
        }
    };

    const hayCambios =
        esPendiente &&
        (puntoRecogidaSeleccionado?.id !== puntoRecogidaOriginal?.id ||
         puntoEntregaSeleccionado?.id !== puntoEntregaOriginal?.id);

    const handleConfirmar = () => {
        if (hayCambios) {
            alert("Nuevos puntos seleccionados aplicados con exito");
            setModalAbierta(false);
            if (typeof onClose === "function") {
                onClose();
            }
        }
    };

    const handleCerrar = () => {
        setModalAbierta(false);
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles["modal-container"]}>

                <section className={styles["modal-header"]}>
                    <h2>Puntos de acopios</h2>
                    <button className={styles["btn-cerrar"]} onClick={handleCerrar}>&times;</button>
                </section>

                <section className={styles["modal-estado"]}>
                    {esPendiente ? (
                        <div className={`${styles["mensaje-estado"]} ${styles["estado-verde"]}`}>
                            Si, estado = Pendiente. Puedes cambiar el punto de Acopio de entrega o recogida
                        </div>
                    ) : (
                        <div className={`${styles["mensaje-estado"]} ${styles["estado-rojo"]}`}>
                            Si, estado ≠Pendiente. No podras cambiar el punto de Acopio de entrega o recogida
                        </div>
                    )}
                </section>

                <section className={styles["opciones-puntos"]}>
                    <label className={styles["opcion-radio"]}>
                        <input
                            type="radio"
                            name="opcionPunto"
                            checked={tipoPuntoActivo === "Recogida"}
                            onChange={() => setTipoPuntoActivo("Recogida")}
                        />
                        <span>Recogida: <strong>{puntoRecogidaSeleccionado?.nombre}</strong></span>
                    </label>

                    <label className={styles["opcion-radio"]}>
                        <input
                            type="radio"
                            name="opcionPunto"
                            checked={tipoPuntoActivo === "Entrega"}
                            onChange={() => setTipoPuntoActivo("Entrega")}
                        />
                        <span>Entrega: <strong>{puntoEntregaSeleccionado?.nombre}</strong></span>
                    </label>
                </section>

                <section className={styles["modal-body"]}>
                    <ListadoPuntosAcopio
                        puntos={todosLosPuntos}
                        puntoSeleccionado={puntoActivoActual}
                        puedeModificar={esPendiente}
                        onSeleccionarPunto={handleSeleccion}
                    />
                </section>

                <section className={styles["modal-footer"]}>
                    <button
                        className={styles["btn-confirmar"]}
                        onClick={handleConfirmar}
                        disabled={!hayCambios}
                    >
                        Confirmar cambio
                    </button>
                </section>

            </div>
        </div>
    );
};

export default PuntoAcopio;