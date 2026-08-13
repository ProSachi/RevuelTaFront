import { formatoMoneda } from './formatoMoneda.js'

export default function ResumenPedido({ subtotal, envio, descuento, total, deshabilitado, onContinuar }) {
  return (
    <aside className="resumen-pedido">
      <h2>Resumen del pedido</h2>

      <dl>
        <div className="resumen-pedido__fila">
          <dt>Subtotal</dt>
          <dd>{formatoMoneda(subtotal)}</dd>
        </div>
        <div className="resumen-pedido__fila">
          <dt>Envío</dt>
          <dd>{formatoMoneda(envio)}</dd>
        </div>
        {descuento > 0 && (
          <div className="resumen-pedido__fila resumen-pedido__fila--descuento">
            <dt>Descuento</dt>
            <dd>-{formatoMoneda(descuento)}</dd>
          </div>
        )}
        <div className="resumen-pedido__fila resumen-pedido__total">
          <dt>Total</dt>
          <dd>{formatoMoneda(total)}</dd>
        </div>
      </dl>

      <button type="button" className="btn-continuar" disabled={deshabilitado} onClick={onContinuar}>
        Continuar al pago
      </button>
    </aside>
  )
}
