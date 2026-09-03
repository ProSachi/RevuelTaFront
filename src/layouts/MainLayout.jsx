import { useLayoutEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import styles from "./Layout.module.css"
import Header from "../components/layout/Header/Header"
import Footer from "../components/layout/Footer/Footer"
import { RUTAS } from "../constants/rutas"

const MainLayout = () => {
    const location = useLocation()

    useLayoutEffect(() => {
        const bootstrap = document.getElementById("bootstrap-estilos")

        if (!bootstrap) {
            return
        }

        const usarBootstrap =
            location.pathname === RUTAS.CAMPANAS_DESCUENTOS

        bootstrap.disabled = !usarBootstrap
    }, [location.pathname])

    return (
        <>
            <Header />

            <main className={`${styles.main} ${styles.mainPrincipal}`}>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default MainLayout