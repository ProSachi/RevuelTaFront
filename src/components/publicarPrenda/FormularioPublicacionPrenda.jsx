import styles from "./FormularioPublicacionPrenda.module.css";

const tallasDisponibles = ["XS", "S", "M", "L", "XL", "XXL", "Única"];
const categoriasDisponibles = [
  "Camisas y Camisetas",
  "Pantalones y Jeans",
  "Chaquetas y Abrigos",
  "Vestidos y Faldas",
  "Calzado",
  "Bolsos y Accesorios"
];
const estadosDisponibles = [
  "Nuevo con etiqueta",
  "Como nuevo",
  "Buen estado",
  "Usado con detalles"
];

const FormularioPublicacionPrenda = ({
  datosPrenda = {
    nombrePrenda: "",
    marca: "",
    talla: "",
    categoria: "",
    precio: "",
    estadoPrenda: "",
    cantidadDisponible: 1
  },
  onCambiarCampo = () => {}
}) => {
  return (
    <div className={styles.formularioCampos}>
      <div className={styles.grillaDosColumnas}>
        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Nombre de la prenda<span className={styles.asterisco}>*</span>
          </label>
          <input
            type="text"
            className={styles.inputTexto}
            placeholder="Ej. Pantalón elegante clásico"
            value={datosPrenda.nombrePrenda || ""}
            onChange={(e) => onCambiarCampo("nombrePrenda", e.target.value)}
          />
        </div>

        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Marca<span className={styles.asterisco}>*</span>
          </label>
          <input
            type="text"
            className={styles.inputTexto}
            placeholder="Ej. Americanino"
            value={datosPrenda.marca || ""}
            onChange={(e) => onCambiarCampo("marca", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grillaDosColumnas}>
        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Talla<span className={styles.asterisco}>*</span>
          </label>
          <select
            className={styles.selectCampo}
            value={datosPrenda.talla || ""}
            onChange={(e) => onCambiarCampo("talla", e.target.value)}
          >
            <option value="">Selecciona la talla</option>
            {tallasDisponibles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Categoría<span className={styles.asterisco}>*</span>
          </label>
          <select
            className={styles.selectCampo}
            value={datosPrenda.categoria || ""}
            onChange={(e) => onCambiarCampo("categoria", e.target.value)}
          >
            <option value="">Selecciona la categoría</option>
            {categoriasDisponibles.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.grillaDosColumnas}>
        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Precio<span className={styles.asterisco}>*</span>
          </label>
          <div className={styles.contenedorPrecio}>
            <span className={styles.simboloPrecio}>$</span>
            <input
              type="number"
              className={styles.inputPrecio}
              placeholder="Ej. 100000"
              value={datosPrenda.precio || ""}
              onChange={(e) => onCambiarCampo("precio", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className={styles.campoGrupo}>
          <label className={styles.labelCampo}>
            Estado de la prenda<span className={styles.asterisco}>*</span>
          </label>
          <select
            className={styles.selectCampo}
            value={datosPrenda.estadoPrenda || ""}
            onChange={(e) => onCambiarCampo("estadoPrenda", e.target.value)}
          >
            <option value="">Selecciona el estado</option>
            {estadosDisponibles.map((est) => (
              <option key={est} value={est}>
                {est}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.campoGrupoCorto}>
        <label className={styles.labelCampo}>
          Cantidad disponible<span className={styles.asterisco}>*</span>
        </label>
        <span className={styles.subtituloCampo}>¿Cuántas unidades tienes disponibles?</span>
        <input
          type="number"
          className={styles.inputTexto}
          value={datosPrenda.cantidadDisponible}
          onChange={(e) => onCambiarCampo("cantidadDisponible", Number(e.target.value))}
          min="1"
        />
      </div>
    </div>
  );
};

export default FormularioPublicacionPrenda;
