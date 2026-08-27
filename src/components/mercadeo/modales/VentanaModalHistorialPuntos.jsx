import { historialPuntos } from '../../../data/historialMock';
import ResumenPuntosActuales from './historial/ResumenPuntosActuales';
import ListadoHistorialPuntos from './historial/ListadoHistorialPuntos';


const VentanaModalHistorialPuntos = ({ saldoActual, onCerrar }) => {
    return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
            <div className="modal-header border-0">
            <h5 className="modal-title fw-bold" style={{ color: 'var(--ink)' }}>Historial de puntos</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
            </div>

            <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
            <ResumenPuntosActuales saldoActual={saldoActual} />
            <ListadoHistorialPuntos historial={historialPuntos} />
            </div>

            <div className="modal-footer border-0 justify-content-center">
            <button
                type="button"
                className="btn fw-semibold px-4"
                style={{ backgroundColor: 'var(--paper-2)', color: 'var(--ink)' }}
                onClick={onCerrar}
            >
                Cerrar
            </button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default VentanaModalHistorialPuntos;
