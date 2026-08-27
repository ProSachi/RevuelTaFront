<<<<<<< HEAD
// MKT-R01 — Registro
// HU: como usuario nuevo quiero crear una cuenta con correo/contraseña o Google.
export default function Registro() {
  return (
    <section>
      <h1>Crear Cuenta</h1>
      <p>MKT-R01 — pendiente de implementar.</p>
=======
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import FormularioRegistro from '../components/autenticacion/FormularioRegistro/FormularioRegistro.jsx'
import styles from './Registro.module.css'

// MKT-R01 — Registro
// Responsabilidad: Mostrar el título "Crear Cuenta" y actuar como contenedor de la vista de registro,
// incluyendo el formulario mediante el componente FormularioRegistro.
export default function Registro() {
  const { usuario, autenticado, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleRegistroExitoso = () => {
    navigate('/carrito', { replace: true })
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
            <Link to="/carrito" className={styles.btnIr}>
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
>>>>>>> feature/deibyvt
    </section>
  )
}
