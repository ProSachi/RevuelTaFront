import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import FormularioReporteVendedor from "../FormularioReportarVendedor/FormularioReporteVendedor";
import styles from "./VentanaModalReportarVendedor.module.css";
import { useConnectedUser } from "../../../context/ConnectedUser.context";
import { reportServices } from "../../../services/reportServices/resportServices";
import { garmentsServices } from "../../../services/garmentsServices/garmentsServices";
import { motivos as listaMotivos } from "../../../data/motivosReporte";

const VentanaModalReportarVendedor = () => {
  const { connectedUser } = useConnectedUser();
  const navigate = useNavigate();
  const { id, myProfile, vendedor, onReporteCreado } = useOutletContext() || {};
  const currentUserId = connectedUser?.id
    || connectedUser?.Id
    || connectedUser?.idUsuario
    || connectedUser?.id_usuario;

  const [motivoSeleccionado, setMotivoSeleccionado] = useState("1");
  const [comentario, setComentario] = useState("");
  const [prioridad, setPrioridad] = useState("MEDIA");
  const [garments, setGarments] = useState([]);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [cargandoPrendas, setCargandoPrendas] = useState(false);
  const [errorPrendas, setErrorPrendas] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});

  const onCerrar = () => {
    navigate("..");
  };

  useEffect(() => {

    if (myProfile) {
      return;
    }

    const fetchGarments = async () => {
      try {
        setCargandoPrendas(true);
        setErrorPrendas(false);
        const data = await garmentsServices.getGarmentsForUserIdAndBuyerId(id, currentUserId);
        const lista = Array.isArray(data)
          ? data
          : (data?.content || (data && typeof data === 'object' && (data.id || data.Id) ? [data] : []));
        setGarments(lista);
        setPrendaSeleccionada(null);
      } catch (error) {
        console.error("Error al cargar prendas para el reporte:", error);
        setErrorPrendas(true);
        setGarments([]);
      } finally {
        setCargandoPrendas(false);
      }
    };

    if (id && currentUserId) {
      fetchGarments();
    }
  }, [id, connectedUser, currentUserId, myProfile]);

  const handleEnviarReporte = async () => {
    const nuevosErrores = {};
    const idPrenda = prendaSeleccionada?.id || prendaSeleccionada?.Id;

    if (!idPrenda) {
      nuevosErrores.prenda = "Selecciona la prenda sobre la cual deseas hacer el reporte.";
    }

    if (!comentario.trim()) {
      nuevosErrores.comentario = "La descripción o comentario es obligatorio.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});

    const motivoObj = listaMotivos.find((m) => m.id === motivoSeleccionado);
    const motivoTexto = motivoObj ? motivoObj.titulo : motivoSeleccionado;

    try {
      setEnviando(true);

      const reportData = {
        motivo: motivoTexto,
        descripcion: comentario.trim(),
        estado: "PENDIENTE",
        prioridad: prioridad,
        fecha: new Date().toISOString().split("T")[0],
        resuelto: false,
        idReportante: currentUserId,
        idPrenda
      };

      const response = await reportServices.postReport(reportData);
      console.log("Petición de reporte exitosa:", response);
      await onReporteCreado?.();
      onCerrar();
    } catch (error) {
      console.log("Petición de reporte no exitosa:", error);
      const errorMsg =
        error.response?.data?.mensaje ||
        error.response?.data?.message ||
        "Hubo un error al enviar el reporte. Intenta nuevamente más tarde.";
      setErrores({ envio: errorMsg });
    } finally {
      setEnviando(false);
    }
  };

  const errorUsuario = myProfile ? "No puedes reportarte a ti mismo." : errores.usuario;

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
              Reportar a{" "}
              <span className={styles.nombreVendedor}>
                {vendedor?.nombre || "Vendedor"}
              </span>
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
            prioridad={prioridad}
            onCambiarPrioridad={setPrioridad}
            garments={garments}
            prendaSeleccionada={prendaSeleccionada}
            cargandoPrendas={cargandoPrendas}
            errorPrendas={errorPrendas}
            errores={{ ...errores, usuario: errorUsuario }}
            onCambiarComentario={(valor) => {
              setComentario(valor);
              if (errores.comentario) {
                setErrores((erroresActuales) => ({ ...erroresActuales, comentario: undefined }));
              }
            }}
            onSeleccionarPrenda={(prenda) => {
              setPrendaSeleccionada(prenda);
              if (errores.prenda) {
                setErrores((erroresActuales) => ({ ...erroresActuales, prenda: undefined }));
              }
            }}
          />
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.btnCancelar}
            onClick={onCerrar}
            type="button"
            disabled={enviando}
          >
            Cancelar
          </button>
          <button
            className={styles.btnEnviar}
            onClick={handleEnviarReporte}
            type="button"
            disabled={enviando || cargandoPrendas || garments.length === 0}
          >
            {enviando ? "Enviando..." : "Enviar Reporte"}
          </button>
          {errores.envio && (
            <p className={styles.mensajeError} role="alert">{errores.envio}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentanaModalReportarVendedor;
