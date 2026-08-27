import { useEffect, useRef, useState } from "react";
import GaleriaImagenesPrenda from "../GaleriaImagenesPrenda/GaleriaImagenesPrenda";
import FormularioEditarPrenda from "../FormularioEditarPrenda/FormularioEditarPrenda";
import { actualizarPrenda } from "../../../services/prendaService";
import estilos from "./VentanaModalEditarPrendaPublicada.module.css";

export default function VentanaModalEditarPrendaPublicada({ prendaOriginal, onCerrar, onConfirmar }) {
  const formularioRef = useRef(null);
  const [imagenes, setImagenes] = useState(prendaOriginal.imagenes);
  const [datosFormulario, setDatosFormulario] = useState(prendaOriginal);
  const [enviando, setEnviando] = useState(false);

  const hayCambiosFormulario = ["nombrePrenda","marca","talla","categoria","precio","estadoPrenda","cantidadDisponible"]
    .some(c => String(datosFormulario[c]) !== String(prendaOriginal[c]));
  const hayCambiosImagenes = JSON.stringify(imagenes) !== JSON.stringify(prendaOriginal.imagenes);
  const hayCambiosReales = hayCambiosFormulario || hayCambiosImagenes;

  useEffect(() => {
    const cerrarConEscape = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [onCerrar]);

  async function aceptar() {
    if (!hayCambiosReales || enviando) return;
    setEnviando(true);
    const resultado = formularioRef.current.validarYObtenerDatos();
    if (!resultado.esValido) { setEnviando(false); return; }
    if (imagenes.length > 5) { window.alert("La prenda no puede tener más de 5 imágenes."); setEnviando(false); return; }

    const respuesta = await actualizarPrenda({ ...resultado.datos, imagenes });
    setEnviando(false);
    if (respuesta.exito) {
      window.alert("Prenda actualizada correctamente.");
      onConfirmar(respuesta.prenda);
    }
  }

  return (
    <div className={estilos.overlay} role="dialog" aria-modal="true" aria-labelledby="titulo-editar-prenda" onClick={onCerrar}>
      <div className={estilos.modal} onClick={(e)=>e.stopPropagation()}>
        <header className={estilos.header}>
          <h2 id="titulo-editar-prenda">Editar prenda publicada</h2>
          <button type="button" className={estilos.cerrar} onClick={onCerrar} aria-label="Cerrar">×</button>
        </header>
        <GaleriaImagenesPrenda imagenes={imagenes} onChange={setImagenes} />
        <FormularioEditarPrenda ref={formularioRef} prendaOriginal={prendaOriginal} onChange={setDatosFormulario} />
        <footer className={estilos.acciones}>
          <button type="button" className={estilos.cancelar} onClick={onCerrar}>Cancelar</button>
          <button type="button" className={estilos.aceptar} disabled={!hayCambiosReales || enviando} onClick={aceptar}>
            {enviando ? "Guardando..." : "Aceptar Cambios"}
          </button>
        </footer>
      </div>
    </div>
  );
}
