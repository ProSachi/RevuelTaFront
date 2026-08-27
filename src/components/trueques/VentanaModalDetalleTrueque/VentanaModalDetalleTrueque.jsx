import { useEffect, useMemo, useState } from 'react'
import ResumenTruequeModal from '../ResumenTruequeModal/ResumenTruequeModal.jsx'
import AccionesDetalleTrueque from '../AccionesDetalleTrueque/AccionesDetalleTrueque.jsx'
import styles from './VentanaModalDetalleTrueque.module.css'

const ESTADOS_LABEL = {
  pendiente: 'Pendiente',
  en_proceso: 'En proceso',
  finalizado: 'Finalizado',
  rechazado: 'Rechazado',
}

const ESTADOS_CLASE = {
  pendiente: styles.estadoPendiente,
  en_proceso: styles.estadoEnProceso,
  finalizado: styles.estadoFinalizado,
  rechazado: styles.estadoRechazado,
}

// MKT-TR02 — Ventana Modal Detalle Trueque
// Responsabilidad: Contenedor principal de la modal, muestra el título, coordina el estado
// y tiempo de expiración del trueque, y distribuye la información y acciones a los subcomponentes.
export default function VentanaModalDetalleTrueque({ trueque, onClose, onActualizar }) {
  const [modoContraoferta, setModoContraoferta] = useState(false)
  const [tipoContraoferta, setTipoContraoferta] = useState(trueque?.tipo || 'intercambio_y_diferencia')
  const [prendaOfrecidaContraoferta, setPrendaOfrecidaContraoferta] = useState(
    trueque?.prendaOfrecida?.nombre || 'Bolso de cuero'
  )
  const [diferenciaContraoferta, setDiferenciaContraoferta] = useState(trueque?.diferencia ?? 0)
  const [valorPagoContraoferta, setValorPagoContraoferta] = useState(trueque?.valorPropuesto ?? 0)
  const [mensajeContraoferta, setMensajeContraoferta] = useState('')
  const [segundosRestantes, setSegundosRestantes] = useState(900)

  useEffect(() => {
    if (!trueque || segundosRestantes <= 0) return undefined
    const timer = setInterval(() => {
      setSegundosRestantes((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [trueque, segundosRestantes])

  const tiempoFormateado = useMemo(() => {
    const horas = Math.floor(segundosRestantes / 3600)
      .toString()
      .padStart(2, '0')
    const minutos = Math.floor((segundosRestantes % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const segs = (segundosRestantes % 60).toString().padStart(2, '0')
    return `${horas}h : ${minutos}m : ${segs}s`
  }, [segundosRestantes])

  if (!trueque) return null

  const handleAceptar = () => {
    const fechaActual = new Date().toISOString()
    onActualizar({
      ...trueque,
      estado: 'finalizado',
      historial: [
        ...(trueque.historial ?? []),
        {
          estado: 'Propuesta aceptada',
          usuario: 'yo',
          fecha: fechaActual,
          detalle: 'Has aceptado la propuesta recibida.',
        },
        {
          estado: 'Trueque finalizado',
          usuario: 'Sistema',
          fecha: fechaActual,
          detalle: 'Intercambio completado con éxito.',
        },
      ],
    })
  }

  const handleRechazar = () => {
    const fechaActual = new Date().toISOString()
    onActualizar({
      ...trueque,
      estado: 'rechazado',
      motivoRechazo: 'Propuesta rechazada por el usuario.',
      historial: [
        ...(trueque.historial ?? []),
        {
          estado: 'Propuesta rechazada',
          usuario: 'yo',
          fecha: fechaActual,
          detalle: 'Has declinado la propuesta.',
        },
      ],
    })
  }

  const handleEnviarContraoferta = () => {
    const fechaActual = new Date().toISOString()
    const nuevoHistorial = [
      ...(trueque.historial ?? []),
      {
        estado: 'Contraoferta enviada',
        usuario: 'yo',
        fecha: fechaActual,
        detalle:
          tipoContraoferta === 'pago'
            ? `Ofreciste pago de $${Number(valorPagoContraoferta).toLocaleString('es-CO')}`
            : `Ofreciste ${prendaOfrecidaContraoferta}${
                diferenciaContraoferta !== 0
                  ? ` + $${Number(diferenciaContraoferta).toLocaleString('es-CO')}`
                  : ''
              }`,
      },
    ]

    onActualizar({
      ...trueque,
      estado: 'en_proceso',
      tipo: tipoContraoferta,
      diferencia:
        tipoContraoferta === 'intercambio_y_diferencia' ? Number(diferenciaContraoferta) : 0,
      valorPropuesto: tipoContraoferta === 'pago' ? Number(valorPagoContraoferta) : null,
      prendaOfrecida:
        tipoContraoferta === 'pago'
          ? null
          : { id: Date.now(), nombre: prendaOfrecidaContraoferta, valor: 0 },
      historial: nuevoHistorial,
    })
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-detalle"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.cerrar}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <p className={styles.eyebrow}>MARKETPLACE · DETALLE DE NEGOCIACIÓN</p>
        <h2 id="titulo-modal-detalle" className={styles.titulo}>
          Detalle Trueque
        </h2>

        <div className={styles.barraEstadoExpira}>
          <span
            className={`${styles.estadoBadge} ${ESTADOS_CLASE[trueque.estado] || styles.estadoPendiente}`}
          >
            {segundosRestantes === 0
              ? 'Cancelado por expiración'
              : ESTADOS_LABEL[trueque.estado] || trueque.estado}
          </span>
          <span className={styles.temporizador}>
            ⏳ {segundosRestantes === 0 ? 'Expirado' : `Expira en: ${tiempoFormateado}`}
          </span>
        </div>

        <ResumenTruequeModal
          trueque={trueque}
          modoContraoferta={modoContraoferta}
          tipoContraoferta={tipoContraoferta}
          onChangeTipoContraoferta={setTipoContraoferta}
          prendaOfrecidaContraoferta={prendaOfrecidaContraoferta}
          onChangePrendaOfrecidaContraoferta={setPrendaOfrecidaContraoferta}
          diferenciaContraoferta={diferenciaContraoferta}
          onChangeDiferenciaContraoferta={setDiferenciaContraoferta}
          valorPagoContraoferta={valorPagoContraoferta}
          onChangeValorPagoContraoferta={setValorPagoContraoferta}
          mensajeContraoferta={mensajeContraoferta}
          onChangeMensajeContraoferta={setMensajeContraoferta}
        />

        <AccionesDetalleTrueque
          trueque={trueque}
          modoContraoferta={modoContraoferta}
          onActivarModoContraoferta={() => setModoContraoferta(true)}
          onCancelarModoContraoferta={() => setModoContraoferta(false)}
          onAceptarPropuesta={handleAceptar}
          onRechazarPropuesta={handleRechazar}
          onEnviarContraoferta={handleEnviarContraoferta}
          onCerrar={onClose}
        />
      </div>
    </div>
  )
}
