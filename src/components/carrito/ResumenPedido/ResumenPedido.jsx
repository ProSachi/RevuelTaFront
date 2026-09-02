import { useState } from 'react'
import { formatoMoneda } from '../../../utils/formatoMoneda.js'
import styles from './ResumenPedido.module.css'

const CUPONES_VALIDOS = {
  REVUELTA10: 0.1,
  DESCUENTO15: 0.15,
  BIENVENIDA: 5000,
}

export default function ResumenPedido({
  subtotal = 0,
  envio = 0,
  descuento = 0,
  total = 0,
  deshabilitado = false,
  onContinuar,
  onAplicarDescuento,
}) {
  const [codigo, setCodigo] = useState('')
  const [mensajeCupon, setMensajeCupon] = useState(null)

  const handleAplicarCupon = (e) => {
    e.preventDefault()
    const codigoLimpio = codigo.trim().toUpperCase()
    if (!codigoLimpio) {
      setMensajeCupon({ tipo: 'error', texto: 'Ingresa un código de descuento.' })
      return
    }

    const valorCupon = CUPONES_VALIDOS[codigoLimpio]
    if (valorCupon != null) {
      let descuentoCalculado = 0
      if (valorCupon < 1) {
        descuentoCalculado = Math.round(subtotal * valorCupon)
      } else {
        descuentoCalculado = valorCupon
      }

      if (onAplicarDescuento) {
        onAplicarDescuento(descuentoCalculado, codigoLimpio)
      }
      setMensajeCupon({ tipo: 'exito', texto: `Cupón "${codigoLimpio}" aplicado con éxito.` })
    } else {
      setMensajeCupon({ tipo: 'error', texto: 'El código ingresado no es válido o ha expirado.' })
    }
  }

  return (
    <aside className={styles.resumen} aria-labelledby="titulo-resumen-pedido">
      <h2 id="titulo-resumen-pedido" className={styles.titulo}>
        Resumen del pedido
      </h2>

      <dl className={styles.listaValores}>
        <div className={styles.fila}>
          <dt>Subtotal</dt>
          <dd>{formatoMoneda(subtotal)}</dd>
        </div>
        <div className={styles.fila}>
          <dt>Envío</dt>
          <dd>{formatoMoneda(envio)}</dd>
        </div>
        {descuento > 0 && (
          <div className={`${styles.fila} ${styles.filaDescuento}`}>
            <dt>Descuento</dt>
            <dd>-{formatoMoneda(descuento)}</dd>
          </div>
        )}
        <div className={`${styles.fila} ${styles.filaTotal}`}>
          <dt>Total</dt>
          <dd>{formatoMoneda(total)}</dd>
        </div>
      </dl>

      <div className={styles.seccionCupon}>
        <form className={styles.cuponForm} onSubmit={handleAplicarCupon}>
          <input
            type="text"
            className={styles.cuponInput}
            placeholder="Código de descuento"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value)
              if (mensajeCupon) setMensajeCupon(null)
            }}
            disabled={deshabilitado}
            aria-label="Código de descuento"
          />
          <button type="submit" className={styles.btnAplicar} disabled={deshabilitado}>
            Aplicar
          </button>
        </form>
        {mensajeCupon && (
          <div
            className={
              mensajeCupon.tipo === 'exito'
                ? styles.cuponMensajeExito
                : styles.cuponMensajeError
            }
          >
            {mensajeCupon.texto}
          </div>
        )}
      </div>

      <button
        type="button"
        className={styles.btnContinuar}
        disabled={deshabilitado}
        onClick={onContinuar}
      >
        Continuar al pago
      </button>

      <div className={styles.sellosConfianza}>
        <div className={styles.selloItem}>
          <span className={styles.selloIcono} aria-hidden="true">
            🔒
          </span>
          <span>Compra 100% verificada</span>
        </div>
        <div className={styles.selloItem}>
          <span className={styles.selloIcono} aria-hidden="true">
            📦
          </span>
          <span>Envío estimado: 3–5 días hábiles</span>
        </div>
      </div>
    </aside>
  )
}
