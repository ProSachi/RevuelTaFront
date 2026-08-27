import { IconoMovimiento } from './IconosHistorialPuntos.jsx';
import { formatearFechaCompleta } from '../utils/formatearFecha.js';


export const ListadoHistorialPuntos = ({ movimientos = [] }) => {
  if (movimientos.length === 0) {
    return (
      <div className="listado-historial listado-historial-vacio">
        <p>Aún no tienes movimientos de puntos.</p>
      </div>
    );
  }

  return (
    <div className="listado-historial">
      {movimientos.map((movimiento) => (
        <div className="registro-historial" key={movimiento.id}>
          <div className="registro-info">
            <IconoMovimiento tipo={movimiento.tipo} />
            <div className="registro-texto">
              <p className="registro-motivo">{movimiento.motivo}</p>
              <p className="registro-fecha">{formatearFechaCompleta(movimiento.fecha)}</p>
            </div>
          </div>
          <span className="registro-puntos">+ {movimiento.puntos} pts</span>
        </div>
      ))}
    </div>
  );
};
