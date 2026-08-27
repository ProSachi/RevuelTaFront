import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.js'
import {
  validarFormatoCorreo,
  validarSeguridadContrasena,
  validarCoincidenciaContrasenas,
} from '../../../utils/validaciones.js'
import styles from './FormularioRegistro.module.css'

export default function FormularioRegistro({ onRegistroExitoso }) {
  const { registrarUsuario, iniciarSesionConGoogle } = useAuth()

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [recibirNovedades, setRecibirNovedades] = useState(false)

  const [errores, setErrores] = useState({})
  const [errorGlobal, setErrorGlobal] = useState('')
  const [enviando, setEnviando] = useState(false)

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.'
    } else if (!validarFormatoCorreo(correo)) {
      nuevosErrores.correo = 'Ingresa un formato de correo válido (ej. usuario@ejemplo.com).'
    }

    const seguridad = validarSeguridadContrasena(contrasena)
    if (!seguridad.valida) {
      nuevosErrores.contrasena = seguridad.mensaje
    }

    if (!confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Confirma tu contraseña.'
    } else if (!validarCoincidenciaContrasenas(contrasena, confirmarContrasena)) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden.'
    }

    if (!aceptaTerminos) {
      nuevosErrores.aceptaTerminos =
        'Debes aceptar los Términos y Condiciones y la Política de Privacidad para continuar.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGlobal('')

    if (!validarFormulario()) return

    setEnviando(true)
    try {
      const resultado = await registrarUsuario({
        correo,
        contrasena,
        recibirNovedades,
      })

      if (resultado.success) {
        if (onRegistroExitoso) onRegistroExitoso(resultado.usuario)
      } else {
        setErrorGlobal(resultado.error || 'No fue posible crear la cuenta.')
      }
    } catch {
      setErrorGlobal('Ocurrió un error inesperado al procesar el registro.')
    } finally {
      setEnviando(false)
    }
  }

  const handleGoogleSignup = async () => {
    setErrorGlobal('')
    setEnviando(true)
    try {
      const resultado = await iniciarSesionConGoogle()
      if (resultado.success && onRegistroExitoso) {
        onRegistroExitoso(resultado.usuario)
      }
    } catch {
      setErrorGlobal('Error al crear cuenta con Google.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className={styles.tarjeta}>
      {errorGlobal && (
        <div className={styles.alertaErrorGlobal} role="alert">
          {errorGlobal}
        </div>
      )}

      <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
        <div className={styles.campo}>
          <label htmlFor="correo" className={styles.label}>
            Correo
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              ✉
            </span>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className={`${styles.input} ${errores.correo ? styles.inputError : ''}`}
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value)
                if (errores.correo) setErrores((prev) => ({ ...prev, correo: null }))
              }}
              autoComplete="email"
              disabled={enviando}
            />
          </div>
          {errores.correo && <span className={styles.errorTexto}>{errores.correo}</span>}
        </div>

        <div className={styles.campo}>
          <label htmlFor="contrasena" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              🔒
            </span>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              placeholder="••••••••••"
              className={`${styles.input} ${errores.contrasena ? styles.inputError : ''}`}
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value)
                if (errores.contrasena) setErrores((prev) => ({ ...prev, contrasena: null }))
              }}
              autoComplete="new-password"
              disabled={enviando}
            />
          </div>
          {errores.contrasena && <span className={styles.errorTexto}>{errores.contrasena}</span>}
        </div>

        <div className={styles.campo}>
          <label htmlFor="confirmarContrasena" className={styles.label}>
            Confirme su contraseña
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcono} aria-hidden="true">
              🔒
            </span>
            <input
              id="confirmarContrasena"
              name="confirmarContrasena"
              type="password"
              placeholder="••••••••••"
              className={`${styles.input} ${errores.confirmarContrasena ? styles.inputError : ''}`}
              value={confirmarContrasena}
              onChange={(e) => {
                setConfirmarContrasena(e.target.value)
                if (errores.confirmarContrasena)
                  setErrores((prev) => ({ ...prev, confirmarContrasena: null }))
              }}
              autoComplete="new-password"
              disabled={enviando}
            />
          </div>
          {errores.confirmarContrasena && (
            <span className={styles.errorTexto}>{errores.confirmarContrasena}</span>
          )}
        </div>

        <div className={styles.seccionCheckboxes}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={aceptaTerminos}
              onChange={(e) => {
                setAceptaTerminos(e.target.checked)
                if (errores.aceptaTerminos)
                  setErrores((prev) => ({ ...prev, aceptaTerminos: null }))
              }}
              disabled={enviando}
            />
            <span>He leído y acepto los Términos y Condiciones y la Política de Privacidad</span>
          </label>
          {errores.aceptaTerminos && (
            <span className={styles.errorTexto}>{errores.aceptaTerminos}</span>
          )}

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={recibirNovedades}
              onChange={(e) => setRecibirNovedades(e.target.checked)}
              disabled={enviando}
            />
            <span>Quiero recibir ofertas, novedades y descuentos por correo</span>
          </label>
        </div>

        <button type="submit" className={styles.btnSubmit} disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className={styles.divisor}>o</div>

        <button
          type="button"
          className={styles.btnGoogle}
          onClick={handleGoogleSignup}
          disabled={enviando}
        >
          <svg className={styles.googleIcono} viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Crear cuenta con Google
        </button>
      </form>

      <div className={styles.pieLogin}>
        ¿Ya tengo una cuenta?
        <Link to="/login">Iniciar sesión</Link>
      </div>
    </div>
  )
}
