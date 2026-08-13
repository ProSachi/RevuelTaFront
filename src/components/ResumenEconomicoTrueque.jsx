import { formatearMoneda } from '../utils/formatoMoneda'

const FilaResumen = ({ etiqueta, valor }) => (
  <div className="flex items-center justify-between py-2 text-sm">
    <span className="text-ink/60">{etiqueta}</span>
    <span className="font-medium text-ink">{formatearMoneda(valor)}</span>
  </div>
)

const ResumenEconomicoTrueque = ({
  valorPrendaPropia,
  valorPrendaRecibida,
  diferenciaTrueque,
  costoEnvio,
  totalPedido,
}) => (
  <section className="rounded-2xl border border-line bg-paper p-6">
    <h3 className="mb-3 font-display text-lg text-ink">Resumen del trueque</h3>

    <div className="divide-y divide-line/60">
      <FilaResumen etiqueta="Valor de tu prenda" valor={valorPrendaPropia} />
      <FilaResumen etiqueta="Valor de la prenda que recibes" valor={valorPrendaRecibida} />
      <FilaResumen etiqueta="Diferencia del trueque" valor={diferenciaTrueque} />
      <FilaResumen etiqueta="Costo del envío" valor={costoEnvio} />
    </div>

    <div className="mt-3 flex items-center justify-between border-t border-ink pt-3">
      <span className="font-display text-lg text-ink">Total del pedido</span>
      <span className="font-display text-lg text-ink">{formatearMoneda(totalPedido)}</span>
    </div>
  </section>
)

export default ResumenEconomicoTrueque
