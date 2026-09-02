import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.js'
import Carrito from './pages/Carrito.jsx'
import MisTrueques from './pages/MisTrueques.jsx'
import Registro from './pages/Registro.jsx'
import InicioSesion from './pages/InicioSesion.jsx'

// Header/Footer globales los define el equipo de Logística (LOG-HF01).
// Este layout temporal solo sirve para navegar entre las HUs de Marketplace mientras se integra.
function LayoutTemporal({ children }) {
  const { usuario, autenticado, cerrarSesion } = useAuth()

  return (
    <div style={{ padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="#" style={{ fontWeight: 600 }}>
            Carrito
          </Link>
          <Link to="#" style={{ fontWeight: 600 }}>
            Mis Trueques
          </Link>
          <Link to="#" style={{ fontWeight: 600 }}>
            Registro
          </Link>
          <Link to="#" style={{ fontWeight: 600 }}>
            Iniciar sesión
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
          {autenticado ? (
            <>
              <span style={{ color: 'var(--pine)', fontWeight: 600 }}>
                ● {usuario?.nombre || usuario?.correo}
              </span>
              <button
                type="button"
                onClick={cerrarSesion}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <span style={{ color: '#888' }}>Sin sesión activa</span>
          )}
        </div>
      </header>
      <main>{children}</main>
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
  )
}

export default App
