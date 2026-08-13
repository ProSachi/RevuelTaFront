import { useEffect, useMemo, useState } from 'react'

const TIPOS = {
  intercambio_y_diferencia: 'Intercambio de prenda y pagar diferencia',
  solo_intercambio: 'Solo intercambio de prenda',
  pago: 'Propuesta de pago',
}

const ESTADOS = {
  pendiente: 'Pendiente',
  en_proceso: 'En proceso',
  finalizado: 'Finalizado',
  rechazado: 'Rechazado',
}

const formatear = (valor) => Number(valor ?? 0).toLocaleString('es-CO')

export default function VentanaModalDetalleTrueque({ trueque, onClose, onActualizar }) {
  const [modoContraoferta, setModoContraoferta] = useState(false)
  const [tipo, setTipo] = useState('intercambio_y_diferencia')
  const [diferencia, setDiferencia] = useState(0)
  const [valorPropuesto, setValorPropuesto] = useState(0)
  const [prendaOfrecida, setPrendaOfrecida] = useState('Bolso de cuero')
  const [segundos, setSegundos] = useState(900)

  useEffect(() => {
    if (!trueque) return
    setModoContraoferta(false)
    setTipo(trueque.tipo)
    setDiferencia(trueque.diferencia ?? 0)
    setValorPropuesto(trueque.valorPropuesto ?? 0)
    setPrendaOfrecida(trueque.prendaOfrecida?.nombre ?? 'Bolso de cuero')
    setSegundos(900)
  }, [trueque])

  useEffect(() => {
    if (!trueque || segundos <= 0) return undefined
    const timer = setInterval(() => setSegundos((actual) => actual - 1), 1000)
    return () => clearInterval(timer)
  }, [trueque, segundos])

  const tiempo = useMemo(() => {
    const minutos = Math.floor(segundos / 60).toString().padStart(2, '0')
    const segundosRestantes = (segundos % 60).toString().padStart(2, '0')
    return `${minutos}:${segundosRestantes}`
  }, [segundos])

  if (!trueque) return null

  const aceptar = () => {
    onActualizar({
      ...trueque,
      estado: 'finalizado',
      historial: [...(trueque.historial ?? []), { estado: 'Propuesta aceptada', usuario: 'yo', fecha: new Date().toISOString() }],
    })
  }

  const rechazar = () => {
    onActualizar({
      ...trueque,
      estado: 'rechazado',
      motivoRechazo: 'Propuesta rechazada por el usuario.',
      historial: [...(trueque.historial ?? []), { estado: 'Propuesta rechazada', usuario: 'yo', fecha: new Date().toISOString() }],
    })
  }

  const enviarContraoferta = () => {
    if (tipo !== 'pago' && !prendaOfrecida.trim()) return
    const nuevoHistorial = [
      ...(trueque.historial ?? []),
      { estado: 'Contraoferta enviada', usuario: 'yo', fecha: new Date().toISOString() },
    ]
    onActualizar({
      ...trueque,
      estado: 'en_proceso',
      tipo,
      diferencia: tipo === 'intercambio_y_diferencia' ? Number(diferencia) : 0,
      valorPropuesto: tipo === 'pago' ? Number(valorPropuesto) : null,
      prendaOfrecida: tipo === 'pago' ? null : { id: Date.now(), nombre: prendaOfrecida, valor: 0 },
      historial: nuevoHistorial,
    })
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="titulo-detalle-trueque">
      <div className="modal modal--trueque">
        <button type="button" className="modal__cerrar" onClick={onClose} aria-label="Cerrar">×</button>
        <p className="eyebrow">NEGOCIACIÓN</p>
        <h2 id="titulo-detalle-trueque">Detalle Trueque</h2>

        <div className="detalle-modal__estado">
          <span className={`estado-tag estado-tag--${trueque.estado}`}>{segundos === 0 ? 'Cancelado por expiración' : ESTADOS[trueque.estado]}</span>
          <strong>{tiempo}</strong>
        </div>

        {!modoContraoferta ? (
          <>
            <p className="detalle-modal__tipo">{TIPOS[trueque.tipo]}</p>
            <div className="detalle-modal__ofertas">
              <div><span>Quieres esto</span><strong>{trueque.prendaPropia?.nombre}</strong></div>
              <div className="intercambio-icono">⇄</div>
              <div>
                <span>Tú ofreces</span>
                <strong>{trueque.tipo === 'pago' ? `$${formatear(trueque.valorPropuesto)}` : trueque.prendaOfrecida?.nombre}</strong>
              </div>
            </div>
            {trueque.tipo === 'intercambio_y_diferencia' && (
              <p className="detalle-modal__diferencia">
                {trueque.diferencia > 0 ? `Diferencia a pagar: $${formatear(trueque.diferencia)}` : trueque.diferencia < 0 ? `Diferencia a recibir: $${formatear(Math.abs(trueque.diferencia))}` : 'Sin diferencia económica.'}
              </p>
            )}
            {trueque.estado === 'rechazado' && trueque.motivoRechazo && <p className="rechazo">{trueque.motivoRechazo}</p>}

            {trueque.estado === 'en_proceso' && trueque.enviadoPor !== 'yo' ? (
              <div className="modal__acciones modal__acciones--columna">
                <button type="button" className="btn-principal" onClick={aceptar}>Aceptar propuesta</button>
                <button type="button" className="btn-secundario" onClick={() => setModoContraoferta(true)}>Contraoferta</button>
                <button type="button" className="btn-peligro-outline" onClick={rechazar}>Rechazar propuesta</button>
              </div>
            ) : (
              <div className="modal__acciones">
                <button type="button" className="btn-secundario" onClick={onClose}>Cerrar</button>
              </div>
            )}
          </>
        ) : (
          <form className="contraoferta-form" onSubmit={(event) => { event.preventDefault(); enviarContraoferta() }}>
            <h3>Nueva contraoferta</h3>
            <label>
              Tipo de trueque
              <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
                <option value="intercambio_y_diferencia">Intercambio de prenda y pagar diferencia</option>
                <option value="solo_intercambio">Solo intercambio de prenda</option>
                <option value="pago">Propuesta de pago</option>
              </select>
            </label>
            {tipo !== 'pago' && (
              <label>
                Prenda que ofreces
                <select value={prendaOfrecida} onChange={(event) => setPrendaOfrecida(event.target.value)}>
                  <option>Bolso de cuero</option>
                  <option>Falda plisada</option>
                  <option>Camisa a cuadros</option>
                </select>
              </label>
            )}
            {tipo === 'intercambio_y_diferencia' && (
              <label>
                Diferencia
                <input type="number" min="0" value={diferencia} onChange={(event) => setDiferencia(event.target.value)} />
              </label>
            )}
            {tipo === 'pago' && (
              <label>
                Valor que deseas ofrecer
                <input type="number" min="0" value={valorPropuesto} onChange={(event) => setValorPropuesto(event.target.value)} />
              </label>
            )}
            <div className="modal__acciones">
              <button type="button" className="btn-secundario" onClick={() => setModoContraoferta(false)}>Volver</button>
              <button type="submit" className="btn-principal">Enviar contraoferta</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
