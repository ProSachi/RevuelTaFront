import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/community/Profile'
import PrendasPropias from '../../components/profiles/prendasPropias/PrendasPropias'
import ResenasPropias from '../../components/profiles/ResenasPropias/ResenasPropias'

const Perfil = () => {
  return (
    <Routes>
      

      <Route path=":id" element={<Profile />}>
        <Route index element={<PrendasPropias />} />

        <Route path="prendasPublicadas" element={<PrendasPropias />} />
        <Route path="resenas" element={<ResenasPropias />} />

        <Route path="*" element={<PrendasPropias />} />
      </Route>
    </Routes>
  )
}

export default Perfil