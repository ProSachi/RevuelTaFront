import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../../pages/community/Profile'
import PrendasPropias from '../../components/profiles/prendasPropias/PrendasPropias'
import ResenasPropias from '../../components/profiles/ResenasPropias/ResenasPropias'

const Perfil = () => {
  return (
    <Routes>

      {/* Ruta principal del perfil con su ID dinámico */}
      <Route path=":id" element={<Profile />}>

        {/* Ruta index: Si entran a /perfil/123, redirige o muestra prendas */}
        <Route index element={<PrendasPropias />} />

        {/* Subrutas del perfil */}
        <Route path="prendasPublicadas" element={<PrendasPropias />} />
        <Route path="resenas" element={<ResenasPropias />} />


        {/* Redirección de respaldo por si escriben una subruta inválida */}
        <Route path="*" element={<PrendasPropias />} />
        
      </Route>

    </Routes>
  )
}

export default Perfil