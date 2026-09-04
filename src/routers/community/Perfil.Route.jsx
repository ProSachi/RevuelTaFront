import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/community/Profile'
import PrendasPropias from '../../components/profiles/prendasPropias/PrendasPropias'
import ResenasPropias from '../../components/profiles/ResenasPropias/ResenasPropias'
import ReportesPropios from '../../components/profiles/reportesPropios/ReportesPropios'
import VentanaModalReportarVendedor from '../../components/pages/VentanaModalReportarVendedor/VentanaModalReportarVendedor'

const Perfil = () => {
  return (
    <Routes>
      

      <Route path=":id" element={<Profile />}>
        <Route index element={<PrendasPropias />} />

        <Route path="prendasPublicadas" element={<PrendasPropias />} />
        <Route path="resenas" element={<ResenasPropias />} />
        <Route path="reportes" element={<ReportesPropios />} />
        <Route path="reportar" element={<VentanaModalReportarVendedor />} />

        <Route path="*" element={<PrendasPropias />} />
      </Route>
    </Routes>
  )
}

export default Perfil