import ListadoPedidos from '../../components/pages/Pedidos/ListadoPedidos.jsx'
import pedidos from '../../data/pedidos.js'
import { useState } from 'react'
import ControlesPedidos from '../../components/pages/Pedidos/ControlesPedidos.jsx';
import styles from "../../components/pages/Pedidos/MisPedidos.module.css";
import VentanaModalMiResena from '../../components/pages/ModalMiResena/VentanaModalMiResena.jsx';
import resenas from '../../data/resenas.js';
import useProductosPedidos from '../../hooks/useProductosPedidos.js';

const MisPedidos = () => {

  const { productos } = useProductosPedidos();

  const imagenesProductos = Object.fromEntries(productos.map((producto) => [producto.id, producto.imagen]));

  const imagenesPorPrenda = {
    ...imagenesProductos,
    3: imagenesProductos[17],
    2: imagenesProductos[1],
    1: imagenesProductos[19],
    4: imagenesProductos[16],
    5: imagenesProductos[2],
    6: imagenesProductos[4],
    7: imagenesProductos[16],
    8: imagenesProductos[18],
  }

  const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todos");

  const [busqueda, setBusqueda] = useState("");

  const [ordenSeleccionado, setOrdenSeleccionado] = useState("Recientes");

  const [filtroFecha, setFiltroFecha] = useState("Todos");

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [pedidoResenaSeleccionado, setPedidoResenaSeleccionado] = useState(null);

  const verificarFecha = (pedido) => {

    if (filtroFecha === "Todos") {
      return true;
    }

    const fechaPedido = new Date(pedido.fecha + "T00:00:00");
    const hoy = new Date();

    if (filtroFecha === "Hoy") {
      return (
        fechaPedido.getDate() === hoy.getDate() &&
        fechaPedido.getMonth() === hoy.getMonth() &&
        fechaPedido.getFullYear() === hoy.getFullYear()
      );
    }

    if (filtroFecha === "Semana") {
      const haceUnaSemana = new Date();
      haceUnaSemana.setDate(hoy.getDate() - 7);

      return fechaPedido >= haceUnaSemana;
    }

    if (filtroFecha === "Mes") {
      const haceUnMes = new Date();
      haceUnMes.setMonth(hoy.getMonth() - 1);

      return fechaPedido >= haceUnMes;
    }

    if (filtroFecha === "Personalizado") {

      if (!fechaDesde || !fechaHasta) {
        return true;
      }

      const desde = new Date(fechaDesde + "T00:00:00");
      const hasta = new Date(fechaHasta + "T23:59:59");

      return fechaPedido >= desde && fechaPedido <= hasta;
    }

    return true;
  };

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideEstado = estadoSeleccionado === "Todos" || pedido.estado === estadoSeleccionado;

    const coincideBusqueda = pedido.id.toLowerCase().includes(busqueda.toLowerCase()) || pedido.prendas.some((prenda) =>
      prenda.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const coincideFecha = verificarFecha(pedido);

    return coincideEstado && coincideBusqueda && coincideFecha;
  });

  const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);

    if (ordenSeleccionado === "Recientes") {
      return fechaB - fechaA;
    }
    return fechaA - fechaB;
  })

  return (
    <main className={styles.misPedidos}>
      <section className={styles.misPedidosContenido}>
        <h1>Mis pedidos</h1>

        <ControlesPedidos
          estadoSeleccionado={estadoSeleccionado}
          setEstadoSeleccionado={setEstadoSeleccionado}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          ordenSeleccionado={ordenSeleccionado}
          setOrdenSeleccionado={setOrdenSeleccionado}
          filtroFecha={filtroFecha}
          setFiltroFecha={setFiltroFecha}
          fechaDesde={fechaDesde}
          setFechaDesde={setFechaDesde}
          fechaHasta={fechaHasta}
          setFechaHasta={setFechaHasta}
        />

        {/*<ListadoPedidos pedidos={pedidosFiltrados} />*/}
        <ListadoPedidos pedidos={pedidosOrdenados} imagenesPorPrenda={imagenesPorPrenda} onVerResena={setPedidoResenaSeleccionado} />
      </section>

      {pedidoResenaSeleccionado && (
        <VentanaModalMiResena
          resenas={resenas[pedidoResenaSeleccionado.id]}
          onCerrar={() => setPedidoResenaSeleccionado(null)}
        />
      )}
    </main>
  )
}

export default MisPedidos