import HistorialTrueque from '../HistorialTrueque/HistorialTrueque.jsx'
import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './TarjetaTrueque.module.css'

const TIPOS = {
  intercambio_y_diferencia: 'Intercambio de prenda y pagar diferencia',
  solo_intercambio: 'Solo intercambio de prenda',
  pago: 'Propuesta de pago',
}

const ESTADO_LABEL = {
  pendiente: 'Pendiente de respuesta',
  en_proceso: 'Contraoferta recibida',
  finalizado: 'Finalizado',
  rechazado: 'Rechazado',
}

const ESTADO_CLASE = {
  pendiente: styles.estadoPendiente,
  en_proceso: styles.estadoEnProceso,
  finalizado: styles.estadoFinalizado,
  rechazado: styles.estadoRechazado,
}

const calcularTiempoTranscurrido = (fecha) => {
  const dias = Math.max(0, Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000))
  if (dias === 0) return 'Hoy'
  if (dias === 1) return 'Hace 1 día'
  return `Hace ${dias} días`
}

export default function TarjetaTrueque({
  trueque,
  onVerDetalles,
  onCancelarPropuesta,
  onNuevaPropuesta,
  onAceptarPropuesta,
  onRechazarPropuesta,
}) {
  const {
    id,
    estado,
    tipo,
    enviadoPor,
    dirigidoA,
    prendaPropia,
    prendaOfrecida,
    diferencia,
    valorPropuesto,
    fechaCreacion,
    motivoRechazo,
    historial,
  } = trueque

  const esMio = enviadoPor === 'yo'
  const encabezadoPersona = esMio
    ? estado === 'rechazado'
      ? `Propuesta a ${dirigidoA} · Rechazada`
      : `Propuesta enviada a ${dirigidoA}`
    : `Contraoferta recibida de ${enviadoPor}`

  return (
    <article className={styles.tarjeta}>
      <div className={styles.cabecera}>
        <div>
          <span className={`${styles.estadoBadge} ${ESTADO_CLASE[estado] || ''}`}>
            {ESTADO_LABEL[estado] || estado}
          </span>
          <p className={styles.personaEncabezado}>{encabezadoPersona}</p>
        </div>
        <span className={styles.tiempoTranscurrido}>
          {calcularTiempoTranscurrido(fechaCreacion)}
        </span>
      </div>

      <div className={styles.prendasComparativa}>
        <div className={styles.prendaColumna}>
          <span className={styles.etiquetaPrenda}>Quieres</span>
          <strong className={styles.nombrePrenda}>
            {prendaPropia?.nombre ?? 'Producto objetivo'}
          </strong>
          {prendaPropia?.valor != null && (
            <span className={styles.precioPrenda}>{formatoMoneda(prendaPropia.valor)}</span>
          )}
        </div>

        <div className={styles.iconoIntercambio} aria-hidden="true">
          ⇄
        </div>

        <div className={styles.prendaColumna}>
          <span className={styles.etiquetaPrenda}>Tú ofreces</span>
          {tipo === 'pago' ? (
            <strong className={styles.nombrePrenda}>{formatoMoneda(valorPropuesto)}</strong>
          ) : (
            <>
              <strong className={styles.nombrePrenda}>
                {prendaOfrecida?.nombre ?? 'Prenda ofrecida'}
              </strong>
              {prendaOfrecida?.valor != null && (
                <span className={styles.precioPrenda}>
                  {formatoMoneda(prendaOfrecida.valor)}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.infoNegociacion}>
        <span className={styles.tipoTrueque}>{TIPOS[tipo] || tipo}</span>

        {tipo === 'solo_intercambio' && <p>Intercambio de prendas sin diferencia económica.</p>}
        {tipo === 'pago' && <p>Propuesta de pago por {formatoMoneda(valorPropuesto)}.</p>}
        {tipo === 'intercambio_y_diferencia' && diferencia !== 0 && (
          <p className={styles.diferenciaPagar}>
            {diferencia > 0
              ? `Debes pagar ${formatoMoneda(diferencia)} de diferencia.`
              : `Debes recibir ${formatoMoneda(Math.abs(diferencia))} de diferencia.`}
          </p>
        )}

        {estado === 'rechazado' && motivoRechazo && (
          <p className={styles.motivoRechazo}>Motivo de rechazo: {motivoRechazo}</p>
        )}
      </div>

      <div className={styles.barraAcciones}>
        <button
          type="button"
          className={styles.btnSecundario}
          onClick={() => onVerDetalles(trueque)}
        >
          Ver detalles
        </button>

        {estado === 'pendiente' && esMio && (
          <button
            type="button"
            className={styles.btnPeligroOutline}
            onClick={() => onCancelarPropuesta(id)}
          >
            Cancelar propuesta
          </button>
        )}

        {estado === 'rechazado' && (
          <button
            type="button"
            className={styles.btnPrincipal}
            onClick={() => onNuevaPropuesta(trueque)}
          >
            Proponer otro trueque
          </button>
        )}

        {estado === 'en_proceso' && !esMio && (
          <>
            <button
              type="button"
              className={styles.btnPrincipal}
              onClick={() => onAceptarPropuesta(trueque)}
            >
              Aceptar propuesta
            </button>
            <button
              type="button"
              className={styles.btnPeligroOutline}
              onClick={() => onRechazarPropuesta(trueque)}
            >
              Rechazar propuesta
            </button>
          </>
        )}
      </div>

      <HistorialTrueque historial={historial} />
    </article>
  )
}
