import React, { useState } from "react";
import ListadoPuntosAcopio from "./ListadoPuntosAcopio";
import "./PuntoAcopio.css";

const PuntoAcopio = ({
    isOpen,
    onClose,
    estadoLogistico = "Pendiente",
    puntoRecogidaOriginal,
    puntoEntregaOriginal,
    todosLosPuntos = []
}) => {
    if (!isOpen) return null;

    const esPendiente = estadoLogistico === "Pendiente";

    const [puntoRecogidaSeleccionado, setPuntoRecogidaSeleccionado] = useState(puntoRecogidaOriginal);
    const [puntoEntregaSeleccionado, setPuntoEntregaSeleccionado] = useState(puntoEntregaOriginal);
    const [tipoPuntoActivo, setTipoPuntoActivo] = useState("Recogida");

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
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <section className="modal-header">
                    <h2>Puntos de acopios</h2>
                    <button className="btn-cerrar" onClick={onClose}>&times;</button>
                </section>

                <section className="modal-estado">
                    {esPendiente ? (
                        <div className="mensaje-estado estado-verde">
                            Si, estado = Pendiente. Puedes cambiar el punto de Acopio de entrega o recogida
                        </div>
                    ) : (
                        <div className="mensaje-estado estado-rojo">
                            Si, estado ≠Pendiente. No podras cambiar el punto de Acopio de entrega o recogida
                        </div>
                    )}
                </section>

                <section className="opciones-puntos">
                    <label className="opcion-radio">
                        <input
                            type="radio"
                            name="opcionPunto"
                            checked={tipoPuntoActivo === "Recogida"}
                            onChange={() => setTipoPuntoActivo("Recogida")}
                        />
                        <span>Recogida: <strong>{puntoRecogidaSeleccionado?.nombre}</strong></span>
                    </label>

                    <label className="opcion-radio">
                        <input
                            type="radio"
                            name="opcionPunto"
                            checked={tipoPuntoActivo === "Entrega"}
                            onChange={() => setTipoPuntoActivo("Entrega")}
                        />
                        <span>Entrega: <strong>{puntoEntregaSeleccionado?.nombre}</strong></span>
                    </label>
                </section>

                <section className="modal-body">
                    <ListadoPuntosAcopio
                        puntos={todosLosPuntos}
                        puntoSeleccionado={puntoActivoActual}
                        puedeModificar={esPendiente}
                        onSeleccionarPunto={handleSeleccion}
                    />
                </section>

                <section className="modal-footer">
                    <button
                        className="btn-confirmar"
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