import { useNavigate } from 'react-router-dom';
import FormularioRecuperacionContrasena from './FormularioRecuperacionContrasena';
import estilos from './RecuperarContrasena.module.css';

const RecuperarContrasena = () => {
  const navegar = useNavigate();

  const manejarRegresoInicioSesion = () => {
    navegar('/login');
  };

  return (
    <main className={estilos.contenedorPrincipal}>
      <section className={estilos.tarjetaFormulario}>
        <h1 className={estilos.titulo}>¿Olvidaste tu contraseña?</h1>
        <p className={estilos.descripcion}>
          Ingresa el correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu contraseña.
        </p>

        <FormularioRecuperacionContrasena />

        <button
          type="button"
          className={estilos.botonVolverInicioSesion}
          onClick={manejarRegresoInicioSesion}
        >
          Volver a iniciar sesión
        </button>
      </section>
    </main>
  );
};

export default RecuperarContrasena;