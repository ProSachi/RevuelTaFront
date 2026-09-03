import styles from "./MisPedidos.module.css";

const ControlesPedidos = ({ estadoSeleccionado, setEstadoSeleccionado, busqueda, setBusqueda, ordenSeleccionado, setOrdenSeleccionado, filtroFecha, setFiltroFecha, fechaDesde, setFechaDesde, fechaHasta, setFechaHasta }) => {

  const estados = [{ label: "Todos", value: "Todos" }, { label: "En preparación", value: "En preparación" }, { label: "Enviados", value: "Enviado" }, { label: "Entregados", value: "Entregado" }, { label: "Cancelados", value: "Cancelado" }]

  return (
    <div className={styles.controlesPedidos}>
      {estados.map((estado) => (
        <button
          key={estado.value}
          onClick={() => setEstadoSeleccionado(estado.value)}
          className={estadoSeleccionado === estado.value ? styles.activo : styles.inactivo}>
          {estado.label}
        </button>
      ))}

      <input
        type="text"
        placeholder='Buscar por pedido o prenda...'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <section className={styles.controlSelect}>
        <label htmlFor="orden">Ordenar por</label>
        <select
          id="orden"
          className={styles.selector}
          value={ordenSeleccionado}
          onChange={(e) => setOrdenSeleccionado(e.target.value)}>
          <option value="Recientes">Más recientes</option>
          <option value="Antiguos">Más antiguos</option>
        </select>
      </section>

      <section className={styles.controlSelect}>
        <label htmlFor="fecha">Fecha:</label>
        <select
          id="fecha"
          className={styles.selector}
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}>
          <option value="Todos">Todas las fechas</option>
          <option value="Hoy">Hoy</option>
          <option value="Semana">Última semana</option>
          <option value="Mes">Último mes</option>
          <option value="Personalizado">Rango personalizado</option>
        </select>
      </section>

      {filtroFecha === "Personalizado" && (
        <section className={styles.rangoFechas}>
          <div className={styles.controlSelect}>
            <label htmlFor="dechaDesde">Desde: </label>

            <input id="fechaDesde" type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
          </div>

          <div className={styles.controlSelect}>
            <label htmlFor="fechaHasta">Hasta: </label>

            <input id="fechaHasta" type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
          </div>

        </section>
      )}

    </div>
  )
}

export default ControlesPedidos