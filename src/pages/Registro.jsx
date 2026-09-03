import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { RUTAS } from '../constants/rutas'
import FormularioRegistro from '../components/autenticacion/FormularioRegistro/FormularioRegistro.jsx'
import styles from './Registro.module.css'

// MKT-R01 — Registro
// Responsabilidad: Mostrar el título "Crear Cuenta" y actuar como contenedor de la vista de registro,
// incluyendo el formulario mediante el componente FormularioRegistro.
export default function Registro() {
  const { usuario, autenticado, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleRegistroExitoso = () => {
    navigate(RUTAS.CARRITO, { replace: true })
  }

  return (
    <section className={styles.pagina}>
      <h1 className={styles.titulo}>Crear Cuenta</h1>

      {autenticado ? (
        <div className={styles.alertaSesionActiva}>
          <p>
            Ya tienes una cuenta activa como <strong>{usuario?.nombre || usuario?.correo}</strong>.
          </p>
          <div className={styles.accionesSesionActiva}>
            <Link to={RUTAS.CARRITO} className={styles.btnIr}>
              Ir al Carrito
            </Link>
            <button type="button" className={styles.btnCerrar} onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <FormularioRegistro onRegistroExitoso={handleRegistroExitoso} />
      )}
    </section>
  )
}
