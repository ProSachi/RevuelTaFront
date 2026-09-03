import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./SeguimientoEnvio.module.css"
import { obtenerSeguimientoEnvio } from "../../services/seguimientoEnvioServicio";
import { ArrowLeftRight, Store } from "lucide-react";
import BloqueSeguimientoEntrega from "../../components/pages/SeguimientoEnvio/BloqueSeguimientoEntrega";

const SeguimientoEnvio = () => {
    const { pedidoId } = useParams()
    const [seguimiento, setSeguimiento] = useState({})
    useEffect(() => {

        const cargarSeguimiento = async () => {
            const datos = await obtenerSeguimientoEnvio(pedidoId)
            setSeguimiento(datos);
        }

        cargarSeguimiento();

    }, [pedidoId]);
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
                <BloqueSeguimientoEntrega
                    key={entrega.id}
                    entrega={entrega}
                    invertir={seguimiento.entregas.length > 1 &&
                        entrega.tipoEntrega === "recibida"} />
            ))}
            {seguimiento.entregas?.length > 0 && (
                <button
                    type="button"
                    className={styles.botonCambiarPunto}>
                    <Store />
                    Cambiar punto de acopio
                </button>
            )}
        </div>
    )
}

export default SeguimientoEnvio