import { useState, useRef } from "react";
import styles from "./GaleriaCargaImagenes.module.css";

const GaleriaCargaImagenes = ({ imagenes = [], onCambiarImagenes = () => {} }) => {
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef(null);

  const agregarArchivos = (archivosNuevos) => {
    const permitidos = ["image/jpeg", "image/png", "image/webp"];
    const archivosValidos = Array.from(archivosNuevos).filter((archivo) =>
      permitidos.includes(archivo.type)
    );

    const disponibles = 5 - imagenes.length;
    if (disponibles <= 0) return;

    const seleccionados = archivosValidos.slice(0, disponibles);

    const listaNuevas = seleccionados.map((archivo) => ({
      id: Date.now() + Math.random(),
      archivo: archivo,
      url: URL.createObjectURL(archivo)
    }));

    onCambiarImagenes([...imagenes, ...listaNuevas]);
  };

  const handleSeleccionar = (e) => {
    if (e.target.files) {
      agregarArchivos(e.target.files);
      e.target.value = "";
    }
  };

  const handleEliminar = (id) => {
    const filtradas = imagenes.filter((img) => img.id !== id);
    onCambiarImagenes(filtradas);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setArrastrando(true);
  };

  const handleDragLeave = () => {
    setArrastrando(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setArrastrando(false);
    if (e.dataTransfer.files) {
      agregarArchivos(e.dataTransfer.files);
    }
  };

  const abrirBuscador = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.galeriaContenedor}>
      <input
        type="file"
        ref={inputRef}
        className={styles.inputOculto}
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleSeleccionar}
      />

      {imagenes.length === 0 ? (
        <div
          className={`${styles.zonaArrastre} ${arrastrando ? styles.zonaArrastreActiva : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={abrirBuscador}
        >
          <div className={styles.iconoSubida}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h3 className={styles.tituloZona}>Agrega fotos de tu prenda</h3>
          <p className={styles.descripcionZona}>
            Sube imágenes de alta calidad muestra lo increíble que es tu producto
          </p>
          <button
            type="button"
            className={styles.btnSeleccionar}
            onClick={(e) => {
              e.stopPropagation();
              abrirBuscador();
            }}
          >
            Seleccionar Imágenes
          </button>
          <span className={styles.textoOpcional}>O arrastra y suelta tus imágenes aquí</span>
          <span className={styles.formatosAceptados}>Formato: JPG, PNG, WEBP - Máximo 5 imágenes</span>
        </div>
      ) : (
        <div className={styles.grillaPrevisualizaciones}>
          {imagenes.map((img) => (
            <div key={img.id} className={styles.tarjetaImagen}>
              <img src={img.url} alt="Previsualización" className={styles.imagenPreview} />
              <button
                type="button"
                className={styles.btnEliminar}
                onClick={() => handleEliminar(img.id)}
              >
                &times;
              </button>
            </div>
          ))}

          {imagenes.length < 5 && (
            <button
              type="button"
              className={styles.tarjetaAgregarMas}
              onClick={abrirBuscador}
            >
              <span className={styles.iconoMas}>+</span>
              <span>Agregar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GaleriaCargaImagenes;
