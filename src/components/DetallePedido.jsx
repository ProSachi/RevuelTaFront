import { obtenerPedidoPorId } from '../data/pedidosTrueque'
import ResumenPedidoTrueque from './ResumenPedidoTrueque'
import InformacionEntregaTrueque from './InformacionEntregaTrueque'
import ResumenEconomicoTrueque from './ResumenEconomicoTrueque'

const DetallePedido = ({ pedidoId, onVolver, onRastrearEnvio }) => {
  const pedido = obtenerPedidoPorId(pedidoId)

  if (!pedido) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-ink/60">No encontramos información para este pedido.</p>
        <button onClick={onVolver} className="mt-4 text-pine underline">
          Volver a Mis Pedidos
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <h1 className="font-display text-3xl text-ink">Detalle del pedido</h1>

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
        <p className="text-ink/60">
          El detalle para pedidos tipo {pedido.tipo} todavía no está definido.
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={onVolver}
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:border-pine hover:text-pine"
        >
          ← Volver a Mis Pedidos
        </button>
        <button
          onClick={() => onRastrearEnvio(pedido.id)}
          className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-pine"
        >
          Rastrear envío
        </button>
      </div>
    </main>
  )
}

export default DetallePedido
