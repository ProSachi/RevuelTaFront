import styles from './AccionesDetalleTrueque.module.css'

export default function AccionesDetalleTrueque({
  trueque,
  modoContraoferta,
  onActivarModoContraoferta,
  onCancelarModoContraoferta,
  onAceptarPropuesta,
  onRechazarPropuesta,
  onEnviarContraoferta,
  onCerrar,
}) {
  if (!trueque) return null

  const esContraofertaRecibida = trueque.estado === 'en_proceso' && trueque.enviadoPor !== 'yo'

  if (modoContraoferta) {
    return (
      <div className={styles.acciones}>
        <div className={styles.accionesFila}>
          <button
            type="button"
            className={styles.btnSecundario}
            onClick={onCancelarModoContraoferta}
          >
            Volver
          </button>
          <button
            type="button"
            className={styles.btnPrincipal}
            onClick={onEnviarContraoferta}
          >
            Enviar contraoferta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.acciones}>
      {esContraofertaRecibida ? (
        <div className={styles.accionesColumna}>
          <button
            type="button"
            className={styles.btnPrincipal}
            onClick={onAceptarPropuesta}
          >
            Aceptar propuesta
          </button>
          <button
            type="button"
            className={styles.btnSecundario}
            onClick={onActivarModoContraoferta}
          >
            Contraoferta
          </button>
          <button
            type="button"
            className={styles.btnPeligroOutline}
            onClick={onRechazarPropuesta}
          >
            Rechazar propuesta
          </button>
        </div>
      ) : (
        <div className={styles.accionesFila}>
          <button type="button" className={styles.btnSecundario} onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  )
}
// cambios de accion dettale