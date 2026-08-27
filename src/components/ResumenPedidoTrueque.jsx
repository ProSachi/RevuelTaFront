import { formatearMoneda } from '../utils/formatoMoneda'
import './ResumenPedidoTrueque.css'

const TarjetaPrenda = ({ etiqueta, prenda }) => (
  <div className="rpt-item-card">
    <div className="rpt-item-image-box">
      {prenda.imagen ? (
        <img src={prenda.imagen} alt={prenda.nombre} className="rpt-item-img" />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 15l-5-5-11 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
    <div>
      <p className="rpt-item-label">{etiqueta}</p>
      <p className="rpt-item-title">{prenda.nombre}</p>
      <p className="rpt-item-price">{formatearMoneda(prenda.valor)}</p>
      <p className="rpt-item-details">
        {prenda.marca} · {prenda.talla}
      </p>
      <p className="rpt-item-user">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {prenda.usuario}
      </p>
    </div>
  </div>
)

const ResumenPedidoTrueque = ({ id, fechaRealizacion, tipo, estado, prendaPropia, prendaRecibida }) => (
  <section className="rpt-section">
    <div className="rpt-header">
      <div>
        <h2 className="rpt-header-title">Pedido #{id}</h2>
        <p className="rpt-header-subtitle">Realizado el {fechaRealizacion}</p>
        <p className="rpt-header-subtitle">
          Tipo de pedido: <span className="rpt-header-highlight">{tipo}</span>
        </p>
      </div>
      <span className="rpt-status-badge">{estado}</span>
    </div>

    <div className="rpt-exchange-grid">
      <TarjetaPrenda etiqueta="Tu prenda" prenda={prendaPropia} />
      <span className="rpt-exchange-symbol">⇄</span>
      <TarjetaPrenda etiqueta="Prenda que recibes" prenda={prendaRecibida} />
    </div>
  </section>
)

export default ResumenPedidoTrueque