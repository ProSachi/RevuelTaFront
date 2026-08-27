import { useRef } from "react";
import estilos from "./GaleriaImagenesPrenda.module.css";

export default function GaleriaImagenesPrenda({ imagenes, onChange }) {
  const inputRef = useRef(null);

  function agregarArchivos(evento) {
    const archivos = Array.from(evento.target.files || []);
    const disponibles = 5 - imagenes.length;
    const nuevos = archivos.slice(0, disponibles).map((archivo) => URL.createObjectURL(archivo));
    if (nuevos.length) onChange([...imagenes, ...nuevos]);
    evento.target.value = "";
  }

  function reemplazar(indice, evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;
    const copia = [...imagenes];
    copia[indice] = URL.createObjectURL(archivo);
    onChange(copia);
    evento.target.value = "";
  }

  function eliminar(indice) {
    onChange(imagenes.filter((_, i) => i !== indice));
  }

  return (
    <section className={estilos.seccion}>
      <div className={estilos.encabezado}>
        <div>
          <h3>Imágenes de la prenda</h3>
          <p>{imagenes.length}/5 imágenes</p>
        </div>
        {imagenes.length < 5 && (
          <>
            <button type="button" className={estilos.agregar} onClick={() => inputRef.current?.click()}>
              + Agregar
            </button>
            <input ref={inputRef} hidden type="file" accept="image/*" multiple onChange={agregarArchivos} />
          </>
        )}
      </div>

      {imagenes.length === 0 ? (
        <div className={estilos.vacio}>
          <strong>Sin imágenes registradas</strong>
          <span>Puedes cargar hasta 5 imágenes.</span>
        </div>
      ) : (
        <div className={estilos.grid}>
          {imagenes.map((imagen, indice) => (
            <div className={estilos.item} key={`${imagen}-${indice}`}>
              <img src={imagen} alt={`Vista ${indice + 1} de la prenda`} />
              <div className={estilos.controles}>
                <label className={estilos.reemplazar}>
                  Reemplazar
                  <input hidden type="file" accept="image/*" onChange={(e) => reemplazar(indice, e)} />
                </label>
                <button type="button" onClick={() => eliminar(indice)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {imagenes.length === 5 && <p className={estilos.maximo}>Máximo alcanzado: no puedes agregar más imágenes.</p>}
    </section>
  );
}
