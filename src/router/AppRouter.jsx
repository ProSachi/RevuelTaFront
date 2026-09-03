import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { RUTAS } from "../constants/rutas"
import AuthLayout from "../layouts/AuthLayout"
import MisPedidos from "../pages/Pedidos/MisPedidos"
import SeguimientoEnvio from "../pages/SeguimientoEnvio/SeguimientoEnvio"
import InicioSesion from "../pages/InicioSesion"
import DescuentosCampanas from "../pages/mercadeo/DescuentosCampanas"
import RecuperarContrasenaPage from "../components/RecuperacionContraseña/RecuperarContrasena"
import Landing from "../pages/Landing"
import Catalogo from "../pages/catalogo/Catalogo"
import PaginaDetalleProducto from "../pages/PaginaDetalleProducto"
import Carrito from "../pages/Carrito"
import Registro from "../pages/Registro"
import MisTrueques from "../pages/MisTrueques"
import PuntoAcopio from "../components/PuntoAcopio/PuntoAcopio"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={RUTAS.LANDING_PAGE} element={< Landing />}/>
                    <Route path={RUTAS.PERFIL} element={null}/>
                    <Route path={RUTAS.PEDIDOS} element={<MisPedidos />}/>
                    <Route path={RUTAS.TRUEQUES} element={<MisTrueques />}/>
                    <Route path={RUTAS.CAMPANAS_DESCUENTOS} element={<DescuentosCampanas />} />
                    <Route path={RUTAS.CARRITO} element={<Carrito />}/>
                    <Route path={RUTAS.PUBLICAR_PRENDA} element={null}/>
                    <Route path={RUTAS.SEGUIMIENTO_ENVIO} element={<SeguimientoEnvio />}/>
                    <Route path={RUTAS.CATALOGO} element={<Catalogo />}/>
                    <Route path={RUTAS.DETALLE_PRODUCTO} element={<PaginaDetalleProducto />}/>
                    <Route path={RUTAS.PUNTO_ACOPIO} element={<PuntoAcopio />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.REGISTRO} element={<Registro />}/>
                    <Route path={RUTAS.INICIAR_SESION} element={<InicioSesion />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.RECUPERAR_CONTRASENA} element={<RecuperarContrasenaPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter