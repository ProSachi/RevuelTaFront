import { formatearMoneda } from '../../utils/formatoMoneda'
import './ResumenEconomicoTrueque.css'

const FilaResumen = ({ etiqueta, valor }) => (
  <div className="ret-row">
    <span className="ret-label">{etiqueta}</span>
    <span className="ret-value">{formatearMoneda(valor)}</span>
  </div>
)

const ResumenEconomicoTrueque = ({
  valorPrendaPropia,
  valorPrendaRecibida,
  diferenciaTrueque,
  costoEnvio,
  totalPedido,
}) => (
  <section className="ret-card">
    <h3 className="ret-title">Resumen del trueque</h3>

    <div className="ret-list">
      <FilaResumen etiqueta="Valor de tu prenda" valor={valorPrendaPropia} />
      <FilaResumen etiqueta="Valor de la prenda que recibes" valor={valorPrendaRecibida} />
      <FilaResumen etiqueta="Diferencia del trueque" valor={diferenciaTrueque} />
      <FilaResumen etiqueta="Costo del envío" valor={costoEnvio} />
    </div>

    <div className="ret-total-row">
      <span className="ret-total-text">Total del pedido</span>
      <span className="ret-total-text">{formatearMoneda(totalPedido)}</span>
    </div>
  </section>
)

export default ResumenEconomicoTrueque