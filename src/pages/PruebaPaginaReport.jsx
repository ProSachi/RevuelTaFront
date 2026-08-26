import { useState } from "react";
import VentanaModalReportarVendedor from "../components/pages/VentanaModalReportarVendedor/VentanaModalReportarVendedor";

const PruebaPaginaReport = () => {
  const [modalAbierto, setModalAbierto] = useState(true);
  const [reporteEnviado, setReporteEnviado] = useState(null);

  const onCerrar = () => {
    setModalAbierto(false);
  };

  const onEnviarReporte = (datos) => {
    console.log("Reporte enviado:", datos);
    setReporteEnviado(datos);
    setModalAbierto(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setModalAbierto(true)}>
        Abrir Modal de Reporte
      </button>

      {modalAbierto && (
        <VentanaModalReportarVendedor
          vendedor={{ nombre: "Carlos Pérez" }}
          onCerrar={onCerrar}
          onEnviarReporte={onEnviarReporte}
        />
      )}
    </div>
  );
};

export default PruebaPaginaReport;