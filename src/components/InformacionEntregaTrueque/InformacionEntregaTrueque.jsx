import { formatearMoneda } from '../../utils/formatoMoneda'
import './InformacionEntregaTrueque.css'

const BloqueEntrega = ({ titulo, entrega }) => (
  <div className="iet-card">
    <h3 className="iet-card-title">{titulo}</h3>

    <div className="iet-items-list">
      {entrega.puntoAcopio && (
        <div className="iet-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="iet-icon">
            <path
              d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <p className="iet-item-title">Punto de entrega</p>
            <p className="iet-item-desc">{entrega.puntoAcopio}</p>
          </div>
        </div>
      )}

      {entrega.transportista && (
        <div className="iet-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="iet-icon">
            <rect x="2" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="6.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <p className="iet-item-title">Transportista asignado</p>
            <p className="iet-item-desc">{entrega.transportista}</p>
          </div>
        </div>
      )}

      {typeof entrega.costoEnvio === 'number' && (
        <div className="iet-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="iet-icon">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v10M9.5 9.3c0-1 1-1.8 2.5-1.8s2.5.7 2.5 1.7-1 1.4-2.5 1.8-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.8 2.5-1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="iet-item-title">Costo de envío</p>
            <p className="iet-item-desc">{formatearMoneda(entrega.costoEnvio)}</p>
          </div>
        </div>
      )}
    </div>
  </div>
)

const InformacionEntregaTrueque = ({ entregaPropia, entregaContraparte, nombreContraparte }) => (
  <section className="iet-container">
    <BloqueEntrega titulo="Tu entrega" entrega={entregaPropia} />
    <BloqueEntrega titulo={`Entrega de ${nombreContraparte}`} entrega={entregaContraparte} />
  </section>
)

export default InformacionEntregaTrueque