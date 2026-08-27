import { useRef, useState } from "react";
import FormularioEditarPerfil from "../FormularioEditarPerfil/FormularioEditarPerfil";
import { actualizarPerfil } from "../../../../services/perfilService";
import estilos from "./VentanaModalEditarPerfil.module.css";

export default function VentanaModalEditarPerfil({
  usuarioOriginal,
  onCerrar,
  onConfirmar,
  onAbrirPuntosAcopio,
}) {
  const formularioRef = useRef(null);
  const [hayCambiosReales, setHayCambiosReales] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function manejarAceptarCambios() {
    if (!hayCambiosReales || enviando) return;

    setEnviando(true);
    const resultado = await formularioRef.current.validarYObtenerDatos();
    setEnviando(false);

    if (!resultado.esValido) {
      return;
    }

    const respuesta = await actualizarPerfil(resultado.datos);
    if (respuesta.exito) {
      window.alert("Perfil actualizado correctamente.");
      onConfirmar?.(respuesta.usuario);
    }
  }

  return (
    <div className={estilos.overlay} role="dialog" aria-modal="true" onClick={onCerrar}>
      <div className={estilos.modal} onClick={(evento) => evento.stopPropagation()}>
        <h2 className={estilos.titulo}>Actualizar información personal</h2>

        <div className={estilos.contenido}>
          <FormularioEditarPerfil
            ref={formularioRef}
            usuarioOriginal={usuarioOriginal}
            onCambiosChange={setHayCambiosReales}
            onAbrirPuntosAcopio={onAbrirPuntosAcopio}
          />
        </div>

        <div className={estilos.acciones}>
          <button type="button" className={estilos.botonCancelar} onClick={onCerrar}>
            Cancelar
          </button>
          <button
            type="button"
            className={estilos.botonAceptar}
            disabled={!hayCambiosReales || enviando}
            onClick={manejarAceptarCambios}
          >
            Aceptar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
