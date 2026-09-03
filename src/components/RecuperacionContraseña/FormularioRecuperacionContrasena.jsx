import { useState } from "react";
import estilos from "./RecuperarContrasena.module.css";
import { solicitarRecuperacionContrasena } from "../../services/recuperacionServicio";

const FormularioRecuperacionContrasena = () => {
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const [estaCargando, setEstaCargando] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const validarFormatoCorreo = (correoParaValidar) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(correoParaValidar);
    };

    const manejarEnvioFormulario = async (evento) => {
    evento.preventDefault();
    const correoLimpio = correoElectronico.trim();

    if (!correoLimpio) {
        setMensajeError("El correo electrónico es obligatorio.");
        return;
    }

    if (!validarFormatoCorreo(correoLimpio)) {
        setMensajeError("Ingresa un formato de correo electrónico válido.");
        return;
    }

    setMensajeError("");
    setEstaCargando(true);

    try {
        await solicitarRecuperacionContrasena(correoLimpio);
        setMostrarConfirmacion(true);
    } catch {
      setMostrarConfirmacion(true);
    } finally {
      setEstaCargando(false);
    }
  };

  const manejarCambioEntrada = (evento) => {
    setCorreoElectronico(evento.target.value);
    if (mensajeError) {
      setMensajeError("");
    }
  };

  return (
    <form
      className={estilos.formulario}
      onSubmit={manejarEnvioFormulario}
      noValidate
    >
      <div className={estilos.grupoCampo}>
        <label htmlFor="campo-correo" className={estilos.etiquetaCampo}>
          Correo electrónico
        </label>
        <input
          id="campo-correo"
          type="email"
          className={`${estilos.campoTexto} ${mensajeError ? estilos.campoConError : ""}`}
          placeholder="Ingresa tu correo electrónico"
          value={correoElectronico}
          onChange={manejarCambioEntrada}
        />
        {mensajeError && (
          <span className={estilos.mensajeError}>{mensajeError}</span>
        )}
      </div>

      <button
        type="submit"
        className={estilos.botonEnviar}
        disabled={estaCargando}
      >
        {estaCargando ? "Enviando..." : "Enviar enlace de recuperación"}
      </button>

      {mostrarConfirmacion && (
        <div className={estilos.mensajeConfirmacion}>
          <span className={estilos.iconoInformativo}>ℹ️</span>
          <span>
            Si el correo está registrado, recibirás un enlace con las
            instrucciones para crear una nueva contraseña.
          </span>
        </div>
      )}
    </form>
  );
};

export default FormularioRecuperacionContrasena;
