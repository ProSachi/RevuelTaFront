import "../index.css";
import { ResumenPuntosActuales } from './ResumenPuntosActuales.jsx';
import { ListadoHistorialPuntos } from './ListadoHistorialPuntos.jsx';

export const VentanaModalHistorialPuntos = ({ saldoActual, movimientos, onCerrar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container modal-historial">

        <div className="modal-header">
          <h2>Historial de puntos</h2>
          <button className="btn-close" onClick={onCerrar}>X</button>
        </div>

        <ResumenPuntosActuales saldoActual={saldoActual} />

        <ListadoHistorialPuntos movimientos={movimientos} />

        <hr className="divider" />

        <div className="modal-actions modal-actions-centrado">
          <button className="btn-cerrar-historial" onClick={onCerrar}>Cerrar</button>
        </div>

      </div>
    </div>
  );
};
