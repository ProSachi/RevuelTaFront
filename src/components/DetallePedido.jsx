import { obtenerPedidoPorId } from '../data/pedidosTrueque'
import ResumenPedidoTrueque from './ResumenPedidoTrueque'
import InformacionEntregaTrueque from './InformacionEntregaTrueque'
import ResumenEconomicoTrueque from './ResumenEconomicoTrueque'
import './DetallePedido.css'

const DetallePedido = ({ pedidoId, onVolver, onRastrearEnvio }) => {
  const pedido = obtenerPedidoPorId(pedidoId)

  if (!pedido) {
    return (
      <main className="dp-main">
        <p className="dp-empty-text">No encontramos información para este pedido.</p>
        <button onClick={onVolver} className="dp-empty-back-btn">
          Volver a Mis Pedidos
        </button>
      </main>
    )
  }

  return (
    <main className="dp-main dp-container">
      <h1 className="dp-title">Detalle del pedido</h1>

      {pedido.tipo === 'Trueque' ? (
        <>
          <ResumenPedidoTrueque
            id={pedido.id}
            fechaRealizacion={pedido.fechaRealizacion}
            tipo={pedido.tipo}
            estado={pedido.estado}
            prendaPropia={pedido.prendaPropia}
            prendaRecibida={pedido.prendaRecibida}
          />

          <InformacionEntregaTrueque
            entregaPropia={pedido.entregaPropia}
            entregaContraparte={pedido.entregaContraparte}
            nombreContraparte={pedido.prendaRecibida.usuario}
          />

          <ResumenEconomicoTrueque
            valorPrendaPropia={pedido.prendaPropia.valor}
            valorPrendaRecibida={pedido.prendaRecibida.valor}
            diferenciaTrueque={pedido.diferenciaTrueque}
            costoEnvio={pedido.costoEnvio}
            totalPedido={pedido.totalPedido}
          />
        </>
      ) : (
        <p className="dp-empty-text">
          El detalle para pedidos tipo {pedido.tipo} todavía no está definido.
        </p>
      )}

      <div className="dp-footer-actions">
        <button onClick={onVolver} className="dp-btn-secondary">
          ← Volver a Mis Pedidos
        </button>
        <button onClick={() => onRastrearEnvio(pedido.id)} className="dp-btn-primary">
          Rastrear envío
        </button>
      </div>
    </main>
  )
}

export default DetallePedido