import { useEffect, useState } from "react"
import styles from "./SeguimientoEnvio.module.css"
import { obtenerSeguimientoEnvio } from "../../services/seguimientoEnvioServicio";
import { ArrowLeftRight, Store } from "lucide-react";
import BloqueSeguimientoEntrega from "../../components/pages/SeguimientoEnvio/BloqueSeguimientoEntrega";
import LogicaPuntoAcopio from "../../components/PuntoAcopio/LogicaPuntoAcopio";
import puntosAcopio from "../../data/PuntoAcopio";

const SeguimientoEnvio = () => {
    const [seguimiento, setSeguimiento] = useState({})
    const [modalPuntoAcopioAbierto, setModalPuntoAcopioAbierto] = useState(false)
    useEffect(() => {

        const cargarSeguimiento = async () => {
            const datos = await obtenerSeguimientoEnvio();
            setSeguimiento(datos);
        }

        cargarSeguimiento();

    }, []);
    return (
        <div className={styles.contenedorPrincipal}>
            <div className={styles.contenedorEncabezado}>
                <h1 className={styles.tituloSeguimientoEnvio}>Seguimiento de Envío</h1>
                <p className={styles.referenciaPedido}>
                    <span>Pedido #{seguimiento.pedidoId}</span>
                    <span>·</span>
                    {seguimiento.prendas && (
                        seguimiento.tipoOperacion === "trueque"
                            ? <>{seguimiento.prendas[0].nombre} <ArrowLeftRight /> {seguimiento.prendas[1].nombre}</>
                            : seguimiento.prendas[0].nombre
                    )}
                </p>
            </div>
            {seguimiento.entregas && seguimiento.entregas.map((entrega) => (
                <BloqueSeguimientoEntrega key={entrega.id} entrega={entrega} />
            ))}
            {seguimiento.entregas?.length > 0 && (
                <button
                    type="button"
                    className={styles.botonCambiarPunto}
                    onClick={() => setModalPuntoAcopioAbierto(true)}>
                        <Store />
                    Cambiar punto de acopio
                </button>
            )}

            {modalPuntoAcopioAbierto && (
                <LogicaPuntoAcopio
                    isOpen={modalPuntoAcopioAbierto}
                    onClose={() => setModalPuntoAcopioAbierto(false)}
                    estadoLogistico="Pendiente"
                    puntoRecogidaOriginal={puntosAcopio[0]}
                    puntoEntregaOriginal={puntosAcopio[1]}
                    todosLosPuntos={puntosAcopio}
                />
            )}
        </div>
    )
}

export default SeguimientoEnvio