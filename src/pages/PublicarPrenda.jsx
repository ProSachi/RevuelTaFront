import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GaleriaCargaImagenes from "../components/publicarPrenda/GaleriaCargaImagenes";
import FormularioPublicacionPrenda from "../components/publicarPrenda/FormularioPublicacionPrenda";
import styles from "./PublicarPrenda.module.css";

const PublicarPrenda = ({ onPublicar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [imagenes, setImagenes] = useState([]);
  const [datosPrenda, setDatosPrenda] = useState({
    nombrePrenda: "",
    marca: "",
    talla: "",
    categoria: "",
    precio: "",
    estadoPrenda: "",
    cantidadDisponible: 1
  });
  const [error, setError] = useState("");

  const rutaOrigen = location.state?.from || -1;

  const handleCambiarCampo = (campo, valor) => {
    setDatosPrenda({
      ...datosPrenda,
      [campo]: valor
    });
    setError("");
  };

  const handleCancelar = () => {
    navigate(rutaOrigen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nombrePrenda,
      marca,
      talla,
      categoria,
      precio,
      estadoPrenda,
      cantidadDisponible
    } = datosPrenda;

    if (
      !nombrePrenda.trim() ||
      !marca.trim() ||
      !talla.trim() ||
      !categoria.trim() ||
      !String(precio).trim() ||
      !estadoPrenda.trim() ||
      !String(cantidadDisponible).trim() ||
      Number(cantidadDisponible) < 1
    ) {
      setError("Todos los campos marcados con asterisco (*) son obligatorios.");
      alert("Por favor completa todos los campos obligatorios antes de continuar.");
      return;
    }

    setError("");

    const nuevaPublicacion = {
      ...datosPrenda,
      precio: Number(precio),
      cantidadDisponible: Number(cantidadDisponible),
      imagenes
    };

    if (onPublicar) {
      onPublicar(nuevaPublicacion);
    } else {
      alert("¡Prenda validada y lista para publicar!");
    }
  };

  return (
    <div className={styles.paginaContenedor}>
      <div className={styles.tarjetaPublicacion}>
        <h1 className={styles.tituloPrincipal}>Publica tu prenda</h1>

        {error && <div className={styles.alertaError}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.formularioPrincipal}>
          <div className={styles.seccionBloque}>
            <GaleriaCargaImagenes
              imagenes={imagenes}
              onCambiarImagenes={setImagenes}
            />
          </div>

          <div className={styles.seccionBloque}>
            <FormularioPublicacionPrenda
              datosPrenda={datosPrenda}
              onCambiarCampo={handleCambiarCampo}
            />
          </div>

          <div className={styles.accionesFooter}>
            <button
              type="button"
              className={styles.btnCancelar}
              onClick={handleCancelar}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btnPublicar}>
              Publicar prenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarPrenda;
