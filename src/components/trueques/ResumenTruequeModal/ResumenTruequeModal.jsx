import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './ResumenTruequeModal.module.css'

const PRENDAS_DISPONIBLES = [
  { id: 201, nombre: 'Bolso de cuero', valor: 38000 },
  { id: 202, nombre: 'Falda plisada', valor: 36000 },
  { id: 203, nombre: 'Camisa a cuadros', valor: 28000 },
  { id: 204, nombre: 'Chaqueta de jean vintage', valor: 45000 },
]

const TITULOS_TIPO = {
  intercambio_y_diferencia: 'Intercambio de prenda y pagar diferencia',
  solo_intercambio: 'Solo intercambio de prenda',
  pago: 'Propuesta de pago',
}

export default function ResumenTruequeModal({
  trueque,
  modoContraoferta,
  tipoContraoferta,
  onChangeTipoContraoferta,
  prendaOfrecidaContraoferta,
  onChangePrendaOfrecidaContraoferta,
  diferenciaContraoferta,
  onChangeDiferenciaContraoferta,
  valorPagoContraoferta,
  onChangeValorPagoContraoferta,
  mensajeContraoferta,
  onChangeMensajeContraoferta,
}) {
  if (!trueque) return null

  const {
    tipo,
    prendaPropia,
    prendaOfrecida,
    diferencia,
    valorPropuesto,
    motivoRechazo,
    estado,
    dirigidoA,
    enviadoPor,
  } = trueque

  // En modo contraoferta mostramos la prenda/valor seleccionados en el formulario en vivo
  const prendaOfrecidaActual = modoContraoferta
    ? PRENDAS_DISPONIBLES.find((p) => p.nombre === prendaOfrecidaContraoferta) || {
        nombre: prendaOfrecidaContraoferta,
        valor: 0,
      }
    : prendaOfrecida

  const tipoActual = modoContraoferta ? tipoContraoferta : tipo

  return (
    <div className={styles.contenedor}>
      <p className={styles.tipoTruequeTitulo}>
        {TITULOS_TIPO[tipoActual] || tipoActual}
      </p>

      <div className={styles.ofertasGrid}>
        <div className={styles.ofertaCaja}>
          <span className={styles.etiqueta}>Quieres esto</span>
          <strong className={styles.nombrePrenda}>{prendaPropia?.nombre}</strong>
          {prendaPropia?.valor != null && (
            <span className={styles.precioPrenda}>{formatoMoneda(prendaPropia.valor)}</span>
          )}
        </div>

        <div className={styles.iconoIntercambio} aria-hidden="true">
          ⇄
        </div>

        <div className={styles.ofertaCaja}>
          <span className={styles.etiqueta}>
            {modoContraoferta || enviadoPor === 'yo' ? 'Tú ofreces' : 'Te ofrecen esto'}
          </span>
          {tipoActual === 'pago' ? (
            <strong className={styles.nombrePrenda}>
              {formatoMoneda(modoContraoferta ? valorPagoContraoferta : valorPropuesto)}
            </strong>
          ) : (
            <>
              <strong className={styles.nombrePrenda}>
                {prendaOfrecidaActual?.nombre ?? 'Prenda ofrecida'}
              </strong>
              {prendaOfrecidaActual?.valor != null && (
                <span className={styles.precioPrenda}>
                  {formatoMoneda(prendaOfrecidaActual.valor)}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {!modoContraoferta ? (
        <>
          {tipo === 'intercambio_y_diferencia' && (
            <p className={styles.diferencia}>
              {diferencia > 0
                ? `Diferencia económica a pagar: ${formatoMoneda(diferencia)}`
                : diferencia < 0
                  ? `Diferencia económica a recibir: ${formatoMoneda(Math.abs(diferencia))}`
                  : 'Sin diferencia económica acordada.'}
            </p>
          )}

          {estado === 'rechazado' && motivoRechazo && (
            <p className={styles.motivoRechazo}>Motivo de rechazo: {motivoRechazo}</p>
          )}
        </>
      ) : (
        <div className={styles.formularioEdicion}>
          <h3 className={styles.subtituloEdicion}>Construir nueva contraoferta</h3>

          <div className={styles.campo}>
            <label htmlFor="tipo-contraoferta" className={styles.label}>
              Tipo de trueque *
            </label>
            <select
              id="tipo-contraoferta"
              className={styles.select}
              value={tipoContraoferta}
              onChange={(e) => onChangeTipoContraoferta(e.target.value)}
            >
              <option value="intercambio_y_diferencia">
                Intercambio de prenda y pagar diferencia
              </option>
              <option value="solo_intercambio">Solo intercambio de prenda</option>
              <option value="pago">Propuesta de pago</option>
            </select>
          </div>

          {tipoContraoferta !== 'pago' && (
            <div className={styles.campo}>
              <label htmlFor="prenda-contraoferta" className={styles.label}>
                Prenda que ofreces *
              </label>
              <select
                id="prenda-contraoferta"
                className={styles.select}
                value={prendaOfrecidaContraoferta}
                onChange={(e) => onChangePrendaOfrecidaContraoferta(e.target.value)}
              >
                {PRENDAS_DISPONIBLES.map((prenda) => (
                  <option key={prenda.id} value={prenda.nombre}>
                    {prenda.nombre} ({formatoMoneda(prenda.valor)})
                  </option>
                ))}
              </select>
            </div>
          )}

          {tipoContraoferta === 'intercambio_y_diferencia' && (
            <div className={styles.campo}>
              <label htmlFor="diferencia-contraoferta" className={styles.label}>
                Diferencia económica a pagar ($)
              </label>
              <input
                id="diferencia-contraoferta"
                type="number"
                min="0"
                step="1000"
                className={styles.input}
                value={diferenciaContraoferta}
                onChange={(e) => onChangeDiferenciaContraoferta(Number(e.target.value))}
              />
            </div>
          )}

          {tipoContraoferta === 'pago' && (
            <div className={styles.campo}>
              <label htmlFor="valor-pago-contraoferta" className={styles.label}>
                Valor que deseas ofrecer ($)
              </label>
              <input
                id="valor-pago-contraoferta"
                type="number"
                min="0"
                step="1000"
                className={styles.input}
                value={valorPagoContraoferta}
                onChange={(e) => onChangeValorPagoContraoferta(Number(e.target.value))}
              />
            </div>
          )}

          <div className={styles.campo}>
            <label htmlFor="mensaje-contraoferta" className={styles.label}>
              Mensaje para {enviadoPor === 'yo' ? dirigidoA : enviadoPor} (Opcional)
            </label>
            <textarea
              id="mensaje-contraoferta"
              className={styles.textarea}
              placeholder="Ej. Hola, te ofrezco esta prenda más la diferencia acordada..."
              value={mensajeContraoferta}
              onChange={(e) => onChangeMensajeContraoferta(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
