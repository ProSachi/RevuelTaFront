import { formatearMoneda } from '../utils/formatoMoneda'

const TarjetaPrenda = ({ etiqueta, prenda }) => (
  <div className="flex flex-1 gap-3">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-line bg-paper-2 text-ink/30">
      {prenda.imagen ? (
        <img src={prenda.imagen} alt={prenda.nombre} className="h-full w-full rounded-lg object-cover" />
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 15l-5-5-11 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-ink/50">{etiqueta}</p>
      <p className="font-display text-lg text-ink">{prenda.nombre}</p>
      <p className="font-semibold text-pine">{formatearMoneda(prenda.valor)}</p>
      <p className="text-sm text-ink/60">
        {prenda.marca} · {prenda.talla}
      </p>
      <p className="mt-1 flex items-center gap-1 text-sm text-ink/70">
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
  <section className="rounded-2xl border border-line bg-paper p-6">
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="font-display text-xl text-ink">Pedido #{id}</h2>
        <p className="text-sm text-ink/60">Realizado el {fechaRealizacion}</p>
        <p className="text-sm text-ink/60">
          Tipo de pedido: <span className="font-semibold text-ink">{tipo}</span>
        </p>
      </div>
      <span className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-paper">{estado}</span>
    </div>

    <div className="flex items-center gap-4 border-t border-line pt-5">
      <TarjetaPrenda etiqueta="Tu prenda" prenda={prendaPropia} />
      <span className="text-2xl text-moss">⇄</span>
      <TarjetaPrenda etiqueta="Prenda que recibes" prenda={prendaRecibida} />
    </div>
  </section>
)

export default ResumenPedidoTrueque
