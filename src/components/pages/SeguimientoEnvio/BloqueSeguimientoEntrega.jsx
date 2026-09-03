import styles from "./BloqueSeguimientoEntrega.module.css"
import MapaPuntoAcopio from "./MapaPuntoAcopio"

const BloqueSeguimientoEntrega = ({ entrega, invertir }) => {
    console.log(
        "ID:", entrega.id,
        "| ORIGEN:", entrega.puntoOrigen?.nombre,
        "| DESTINO:", entrega.puntoDestino?.nombre,
        "| TIPO:", entrega.tipoEntrega
    )
    const puntoVisible = entrega.tipoEntrega === "propia" ? entrega.puntoOrigen : entrega.puntoDestino
    const obtenerClaseEstado = (situacion) => {
        if (situacion === "completado") return styles.estadoCompletado;
        if (situacion === "actual") return styles.estadoActual;
        return styles.estadoPendiente;
    }
    const formatearFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora)

        return new Intl.DateTimeFormat("es-CO", {
            day: "2-digit",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(fecha)
    }
    return (
        <div className={styles.bloqueSeguimiento}>
            <div
                className={`${styles.contenidoSeguimiento} ${invertir ? styles.contenidoInvertido : ""}`}>
                <span className={styles.etiquetaEntrega}>{entrega.etiqueta}</span>

                <section className={styles.seccionEstados}>
                    <h2 className={styles.nombrePrenda}>{entrega.prenda.nombre}</h2>

                    <div className={styles.listaEstados}>
                        {entrega.estados.map((estado) => (
                            <div key={estado.id} className={`${styles.estadoSeguimiento} ${obtenerClaseEstado(estado.situacion)}`}>
                                <p className={styles.nombreEstado}>
                                    {estado.estado}
                                    {estado.punto === "origen" && ` ${entrega.puntoOrigen.nombre}`}
                                    {estado.punto === "destino" && ` ${entrega.puntoDestino.nombre}`}
                                </p>
                                {estado.fechaHora && (
                                    <span className={styles.detalleEstado}>{formatearFechaHora(estado.fechaHora)}</span>
                                )}
                                {!estado.fechaHora && estado.situacion === "pendiente" && <span className={styles.detalleEstado}>Pendiente</span>}
                                {!estado.fechaHora && estado.situacion === "actual" && <span className={styles.detalleEstado}>Estado actual</span>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.seccionPuntoAcopio}>
                    <h3>{entrega.tipoEntrega === "propia" ? "Punto de entrega" : "Punto de recogida"}</h3>
                    <div className={styles.tarjetaPuntoAcopio}>
                        <MapaPuntoAcopio
                            latitud={puntoVisible.latitud}
                            longitud={puntoVisible.longitud}
                            nombrePunto={puntoVisible.nombre} />
                        <div className={styles.datosPuntoAcopio}>
                            <p>{puntoVisible.nombre}</p>
                            <span>{puntoVisible.direccion}</span>
                            <span className={styles.textoHorario}>Horario de atención: </span>
                            <span>Lunes a Viernes de: {puntoVisible.horario}</span>
                        </div>
                    </div>
                    <h3>Datos de envío</h3>
                    <div className={styles.datosEnvio}>
                        <span className={styles.etiquetaDatoEnvio}>Transportista asignado:</span>
                        <p className={styles.textoDatosEnvio}>{entrega.transportista.nombre}</p>
                        {entrega.tipoEntrega === "recibida" && (
                            <>
                                <span className={styles.etiquetaDatoEnvio}>Costo de envío:</span>
                                <p className={styles.textoDatosEnvio}>${entrega.costoEnvio.toLocaleString("es-CO")}</p>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BloqueSeguimientoEntrega