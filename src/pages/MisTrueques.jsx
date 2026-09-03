import { useMemo, useState } from 'react'
import ControlesTrueques from '../components/trueques/ControlesTrueques/ControlesTrueques.jsx'
import ListadoTrueques from '../components/trueques/ListadoTrueques/ListadoTrueques.jsx'
import VentanaModalDetalleTrueque from '../components/trueques/VentanaModalDetalleTrueque/VentanaModalDetalleTrueque.jsx'
import { truequesMock } from '../data/truequesMock.js'
import styles from './MisTrueques.module.css'

// MKT-TR01 — Mis Trueques
// Responsabilidad: Contenedor principal de la página, coordina los controles de consulta,
// filtros avanzados, listado reactivo y la ventana modal de negociación.
export default function MisTrueques() {
  const [trueques, setTrueques] = useState(truequesMock)
  const [estado, setEstado] = useState('todos')
  const [orden, setOrden] = useState('recientes')
  const [busqueda, setBusqueda] = useState('')
  const [periodo, setPeriodo] = useState('todos')
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)
  const [aviso, setAviso] = useState('')

  // Conteos para los tabs de estado
  const conteoEstados = useMemo(() => {
    const conteos = { todos: trueques.length }
    for (const item of trueques) {
      conteos[item.estado] = (conteos[item.estado] || 0) + 1
    }
    return conteos
  }, [trueques])

  const filtrados = useMemo(() => {
    const ahora = new Date()
    const inicioPeriodo = new Date(ahora)
    if (periodo === 'hoy') inicioPeriodo.setHours(0, 0, 0, 0)
    if (periodo === 'semana') inicioPeriodo.setDate(ahora.getDate() - 7)
    if (periodo === 'mes') inicioPeriodo.setMonth(ahora.getMonth() - 1)

    const resultado = trueques.filter((item) => {
      const coincideEstado = estado === 'todos' || item.estado === estado
      const texto = `${item.prendaPropia?.nombre ?? ''} ${item.prendaOfrecida?.nombre ?? ''} ${item.dirigidoA ?? ''} ${item.enviadoPor ?? ''}`.toLowerCase()
      const coincideBusqueda = texto.includes(busqueda.toLowerCase().trim())
      const fecha = new Date(item.fechaCreacion)
      let coincideFecha = true

      if (periodo !== 'todos' && periodo !== 'rango') {
        coincideFecha = fecha >= inicioPeriodo
      }
      if (periodo === 'rango') {
        if (fechaDesde) coincideFecha = coincideFecha && fecha >= new Date(`${fechaDesde}T00:00:00`)
        if (fechaHasta) coincideFecha = coincideFecha && fecha <= new Date(`${fechaHasta}T23:59:59`)
      }

      return coincideEstado && coincideBusqueda && coincideFecha
    })

    return [...resultado].sort((a, b) => {
      if (orden === 'antiguos') return new Date(a.fechaCreacion) - new Date(b.fechaCreacion)
      if (orden === 'mayor-diferencia')
        return Math.abs(b.diferencia ?? 0) - Math.abs(a.diferencia ?? 0)
      return new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    })
  }, [trueques, estado, orden, busqueda, periodo, fechaDesde, fechaHasta])

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
      />
    </section>
  )
}
