import { Routes, Route } from "react-router-dom"
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
import Profile from "../pages/community/Profile"
import PrendasPropias from "../components/profiles/prendasPropias/PrendasPropias"
import ResenasPropias from "../components/profiles/ResenasPropias/ResenasPropias"
import ReportesPropios from "../components/profiles/reportesPropios/ReportesPropios"
import VentanaModalReportarVendedor from "../components/pages/VentanaModalReportarVendedor/VentanaModalReportarVendedor"
const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                    <Route index element={< Landing />}/>
                    <Route path={RUTAS.LANDING_PAGE} element={< Landing />}/>
                    <Route path={`${RUTAS.PERFIL}/:id/*`} element={<Profile />}>
                        <Route index element={<PrendasPropias />} />
                        <Route path="prendasPublicadas" element={<PrendasPropias />} />
                        <Route path="resenas" element={<ResenasPropias />} />
                        <Route path="reportes" element={<ReportesPropios />} />
                        <Route path="reportar" element={<VentanaModalReportarVendedor />} />
                        <Route path="*" element={<PrendasPropias />} />
                    </Route>
                    <Route path={RUTAS.PEDIDOS} element={<MisPedidos />}/>
                    <Route path={RUTAS.TRUEQUES} element={<MisTrueques />}/>
                    <Route path={RUTAS.CAMPANAS_DESCUENTOS} element={<DescuentosCampanas />} />
                    <Route path={RUTAS.CARRITO} element={<Carrito />}/>
                    <Route path={RUTAS.PUBLICAR_PRENDA} element={null}/>
                    <Route path={`${RUTAS.SEGUIMIENTO_ENVIO}/:pedidoId`} element={<SeguimientoEnvio />}/>
                    <Route path={RUTAS.CATALOGO} element={<Catalogo />}/>
                    <Route path={RUTAS.DETALLE_PRODUCTO} element={<PaginaDetalleProducto />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.REGISTRO} element={<Registro />}/>
                    <Route path={RUTAS.INICIAR_SESION} element={<InicioSesion />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.RECUPERAR_CONTRASENA} element={<RecuperarContrasenaPage />} />
                </Route>
            </Routes>
    )
}

export default AppRouter