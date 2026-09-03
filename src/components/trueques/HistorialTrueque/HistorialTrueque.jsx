import { useState } from 'react'
import styles from './HistorialTrueque.module.css'

const ICONOS_EVENTO = {
  'Propuesta enviada': '✈️',
  'Propuesta de pago enviada': '💰',
  'Contraoferta recibida': '⇆',
  'Contraoferta enviada': '⇆',
  'Propuesta aceptada': '✔️',
  'Trueque finalizado': '🏁',
  'Propuesta rechazada': '✕',
  'Cancelada por el usuario': '🚫',
}

export default function HistorialTrueque({ historial = [] }) {
  const [abierto, setAbierto] = useState(false)

  if (!historial || historial.length === 0) return null

  return (
    <div className={styles.contenedor}>
      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
      >
        <span>Historial de Trueque</span>
        <span className={styles.iconoToggle}>{abierto ? '−' : '+'}</span>
      </button>

      {abierto && (
        <div className={styles.timeline}>
          {historial.map((evento, index) => {
            const fechaObj = new Date(evento.fecha)
            const fechaFormateada = fechaObj.toLocaleDateString('es-CO', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            const horaFormateada = fechaObj.toLocaleTimeString('es-CO', {
              hour: '2-digit',
              minute: '2-digit',
            })

            const icono = ICONOS_EVENTO[evento.estado] || '●'

            return (
              <div className={styles.eventoItem} key={`${evento.fecha}-${index}`}>
                <div className={styles.eventoIconoWrapper} aria-hidden="true">
                  {icono}
                </div>
                <div className={styles.eventoDetalle}>
                  <div className={styles.eventoTexto}>
                    <strong className={styles.eventoTitulo}>{evento.estado}</strong>
                    {evento.detalle && (
                      <span className={styles.eventoDescripcion}>{evento.detalle}</span>
                    )}
                    <span className={styles.eventoUsuario}>
                      👤 {evento.usuario === 'yo' ? 'Tú' : evento.usuario}
                    </span>
                  </div>
                  <div className={styles.eventoFecha}>
                    <span>📅 {fechaFormateada}</span>
                    <span>🕒 {horaFormateada}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
