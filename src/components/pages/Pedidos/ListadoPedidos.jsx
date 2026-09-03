import { Link } from "react-router-dom";
import styles from "./MisPedidos.module.css";
import { RUTAS } from "../../../constants/rutas";


const ListadoPedidos = ({ pedidos, imagenesPorPrenda, onVerResena }) => {

    const mostrarSaldoTrueque = (saldo) => {
        const saldoNumerico = Number(saldo)

        if (saldo > 0) {
            return `Debes pagar: $${saldo.toLocaleString("es-CO")}`
        }
        if (saldo < 0) {
            return `Recibes: $${Math.abs(saldo).toLocaleString("es-CO")}`
        }

        return "No debes pagar ni recibir dinero"
    }

    return (
        <div className={styles.listadoPedidos}>
            {pedidos.length === 0 ? (
                <div className={styles.sinPedidos}>
                    <h2>No encontramos pedidos</h2>
                    <p>No hay pedidos que coincidan con los filtros seleccionados</p>
                </div>
            ) : (
                pedidos.map((pedido) => (
                    <div className={styles.pedidoCard} key={pedido.id}>

                        <section className={styles.pedidoHeader}>

                            <section className={styles.pedidoInfo}>
                                <h2>Pedido #{pedido.id}</h2>
                                <p className={styles.pedidoFecha}>{pedido.fecha}</p>
                            </section>

                            <span className={styles.pedidoEstado}>{pedido.estado}</span>
                        </section>

                        {pedido.tipoOperacion === "compra" && (
                            <div className={styles.pedidoCompra}>
                                <p className={styles.cantidadPrendas}>{pedido.prendas.length}{" "} {pedido.prendas.length === 1 ? "prenda" : "prendas"}</p>
                                {pedido.prendas.map((prenda) => (

                                    <div className={styles.prenda} key={prenda.id}>

                                        <div className={styles.prendaInfo}>
                                            <h3>{prenda.nombre}</h3>

                                            {imagenesPorPrenda[prenda.id] && (
                                                <img
                                                    className={styles.prendaImagen}
                                                    src={imagenesPorPrenda[prenda.id]}
                                                    alt={prenda.nombre}
                                                />
                                            )}
                                        </div>

                                        <span className={styles.prendaPrecio}>
                                            ${prenda.precio.toLocaleString("es-CO")}
                                        </span>

                                    </div>

                                ))}
                            </div>
                        )}

                        {pedido.tipoOperacion === "trueque" && (
                            <div className={styles.pedidoTrueque}>
                                <div className={styles.prenda}>
                                    <section className={styles.prendaInfo}>
                                        <h3>{pedido.prendas[0].nombre}</h3>

                                        {imagenesPorPrenda[pedido.prendas[0].id] && (
                                            <img
                                                className={styles.prendaImagen}
                                                src={imagenesPorPrenda[pedido.prendas[0].id]}
                                                alt={pedido.prendas[0].nombre}
                                            />
                                        )}
                                    </section>
                                </div>

                                <div className={styles.truequeIndicador}>↕</div>

                                <div className={styles.prenda}>
                                    <section className={styles.prendaInfo}>
                                        <h3>{pedido.prendas[1].nombre}</h3>

                                        {imagenesPorPrenda[pedido.prendas[1].id] && (
                                            <img
                                                className={styles.prendaImagen}
                                                src={imagenesPorPrenda[pedido.prendas[1].id]}
                                                alt={pedido.prendas[1].nombre}
                                            />
                                        )}
                                    </section>
                                </div>

                                <div className={styles.saldoTrueque}>{mostrarSaldoTrueque(pedido.saldoTrueque)}</div>

                            </div>
                        )}


                        <section className={styles.pedidoAcciones}>
                            {pedido.estado === "En preparación" && (
                                <>
                                    <Link to={`${RUTAS.SEGUIMIENTO_ENVIO}/${pedido.id}`} className={styles.miLink}>Rastrear envío</Link>
                                    <Link className={styles.miLink}>Ver detalles</Link>
                                </>
                            )}

                            {pedido.estado === "Enviado" && (
                                <>
                                    <Link to={`${RUTAS.SEGUIMIENTO_ENVIO}/${pedido.id}`} className={styles.miLink}>Rastrear envío</Link>
                                    <Link className={styles.miLink}>Ver detalles</Link>
                                </>
                            )}

                            {pedido.estado === "Entregado" && (
                                <>
                                    <Link className={styles.miLink}>Ver detalles</Link>
                                    {!pedido.tieneResena ? (<Link className={styles.miLink}>Dejar reseña</Link>) : <span className={styles.miLink} onClick={() => onVerResena(pedido)}>Ver mi reseña</span>}

                                    <Link className={styles.miLink}>Volver a comprar</Link>
                                </>
                            )}

                            {pedido.estado === "Cancelado" && (
                                <>
                                    {pedido.motivoCancelacion && (<p>Motivo: {pedido.motivoCancelacion}</p>)}
                                    {pedido.estadoReembolso && (<p>Reembolso: {pedido.estadoReembolso}</p>)}
                                    <Link className={styles.miLink}>Ver detalles</Link>
                                </>
                            )}
                        </section>

                    </div>
                ))
            )}

        </div>
    );
}

export default ListadoPedidos