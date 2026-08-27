import { useMemo, useState } from 'react'
<<<<<<< HEAD
import { truequesMock } from '../data/truequesMock.js'
import VentanaModalDetalleTrueque from '../components/trueques/VentanaModalDetalleTrueque.jsx'
import './MisTrueques.css'

const ESTADOS = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'finalizado', label: 'Finalizados' },
  { value: 'rechazado', label: 'Rechazados' },
]

const TIPOS = {
  intercambio_y_diferencia: 'Intercambio de prenda y pagar diferencia',
  solo_intercambio: 'Solo intercambio de prenda',
  pago: 'Propuesta de pago',
}

const ESTADO_LABEL = {
  pendiente: 'Pendiente',
  en_proceso: 'En proceso',
  finalizado: 'Finalizado',
  rechazado: 'Rechazado',
}

const fechaCorta = (fecha) => new Intl.DateTimeFormat('es-CO', {
  day: '2-digit', month: '2-digit', year: 'numeric',
}).format(new Date(fecha))

const tiempoTranscurrido = (fecha) => {
  const dias = Math.max(0, Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000))
  if (dias === 0) return 'Hoy'
  if (dias === 1) return 'Hace 1 día'
  return `Hace ${dias} días`
}

=======
import ControlesTrueques from '../components/trueques/ControlesTrueques/ControlesTrueques.jsx'
import ListadoTrueques from '../components/trueques/ListadoTrueques/ListadoTrueques.jsx'
import VentanaModalDetalleTrueque from '../components/trueques/VentanaModalDetalleTrueque/VentanaModalDetalleTrueque.jsx'
import { truequesMock } from '../data/truequesMock.js'
import styles from './MisTrueques.module.css'

// MKT-TR01 — Mis Trueques
// Responsabilidad: Contenedor principal de la página, coordina los controles de consulta,
// filtros avanzados, listado reactivo y la ventana modal de negociación.
>>>>>>> feature/deibyvt
export default function MisTrueques() {
  const [trueques, setTrueques] = useState(truequesMock)
  const [estado, setEstado] = useState('todos')
  const [orden, setOrden] = useState('recientes')
  const [busqueda, setBusqueda] = useState('')
  const [periodo, setPeriodo] = useState('todos')
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
<<<<<<< HEAD
  const [historialAbierto, setHistorialAbierto] = useState({})
  const [aviso, setAviso] = useState('')

=======
  const [aviso, setAviso] = useState('')

  // Conteos para los tabs de estado
  const conteoEstados = useMemo(() => {
    const conteos = { todos: trueques.length }
    for (const item of trueques) {
      conteos[item.estado] = (conteos[item.estado] || 0) + 1
    }
    return conteos
  }, [trueques])

>>>>>>> feature/deibyvt
  const filtrados = useMemo(() => {
    const ahora = new Date()
    const inicioPeriodo = new Date(ahora)
    if (periodo === 'hoy') inicioPeriodo.setHours(0, 0, 0, 0)
    if (periodo === 'semana') inicioPeriodo.setDate(ahora.getDate() - 7)
    if (periodo === 'mes') inicioPeriodo.setMonth(ahora.getMonth() - 1)

    const resultado = trueques.filter((item) => {
      const coincideEstado = estado === 'todos' || item.estado === estado
<<<<<<< HEAD
      const texto = `${item.prendaPropia?.nombre ?? ''} ${item.prendaOfrecida?.nombre ?? ''} ${item.dirigidoA ?? ''}`.toLowerCase()
=======
      const texto = `${item.prendaPropia?.nombre ?? ''} ${item.prendaOfrecida?.nombre ?? ''} ${item.dirigidoA ?? ''} ${item.enviadoPor ?? ''}`.toLowerCase()
>>>>>>> feature/deibyvt
      const coincideBusqueda = texto.includes(busqueda.toLowerCase().trim())
      const fecha = new Date(item.fechaCreacion)
      let coincideFecha = true

<<<<<<< HEAD
      if (periodo !== 'todos' && periodo !== 'rango') coincideFecha = fecha >= inicioPeriodo
=======
      if (periodo !== 'todos' && periodo !== 'rango') {
        coincideFecha = fecha >= inicioPeriodo
      }
>>>>>>> feature/deibyvt
      if (periodo === 'rango') {
        if (fechaDesde) coincideFecha = coincideFecha && fecha >= new Date(`${fechaDesde}T00:00:00`)
        if (fechaHasta) coincideFecha = coincideFecha && fecha <= new Date(`${fechaHasta}T23:59:59`)
      }

      return coincideEstado && coincideBusqueda && coincideFecha
    })

    return [...resultado].sort((a, b) => {
      if (orden === 'antiguos') return new Date(a.fechaCreacion) - new Date(b.fechaCreacion)
<<<<<<< HEAD
      if (orden === 'mayor-diferencia') return Math.abs(b.diferencia ?? 0) - Math.abs(a.diferencia ?? 0)
=======
      if (orden === 'mayor-diferencia')
        return Math.abs(b.diferencia ?? 0) - Math.abs(a.diferencia ?? 0)
>>>>>>> feature/deibyvt
      return new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    })
  }, [trueques, estado, orden, busqueda, periodo, fechaDesde, fechaHasta])

<<<<<<< HEAD
  const cancelarPropuesta = (id) => {
    setTrueques((prev) => prev.map((item) => item.id === id ? { ...item, estado: 'rechazado', motivoRechazo: 'La propuesta fue cancelada por el usuario.' } : item))
    setAviso('La propuesta fue cancelada y se notificó al otro usuario.')
  }

  const crearNuevaPropuesta = (item) => {
    setAviso(`Puedes realizar una nueva propuesta para ${item.dirigidoA}.`)
  }

  const actualizarTrueque = (actualizado) => {
    setTrueques((prev) => prev.map((item) => item.id === actualizado.id ? actualizado : item))
    setSeleccionado(null)
  }

  const toggleHistorial = (id) => {
    setHistorialAbierto((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="trueques-page">
      <div className="trueques-header">
        <div>
          <p className="eyebrow">MARKETPLACE · TRUEQUES</p>
          <h1>Mis Trueques</h1>
          <p className="trueques-subtitle">Haz seguimiento de tus propuestas, contraofertas y resultados.</p>
        </div>
        <span className="trueques-count">{filtrados.length} resultado{filtrados.length === 1 ? '' : 's'}</span>
      </div>

      {aviso && (
        <div className="trueques-aviso" role="status">
          <span>{aviso}</span>
          <button type="button" onClick={() => setAviso('')} aria-label="Cerrar aviso">×</button>
        </div>
      )}

      <div className="estado-tabs" role="tablist" aria-label="Filtrar por estado">
        {ESTADOS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={estado === item.value ? 'activo' : ''}
            onClick={() => setEstado(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="trueques-filtros">
        <label>
          Buscar por prenda
          <input value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Ej. chaqueta" />
        </label>
        <label>
          Ordenar por
          <select value={orden} onChange={(event) => setOrden(event.target.value)}>
            <option value="recientes">Más recientes</option>
            <option value="antiguos">Más antiguas</option>
            <option value="mayor-diferencia">Mayor diferencia</option>
          </select>
        </label>
        <label>
          Fecha
          <select value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
            <option value="todos">Todas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="rango">Rango de fechas</option>
          </select>
        </label>
        {periodo === 'rango' && (
          <>
            <label>
              Desde
              <input type="date" value={fechaDesde} onChange={(event) => setFechaDesde(event.target.value)} />
            </label>
            <label>
              Hasta
              <input type="date" value={fechaHasta} onChange={(event) => setFechaHasta(event.target.value)} />
            </label>
          </>
        )}
      </div>

      <div className="trueques-lista">
        {filtrados.length === 0 ? (
          <div className="sin-resultados">
            <h2>No encontramos trueques</h2>
            <p>Prueba con otro estado, fecha o término de búsqueda.</p>
          </div>
        ) : filtrados.map((item) => (
          <article className="trueque-card" key={item.id}>
            <div className="trueque-card__top">
              <div>
                <span className={`estado-tag estado-tag--${item.estado}`}>{ESTADO_LABEL[item.estado]}</span>
                <p className="trueque-card__persona">
                  {item.enviadoPor === 'yo' ? `Propuesta enviada a ${item.dirigidoA}` : `Contraoferta recibida de ${item.enviadoPor}`}
                </p>
              </div>
              <div className="trueque-card__fecha">{tiempoTranscurrido(item.fechaCreacion)} · {fechaCorta(item.fechaCreacion)}</div>
            </div>

            <div className="trueque-card__prendas">
              <div className="prenda-resumen">
                <span>Quieres</span>
                <strong>{item.prendaPropia?.nombre ?? 'Producto objetivo'}</strong>
                {item.prendaPropia?.valor != null && <small>${item.prendaPropia.valor.toLocaleString('es-CO')}</small>}
              </div>
              <div className="intercambio-icono" aria-hidden="true">⇄</div>
              <div className="prenda-resumen">
                <span>Tú ofreces</span>
                {item.tipo === 'pago' ? (
                  <strong>${item.valorPropuesto.toLocaleString('es-CO')}</strong>
                ) : (
                  <>
                    <strong>{item.prendaOfrecida?.nombre ?? 'Prenda ofrecida'}</strong>
                    {item.prendaOfrecida?.valor != null && <small>${item.prendaOfrecida.valor.toLocaleString('es-CO')}</small>}
                  </>
                )}
              </div>
            </div>

            <div className="trueque-card__info">
              <span>{TIPOS[item.tipo]}</span>
              {item.tipo === 'solo_intercambio' && <p>Intercambio de prendas sin diferencia económica.</p>}
              {item.tipo === 'pago' && <p>Propuesta de pago por ${item.valorPropuesto.toLocaleString('es-CO')}.</p>}
              {item.tipo === 'intercambio_y_diferencia' && item.diferencia !== 0 && (
                <p>{item.diferencia > 0 ? `Debes pagar ${item.diferencia.toLocaleString('es-CO')} de diferencia.` : `Debes recibir ${Math.abs(item.diferencia).toLocaleString('es-CO')} de diferencia.`}</p>
              )}
              {item.estado === 'rechazado' && item.motivoRechazo && <p className="rechazo">{item.motivoRechazo}</p>}
            </div>

            <div className="trueque-card__acciones">
              <button type="button" className="btn-secundario" onClick={() => setSeleccionado(item)}>Ver detalles</button>
              {item.estado === 'pendiente' && item.enviadoPor === 'yo' && (
                <button type="button" className="btn-peligro-outline" onClick={() => cancelarPropuesta(item.id)}>Cancelar propuesta</button>
              )}
              {item.estado === 'rechazado' && (
                <button type="button" className="btn-principal" onClick={() => crearNuevaPropuesta(item)}>Nueva propuesta</button>
              )}
              {item.estado === 'en_proceso' && item.enviadoPor !== 'yo' && (
                <>
                  <button type="button" className="btn-principal" onClick={() => setSeleccionado(item)}>Aceptar propuesta</button>
                  <button type="button" className="btn-secundario" onClick={() => setSeleccionado(item)}>Rechazar propuesta</button>
                </>
              )}
            </div>

            <button type="button" className="historial-toggle" onClick={() => toggleHistorial(item.id)}>
              <span>Historial de Trueque</span><span>{historialAbierto[item.id] ? '−' : '+'}</span>
            </button>
            {historialAbierto[item.id] && (
              <div className="historial">
                {(item.historial ?? []).map((evento, index) => (
                  <div className="historial__item" key={`${item.id}-${index}`}>
                    <span className="historial__punto" />
                    <div>
                      <strong>{evento.estado}</strong>
                      <p>{evento.usuario} · {new Date(evento.fecha).toLocaleString('es-CO')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <VentanaModalDetalleTrueque
        trueque={seleccionado}
        onClose={() => setSeleccionado(null)}
        onActualizar={actualizarTrueque}
=======
  const handleCancelarPropuesta = (id) => {
    const fechaActual = new Date().toISOString()
    setTrueques((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              estado: 'rechazado',
              motivoRechazo: 'La propuesta fue cancelada por el usuario.',
              historial: [
                ...(item.historial ?? []),
                {
                  estado: 'Cancelada por el usuario',
                  usuario: 'yo',
                  fecha: fechaActual,
                  detalle: 'Propuesta cancelada.',
                },
              ],
            }
          : item
      )
    )
    setAviso('La propuesta fue cancelada y se notificó al otro usuario.')
  }

  const handleNuevaPropuesta = (item) => {
    setAviso(`Iniciando nueva propuesta para "${item.prendaPropia?.nombre}" con ${item.dirigidoA}.`)
  }

  const handleAceptarDirecto = (item) => {
    setSeleccionado(item)
  }

  const handleRechazarDirecto = (item) => {
    setSeleccionado(item)
  }

  const handleActualizarTrueque = (actualizado) => {
    setTrueques((prev) => prev.map((item) => (item.id === actualizado.id ? actualizado : item)))
    setSeleccionado(null)
    setAviso(`Negociación #${actualizado.id} actualizada correctamente.`)
  }

  return (
    <section className={styles.pagina} aria-labelledby="titulo-mis-trueques">
      <div className={styles.cabecera}>
        <div>
          <p className={styles.eyebrow}>MARKETPLACE · NEGOCIACIONES</p>
          <h1 id="titulo-mis-trueques" className={styles.titulo}>
            Mis Trueques
          </h1>
          <p className={styles.subtitulo}>
            Haz seguimiento de tus propuestas, contraofertas y resultados en tiempo real.
          </p>
        </div>
        <span className={styles.contadorResultados}>
          {filtrados.length} negociación{filtrados.length === 1 ? '' : 'es'}
        </span>
      </div>

      {aviso && (
        <div className={styles.aviso} role="status">
          <span>{aviso}</span>
          <button
            type="button"
            className={styles.avisoCerrar}
            onClick={() => setAviso('')}
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}

      <ControlesTrueques
        estadoSeleccionado={estado}
        onCambiarEstado={setEstado}
        ordenSeleccionado={orden}
        onCambiarOrden={setOrden}
        filtroFecha={periodo}
        onCambiarFiltroFecha={setPeriodo}
        fechaDesde={fechaDesde}
        onCambiarFechaDesde={setFechaDesde}
        fechaHasta={fechaHasta}
        onCambiarFechaHasta={setFechaHasta}
        busqueda={busqueda}
        onCambiarBusqueda={setBusqueda}
        conteoEstados={conteoEstados}
      />

      <ListadoTrueques
        trueques={filtrados}
        onVerDetalles={(item) => setSeleccionado(item)}
        onCancelarPropuesta={handleCancelarPropuesta}
        onNuevaPropuesta={handleNuevaPropuesta}
        onAceptarPropuesta={handleAceptarDirecto}
        onRechazarPropuesta={handleRechazarDirecto}
      />

      <VentanaModalDetalleTrueque
        key={seleccionado?.id ?? 'closed'}
        trueque={seleccionado}
        onClose={() => setSeleccionado(null)}
        onActualizar={handleActualizarTrueque}
>>>>>>> feature/deibyvt
      />
    </section>
  )
}
