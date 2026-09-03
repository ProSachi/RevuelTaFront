import { Bell, Plus, ShoppingCart, UserRound } from "lucide-react"
import styles from "./AccionesHeader.module.css"
import PanelIdentificacion from "./PanelIdentificacion/PanelIdentificacion"
import PanelNotificaciones from "./PanelNotificaciones/PanelNotificaciones"
import PanelPerfil from "./PanelPerfil/PanelPerfil"
import { obtenerNotificaciones } from "../../../../services/notificacionesService"
import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { RUTAS } from "../../../../constants/rutas"
import { useAuth } from "../../../../hooks/useAuth"

const AccionesHeader = () => {
    const { autenticado, cerrarSesion: cerrarSesionContexto } = useAuth()
    const navigate = useNavigate()
    const [panelActivo, setPanelActivo] = useState(null)
    const [publicarMovilAbierto, setPublicarMovilAbierto] = useState(false)

    const notificaciones = obtenerNotificaciones()
    const contenedorAcciones = useRef(null)

    const cantidadCarrito = 10
    const contadorCarrito = cantidadCarrito > 10 ? "10+" : cantidadCarrito

    function alternarMenuPerfil() {
        setPublicarMovilAbierto(false)

        setPanelActivo(
            panelActivo === "perfil" ? null : "perfil"
        )
    }

    function alternarNotificaciones() {
        setPublicarMovilAbierto(false)

        setPanelActivo(
            panelActivo === "notificaciones" ? null : "notificaciones"
        )
    }

    function alternarCarrito() {
        setPublicarMovilAbierto(false)

        setPanelActivo(
            panelActivo === "carrito" ? null : "carrito"
        )
    }

    function alternarPublicarMovil() {
        setPanelActivo(null)
        setPublicarMovilAbierto(!publicarMovilAbierto)
    }

    function abrirIdentificacionPublicar() {
        setPublicarMovilAbierto(false)
        setPanelActivo("publicar")
    }

    function cerrarSesion() {
        cerrarSesionContexto()

        setPanelActivo(null)
        setPublicarMovilAbierto(false)

        navigate(RUTAS.LANDING_PAGE)
    }

    const cerrarPanelActivo = () => {
        setPanelActivo(null)
        setPublicarMovilAbierto(false)
    }

    useEffect(() => {
        function manejarClickFuera(event) {
            if (
                panelActivo !== null &&
                contenedorAcciones.current &&
                !contenedorAcciones.current.contains(event.target)
            ) {
                setPanelActivo(null)
            }

            if (
                publicarMovilAbierto &&
                contenedorAcciones.current &&
                !contenedorAcciones.current.contains(event.target)
            ) {
                setPublicarMovilAbierto(false)
            }
        }

        document.addEventListener("mousedown", manejarClickFuera)

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera)
        }
    }, [panelActivo, publicarMovilAbierto])

    return (
        <>
            <div
                className={styles.accionesHeader}
                ref={contenedorAcciones}
            >
                <button
                    className={`${styles.botonIcono} ${panelActivo === "notificaciones"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={alternarNotificaciones}
                >
                    <Bell />

                    {autenticado && notificaciones.length > 0 && (
                        <span className={styles.indicadorNotificacion}></span>
                    )}
                </button>

                {autenticado ? (
                    <NavLink
                        to={RUTAS.CARRITO}
                        className={styles.botonIcono}
                        onClick={cerrarPanelActivo}
                    >
                        <ShoppingCart />

                        {cantidadCarrito > 0 && (
                            <span className={styles.contadorCarrito}>
                                {contadorCarrito}
                            </span>
                        )}
                    </NavLink>
                ) : (
                    <button
                        className={`${styles.botonIcono} ${panelActivo === "carrito"
                            ? styles.botonIconoActivo
                            : ""
                            }`}
                        onClick={alternarCarrito}
                    >
                        <ShoppingCart />
                    </button>
                )}

                <button
                    className={`${styles.botonIcono} ${panelActivo === "perfil"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={alternarMenuPerfil}
                >
                    <UserRound />
                </button>

                {autenticado ? (
                    <NavLink
                        to={RUTAS.PUBLICAR_PRENDA}
                        className={styles.botonPublicar}
                        onClick={cerrarPanelActivo}
                    >
                        <Plus className={styles.iconoBotonPublicar} />
                        Publicar prenda
                    </NavLink>
                ) : (
                    <button
                        className={styles.botonPublicar}
                        onClick={abrirIdentificacionPublicar}
                    >
                        <Plus className={styles.iconoBotonPublicar} />
                        Publicar prenda
                    </button>
                )}

                <div className={styles.publicarFlotante}>
                    {publicarMovilAbierto && (
                        autenticado ? (
                            <NavLink
                                to={RUTAS.PUBLICAR_PRENDA}
                                className={styles.accionPublicarMovil}
                                onClick={cerrarPanelActivo}
                            >
                                <Plus className={styles.iconoBotonPublicar} />
                                Publicar prenda
                            </NavLink>
                        ) : (
                            <button
                                type="button"
                                className={styles.accionPublicarMovil}
                                onClick={abrirIdentificacionPublicar}
                            >
                                <Plus className={styles.iconoBotonPublicar} />
                                Publicar prenda
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        className={`${styles.botonPublicarFlotante} ${publicarMovilAbierto
                            ? styles.botonPublicarFlotanteAbierto
                            : ""
                            }`}
                        onClick={alternarPublicarMovil}
                    >
                        <Plus />
                    </button>
                </div>

                {autenticado && panelActivo === "perfil" && (
                    <PanelPerfil
                        cerrarPanelActivo={cerrarPanelActivo}
                        cerrarSesion={cerrarSesion}
                    />
                )}

                {autenticado && panelActivo === "notificaciones" && (
                    <PanelNotificaciones
                        notificaciones={notificaciones}
                    />
                )}

                {!autenticado && panelActivo !== null && (
                    <PanelIdentificacion />
                )}
            </div>

            {autenticado && (
                panelActivo === "perfil" ||
                panelActivo === "notificaciones"
            ) && (
                    <div className={styles.fondoPanel}></div>
                )}
        </>
    )
}

export default AccionesHeader