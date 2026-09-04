import { motivos as listaMotivos } from '../../../data/motivosReporte';
import styles from './FormularioReporteVendedor.module.css';

const FormularioReporteVendedor = ({
  motivos = listaMotivos,
  motivoSeleccionado = "1",
  onCambiarMotivo,
  comentario = "",
  onCambiarComentario,
  prioridad = "MEDIA",
  onCambiarPrioridad,
  garments = [],
  prendaSeleccionada,
  onSeleccionarPrenda,
  cargandoPrendas = false,
  errorPrendas = false,
  errores = {}
}) => {

  return (
    <div className={styles.formularioContenedor}>
      <div className={styles.prendaSeccion}>
        <h3 className={styles.seccionTitulo}>Prenda relacionada</h3>
        <p className={styles.subtitulo}>
          Selecciona la prenda que deseas reportar:
        </p>

        {cargandoPrendas && (
          <div className={styles.prendaEstadoCarga}>Cargando prendas...</div>
        )}

        {errorPrendas && (
          <div className={styles.prendaSinCompras}>
            No fue posible cargar las prendas relacionadas.
          </div>
        )}

        {!cargandoPrendas && !errorPrendas && garments.length === 0 && (
          <div className={styles.prendaSinCompras}>
            No hay prendas relacionadas entre este vendedor y tu usuario.
          </div>
        )}

        {!cargandoPrendas && !errorPrendas && garments.length > 0 && (
          <div className={styles.prendasLista}>
            {garments.map((garment) => {
              const garmentId = garment.id || garment.Id;
              const garmentTitle = garment.titulo || garment.nombrePrenda || "Prenda sin nombre";
              const isSelected = (prendaSeleccionada?.id || prendaSeleccionada?.Id) === garmentId;

              return (
                <label
                  key={garmentId}
                  className={`${styles.prendaCard} ${isSelected ? styles.prendaCardSeleccionada : ""}`}
                >
                  <input
                    type="radio"
                    name="prenda"
                    className={styles.radioInput}
                    checked={isSelected}
                    onChange={() => onSeleccionarPrenda(garment)}
                  />
                  <div className={styles.prendaImagenContenedor}>
                    {garment.avatar || garment.imagen ? (
                      <img
                        src={garment.avatar || garment.imagen}
                        alt={garmentTitle}
                        className={styles.prendaImagen}
                      />
                    ) : (
                      <span className={styles.prendaPlaceholder} aria-hidden="true">+</span>
                    )}
                  </div>
                  <div className={styles.prendaInfo}>
                    <span className={styles.prendaTitulo}>{garmentTitle}</span>
                    <span className={styles.prendaMeta}>
                      <span>{garment.talla || "Talla no disponible"}</span>
                      {garment.precio !== undefined && (
                        <span className={styles.prendaPrecio}>
                          ${Number(garment.precio).toLocaleString("es-CO")}
                        </span>
                      )}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
        {errores.prenda && (
          <p className={styles.mensajeError} role="alert">{errores.prenda}</p>
        )}
      </div>

      <div>
        <h3 className={styles.seccionTitulo}>Motivo del reporte</h3>
        <p className={styles.subtitulo}>Selecciona la razón que mejor describa la situación:</p>
      </div>

      <div className={styles.opcionesLista}>
        {motivos.map((motivo) => {
          const estaSeleccionado = motivoSeleccionado === motivo.id;
          return (
            <label
              key={motivo.id}
              className={`${styles.opcionCard} ${estaSeleccionado ? styles.opcionCardSeleccionada : ''}`}
            >
              <input
                type="radio"
                name="motivo"
                className={styles.radioInput}
                checked={estaSeleccionado}
                onChange={() => onCambiarMotivo && onCambiarMotivo(motivo.id)}
              />
              <div className={styles.opcionInfo}>
                <span className={styles.opcionTitulo}>{motivo.titulo}</span>
                {motivo.descripcion && (
                  <span className={styles.opcionDescripcion}>{motivo.descripcion}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      <div className={styles.comentarioSeccion}>
        <label className={styles.comentarioLabel}>
          <span>Comentario o detalles adicionales</span>
          <span className={styles.badgeRequerido}>Obligatorio</span>
        </label>
        <textarea
          className={styles.textareaComentario}
          value={comentario}
          onChange={(e) => onCambiarComentario && onCambiarComentario(e.target.value)}
          placeholder="Cuéntanos más detalles sobre lo ocurrido para poder investigar adecuadamente..."
          rows={3}
        />
        {errores.comentario && (
          <p className={styles.mensajeError} role="alert">{errores.comentario}</p>
        )}
      </div>

      <div className={styles.prioridadSeccion}>
        <label className={styles.comentarioLabel}>Prioridad</label>
        <div className={styles.prioridadOpciones}>
          {["BAJA", "MEDIA", "ALTA"].map((nivel) => (
            <button
              key={nivel}
              type="button"
              className={`${styles.prioridadBtn} ${prioridad === nivel ? styles.prioridadBtnActivo : ""}`}
              onClick={() => onCambiarPrioridad(nivel)}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>
      {errores.usuario && (
        <p className={styles.mensajeError} role="alert">{errores.usuario}</p>
      )}
    </div>
  );
};

export default FormularioReporteVendedor;