<<<<<<< HEAD
import { Routes, Route, Link } from 'react-router-dom'
import Carrito from './pages/Carrito.jsx'
import MisTrueques from './pages/MisTrueques.jsx'
import Registro from './pages/Registro.jsx'
import InicioSesion from './pages/InicioSesion.jsx'

// Header/Footer globales los define el equipo de Logística (LOG-HF01).
// Este layout temporal solo sirve para navegar entre las HUs de Marketplace mientras se integra.
function LayoutTemporal({ children }) {
  return (
    <div style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/carrito">Carrito</Link>
        <Link to="/mis-trueques">Mis Trueques</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/login">Iniciar sesión</Link>
      </nav>
      {children}
    </div>
  )
}

function App() {
  return (
    <LayoutTemporal>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/mis-trueques" element={<MisTrueques />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<InicioSesion />} />
      </Routes>
    </LayoutTemporal>
=======
import InicioSesion from "./pages/InicioSesion"

function App() {
  return (
    <InicioSesion />
>>>>>>> feature/deibyvt
  )
}

export default App
