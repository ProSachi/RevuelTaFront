import { useState } from 'react';
import { motivos as listaMotivos } from '../../../data/motivosReporte';
import styles from './FormularioReporteVendedor.module.css';

const FormularioReporteVendedor = ({
  motivos = listaMotivos,
  motivoSeleccionado: propMotivo,
  onCambiarMotivo,
  comentario: propComentario,
  onCambiarComentario
}) => {
  const [internalMotivo, setInternalMotivo] = useState("1");
  const [internalComentario, setInternalComentario] = useState("");

  const motivoActual = propMotivo !== undefined ? propMotivo : internalMotivo;
  const comentarioActual = propComentario !== undefined ? propComentario : internalComentario;

  const handleCambioMotivo = (id) => {
    if (onCambiarMotivo) {
      onCambiarMotivo(id);
    } else {
      setInternalMotivo(id);
    }
  };

  const handleCambioComentario = (val) => {
    if (onCambiarComentario) {
      onCambiarComentario(val);
    } else {
      setInternalComentario(val);
    }
  };

  return (
    <div className={styles.formularioContenedor}>
      <div>
        <h3 className={styles.seccionTitulo}>Motivo del reporte</h3>
        <p className={styles.subtitulo}>Selecciona la razón que mejor describa la situación:</p>
      </div>

      <div className={styles.opcionesLista}>
        {motivos.map((motivo) => {
          const estaSeleccionado = motivoActual === motivo.id;
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
                onChange={() => handleCambioMotivo(motivo.id)}
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
          value={comentarioActual}
          onChange={(e) => handleCambioComentario(e.target.value)}
          placeholder="Cuéntanos más detalles sobre lo ocurrido para poder investigar adecuadamente..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default FormularioReporteVendedor;