import { useState } from "react";
import FormularioReporteVendedor from "../FormularioReportarVendedor/FormularioReporteVendedor";
import styles from "./VentanaModalReportarVendedor.module.css";

const VentanaModalReportarVendedor = ({
  vendedor = { nombre: "Carlos Pérez" },
  onCerrar = () => {},
  onEnviarReporte = () => {}
}) => {
  const [motivoSeleccionado, setMotivoSeleccionado] = useState("1");
  const [comentario, setComentario] = useState("");

  const validarComentario = async () => {
    // Criterio de aceptación: comentario obligatorio
    if (!comentario.trim()) {
      alert("El comentario es obligatorio");
      return;
    }
    if (onEnviarReporte) {
      await onEnviarReporte({
        motivoId: motivoSeleccionado,
        comentario: comentario.trim()
      });
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onCerrar}>
      <div
        className={styles.modalContenedor}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerInfo}>
            <span className={styles.eyebrow}>Seguridad & Comunidad</span>
            <h2 id="modal-titulo" className={styles.titulo}>
              Reportar a <span className={styles.nombreVendedor}>{vendedor?.nombre || "Vendedor"}</span>
            </h2>
          </div>
          <button
            className={styles.btnCerrar}
            onClick={onCerrar}
            aria-label="Cerrar modal"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <FormularioReporteVendedor
            motivoSeleccionado={motivoSeleccionado}
            onCambiarMotivo={setMotivoSeleccionado}
            comentario={comentario}
            onCambiarComentario={setComentario}
          />
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.btnCancelar}
            onClick={onCerrar}
            type="button"
          >
            Cancelar
          </button>
          <button
            className={styles.btnEnviar}
            onClick={validarComentario}
            type="button"
          >
            Enviar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentanaModalReportarVendedor;
