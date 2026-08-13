import { useState } from 'react'
import VentanaModalDejarResena from './components/VentanaModalDejarResena'
import VentanaVerResenas from './components/VentanaVerResenas'
import DetallePedido from './components/DetallePedido'

const App = () => {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [verResenasAbierto, setVerResenasAbierto] = useState(false)
  const [pedidoResenado, setPedidoResenado] = useState(false)
  const pedidoId = '003'

  return (
    <main className="min-h-screen bg-paper">
      <section className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-xl border border-line bg-paper-2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg text-ink">Pedido #{pedidoId}</p>
              <p className="text-xs text-ink/50">Entregado · 2026-08-05</p>
            </div>
            <span className="rounded-full bg-ink px-3 py-1 text-xs text-paper">Entregado</span>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-ink/70">
            <span>Vestido rojo</span>
            <span>$90.000</span>
          </div>

          <div className="mt-5">
            {pedidoResenado ? (
              <button
                onClick={() => setVerResenasAbierto(true)}
                className="rounded-lg bg-moss px-4 py-2 text-sm font-medium text-paper hover:bg-pine"
              >
                Ver mi reseña
              </button>
            ) : (
              <button
                onClick={() => setModalAbierto(true)}
                className="rounded-lg bg-clay px-4 py-2 text-sm font-medium text-paper hover:bg-ink"
              >
                Dejar reseña
              </button>
            )}
          </div>
        </div>
      </section>

      {modalAbierto && (
        <VentanaModalDejarResena
          pedidoId={pedidoId}
          onCerrar={() => setModalAbierto(false)}
          onFlujoFinalizado={() => setPedidoResenado(true)}
        />
      )}

      {verResenasAbierto && (
        <VentanaVerResenas pedidoId={pedidoId} onCerrar={() => setVerResenasAbierto(false)} />
      )}

      <DetallePedido
        pedidoId="005"
        onVolver={() => {}}
        onRastrearEnvio={() => {}}
      />
    </main>
  )
}

export default App