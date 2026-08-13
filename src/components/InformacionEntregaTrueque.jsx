import { formatearMoneda } from '../utils/formatoMoneda'

const BloqueEntrega = ({ titulo, entrega }) => (
  <div className="flex-1 rounded-2xl border border-line bg-paper p-6">
    <h3 className="mb-4 font-display text-lg text-ink">{titulo}</h3>

    <div className="flex flex-col gap-4">
      {entrega.puntoAcopio && (
        <div className="flex gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-ink/50">
            <path
              d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-ink">Punto de entrega</p>
            <p className="text-sm text-ink/60">{entrega.puntoAcopio}</p>
          </div>
        </div>
      )}

      {entrega.transportista && (
        <div className="flex gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-ink/50">
            <rect x="2" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 10h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="6.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-ink">Transportista asignado</p>
            <p className="text-sm text-ink/60">{entrega.transportista}</p>
          </div>
        </div>
      )}

      {typeof entrega.costoEnvio === 'number' && (
        <div className="flex gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-ink/50">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v10M9.5 9.3c0-1 1-1.8 2.5-1.8s2.5.7 2.5 1.7-1 1.4-2.5 1.8-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.8 2.5-1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-ink">Costo de envío</p>
            <p className="text-sm text-ink/60">{formatearMoneda(entrega.costoEnvio)}</p>
          </div>
        </div>
      )}
    </div>
  </div>
)

const InformacionEntregaTrueque = ({ entregaPropia, entregaContraparte, nombreContraparte }) => (
  <section className="flex flex-col gap-4 md:flex-row">
    <BloqueEntrega titulo="Tu entrega" entrega={entregaPropia} />
    <BloqueEntrega titulo={`Entrega de ${nombreContraparte}`} entrega={entregaContraparte} />
  </section>
)

export default InformacionEntregaTrueque
