import { forwardRef, useImperativeHandle, useState } from "react";
import { validarContrasenaActual } from "../../../services/perfilService";
import estilos from "./FormularioEditarPerfil.module.css";

const FormularioEditarPerfil = forwardRef(function FormularioEditarPerfil(
  { usuarioOriginal, onCambiosChange, onAbrirPuntosAcopio },
  ref
) {
  const [nombreUsuario, setNombreUsuario] = useState(usuarioOriginal.nombreUsuario);
  const [fotoPerfil, setFotoPerfil] = useState(usuarioOriginal.fotoPerfil);
  const [puntosAcopio, setPuntosAcopio] = useState(usuarioOriginal.puntosAcopio);

  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const [errores, setErrores] = useState({});

  const huboIntentoCambioContrasena =
    contrasenaActual.trim() !== "" || nuevaContrasena.trim() !== "";

  const hayCambiosReales =
    nombreUsuario.trim() !== usuarioOriginal.nombreUsuario ||
    fotoPerfil !== usuarioOriginal.fotoPerfil ||
    JSON.stringify(puntosAcopio) !== JSON.stringify(usuarioOriginal.puntosAcopio) ||
    huboIntentoCambioContrasena;

  function notificarCambios() {
    onCambiosChange?.(hayCambiosReales);
  }

  function manejarCambioNombre(evento) {
    setNombreUsuario(evento.target.value);
    notificarCambios();
  }

  function manejarSeleccionFoto(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;
    setFotoPerfil(URL.createObjectURL(archivo));
    notificarCambios();
  }

  function manejarEliminarFoto() {
    setFotoPerfil(null);
    notificarCambios();
  }

  function manejarAbrirPuntosAcopio() {
    onAbrirPuntosAcopio?.(puntosAcopio, (nuevosPuntos) => {
      setPuntosAcopio(nuevosPuntos);
      notificarCambios();
    });
  }

  async function validarYObtenerDatos() {
    const nuevosErrores = {};

    if (nombreUsuario.trim() === "") {
      nuevosErrores.nombreUsuario = "El nombre de usuario no puede quedar vacío.";
    }

    if (huboIntentoCambioContrasena) {
      if (contrasenaActual.trim() === "") {
        nuevosErrores.contrasenaActual = "Ingresa tu contraseña actual.";
      }
      if (nuevaContrasena.trim() === "") {
        nuevosErrores.nuevaContrasena = "Ingresa la nueva contraseña.";
      }

      if (!nuevosErrores.contrasenaActual && !nuevosErrores.nuevaContrasena) {
        const { valida } = await validarContrasenaActual(contrasenaActual);
        if (!valida) {
          nuevosErrores.contrasenaActual = "La contraseña actual es incorrecta.";
        }
      }
    }

    setErrores(nuevosErrores);

    const esValido = Object.keys(nuevosErrores).length === 0;
    if (!esValido) {
      return { esValido: false };
    }

    return {
      esValido: true,
      datos: {
        nombreUsuario: nombreUsuario.trim(),
        fotoPerfil,
        puntosAcopio,
        ...(huboIntentoCambioContrasena ? { nuevaContrasena } : {}),
      },
    };
  }

  useImperativeHandle(ref, () => ({ validarYObtenerDatos, hayCambiosReales }));

  return (
    <div className={estilos.formulario}>
      <div className={estilos.contenedorFoto}>
        <label className={estilos.foto}>
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Foto de perfil" className={estilos.imagenFoto} />
          ) : (
            <span className={estilos.fotoPlaceholder} aria-hidden="true" />
          )}
          <input
            type="file"
            accept="image/*"
            className={estilos.inputArchivo}
            onChange={manejarSeleccionFoto}
          />
          <span className={estilos.iconoCamara} aria-hidden="true" />
        </label>
        {fotoPerfil && (
          <button type="button" className={estilos.botonEliminarFoto} onClick={manejarEliminarFoto}>
            Eliminar foto
          </button>
        )}
      </div>

      <label className={estilos.campo}>
        <span>Nombre de usuario *</span>
        <input
          type="text"
          value={nombreUsuario}
          onChange={manejarCambioNombre}
          className={estilos.input}
        />
        {errores.nombreUsuario && <span className={estilos.error}>{errores.nombreUsuario}</span>}
      </label>

      <label className={estilos.campo}>
        <span>Correo Electrónico</span>
        <input type="text" value={usuarioOriginal.correo} disabled className={estilos.input} />
      </label>

      <label className={estilos.campo}>
        <span>Rol</span>
        <input type="text" value={usuarioOriginal.rol} disabled className={estilos.input} />
      </label>

      <label className={estilos.campo}>
        <span>Ingresa contraseña actual</span>
        <input
          type="password"
          value={contrasenaActual}
          onChange={(e) => {
            setContrasenaActual(e.target.value);
            notificarCambios();
          }}
          className={estilos.input}
        />
        {errores.contrasenaActual && <span className={estilos.error}>{errores.contrasenaActual}</span>}
      </label>

      <label className={estilos.campo}>
        <span>Ingresa nueva contraseña</span>
        <input
          type="password"
          value={nuevaContrasena}
          onChange={(e) => {
            setNuevaContrasena(e.target.value);
            notificarCambios();
          }}
          className={estilos.input}
        />
        {errores.nuevaContrasena && <span className={estilos.error}>{errores.nuevaContrasena}</span>}
      </label>

      <div className={estilos.campo}>
        <span>Selecciona punto de acopio de entrega y recogida de prendas</span>
        <button type="button" className={estilos.botonPuntosAcopio} onClick={manejarAbrirPuntosAcopio}>
          Seleccionar puntos de acopio
        </button>
      </div>
    </div>
  );
});

export default FormularioEditarPerfil;
