import styles from './ControlesTrueques.module.css'

const ESTADOS = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'finalizado', label: 'Finalizados' },
  { value: 'rechazado', label: 'Rechazados' },
]

export default function ControlesTrueques({
  estadoSeleccionado = 'todos',
  onCambiarEstado,
  ordenSeleccionado = 'recientes',
  onCambiarOrden,
  filtroFecha = 'todos',
  onCambiarFiltroFecha,
  fechaDesde = '',
  onCambiarFechaDesde,
  fechaHasta = '',
  onCambiarFechaHasta,
  busqueda = '',
  onCambiarBusqueda,
  conteoEstados = {},
}) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.tabsEstado} role="tablist" aria-label="Filtrar trueques por estado">
        {ESTADOS.map((item) => {
          const activo = estadoSeleccionado === item.value
          const conteo = conteoEstados[item.value]
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={activo}
              className={`${styles.tabBtn} ${activo ? styles.tabActivo : ''}`}
              onClick={() => onCambiarEstado(item.value)}
            >
              <span>{item.label}</span>
              {conteo != null && <span className={styles.badgeConteo}>{conteo}</span>}
            </button>
          )
        })}
      </div>

      <div className={styles.barraFiltros}>
        <div className={styles.campo}>
          <label htmlFor="busqueda-prenda" className={styles.label}>
            Buscar por prenda o participante
          </label>
          <input
            id="busqueda-prenda"
            type="text"
            className={styles.input}
            placeholder="Ej. Chaqueta de jean, Ana M..."
            value={busqueda}
            onChange={(e) => onCambiarBusqueda(e.target.value)}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="ordenar-trueques" className={styles.label}>
            Ordenar por
          </label>
          <select
            id="ordenar-trueques"
            className={styles.select}
            value={ordenSeleccionado}
            onChange={(e) => onCambiarOrden(e.target.value)}
          >
            <option value="recientes">Más recientes</option>
            <option value="antiguos">Más antiguas</option>
            <option value="mayor-diferencia">Mayor diferencia económica</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label htmlFor="filtro-fecha" className={styles.label}>
            Fecha
          </label>
          <select
            id="filtro-fecha"
            className={styles.select}
            value={filtroFecha}
            onChange={(e) => onCambiarFiltroFecha(e.target.value)}
          >
            <option value="todos">Todas las fechas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="rango">Rango personalizado</option>
          </select>
        </div>

        {filtroFecha === 'rango' && (
          <div className={styles.filaFechasRango}>
            <div className={styles.campo}>
              <label htmlFor="fecha-desde" className={styles.label}>
                Desde
              </label>
              <input
                id="fecha-desde"
                type="date"
                className={styles.input}
                value={fechaDesde}
                onChange={(e) => onCambiarFechaDesde(e.target.value)}
              />
            </div>
            <div className={styles.campo}>
              <label htmlFor="fecha-hasta" className={styles.label}>
                Hasta
              </label>
              <input
                id="fecha-hasta"
                type="date"
                className={styles.input}
                value={fechaHasta}
                onChange={(e) => onCambiarFechaHasta(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
