import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { RUTAS } from "../constants/rutas"
import AuthLayout from "../layouts/AuthLayout"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={RUTAS.LANDING_PAGE} element={null}/>
                    <Route path={RUTAS.PERFIL} element={null}/>
                    <Route path={RUTAS.PEDIDOS} element={null}/>
                    <Route path={RUTAS.TRUEQUES} element={null}/>
                    <Route path={RUTAS.CAMPANAS_DESCUENTOS} element={null}/>
                    <Route path={RUTAS.CARRITO} element={null}/>
                    <Route path={RUTAS.PUBLICAR_PRENDA} element={null}/>
                    <Route path={RUTAS.CATALOGO} element={null}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.REGISTRO} element={null}/>
                    <Route path={RUTAS.INICIAR_SESION} element={null}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter