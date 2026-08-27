import { useMemo, useState } from 'react'
<<<<<<< HEAD
import ProductoCarritoCard from '../components/carrito/ProductoCarritoCard.jsx'
import ResumenPedido from '../components/carrito/ResumenPedido.jsx'
import ConfirmarEliminarModal from '../components/carrito/ConfirmarEliminarModal.jsx'
import DetalleTruequeCarritoModal from '../components/carrito/DetalleTruequeCarritoModal.jsx'
import ProductoSugeridoCard from '../components/carrito/ProductoSugeridoCard.jsx'
import Aviso from '../components/carrito/Aviso.jsx'
import { productosCarritoMock, detalleTruequePorProductoMock, envioFijo } from '../data/carritoMock.js'
import { productosSugeridosMock } from '../data/sugeridosMock.js'
import './Carrito.css'

// MKT-CR01 — Carrito
// Datos quemados por ahora (productosCarritoMock). Cuando exista backend,
// este estado se carga desde Axios (useEffect) sin cambiar el resto de la lógica.
=======
import { Link } from 'react-router-dom'
import ProductosCarrito from '../components/carrito/ProductosCarrito/ProductosCarrito.jsx'
import ResumenPedido from '../components/carrito/ResumenPedido/ResumenPedido.jsx'
import ProductosRelacionados from '../components/carrito/ProductosRelacionados/ProductosRelacionados.jsx'
import ConfirmarEliminarModal from '../components/carrito/ConfirmarEliminarModal/ConfirmarEliminarModal.jsx'
import DetalleTruequeCarritoModal from '../components/carrito/DetalleTruequeCarritoModal/DetalleTruequeCarritoModal.jsx'
import Aviso from '../components/carrito/Aviso/Aviso.jsx'
import {
  productosCarritoMock,
  detalleTruequePorProductoMock,
  envioFijo,
} from '../data/carritoMock.js'
import { productosSugeridosMock } from '../data/sugeridosMock.js'
import styles from './Carrito.module.css'

// MKT-CR01 — Carrito
// Responsabilidad: Contenedor principal de la página, coordina los productos agregados,
// el resumen del pedido y los productos sugeridos.
>>>>>>> feature/deibyvt
export default function Carrito() {
  const [productos, setProductos] = useState(productosCarritoMock)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [productoTruequeVisible, setProductoTruequeVisible] = useState(null)
  const [aviso, setAviso] = useState('')
<<<<<<< HEAD

  const precioActual = (producto) => {
    const detalle = producto.trueque ? detalleTruequePorProductoMock[producto.id] : null
    if (!detalle || detalle.tipo === 'solo_intercambio' || detalle.diferencia == null) return producto.precio
=======
  const [descuentoAplicado, setDescuentoAplicado] = useState(0)

  const precioActual = (producto) => {
    const detalle = producto.trueque ? detalleTruequePorProductoMock[producto.id] : null
    if (!detalle || detalle.tipo === 'solo_intercambio' || detalle.diferencia == null) {
      return producto.precio
    }
>>>>>>> feature/deibyvt
    return Math.max(0, producto.precio + detalle.diferencia)
  }

  const resumen = useMemo(() => {
    const subtotal = productos.reduce((acc, p) => acc + precioActual(p) * p.cantidad, 0)
    const envio = productos.length > 0 ? envioFijo : 0
<<<<<<< HEAD
    const descuento = 0
    return { subtotal, envio, descuento, total: subtotal + envio - descuento }
  }, [productos])
=======
    const descuento = Math.min(subtotal + envio, descuentoAplicado)
    const total = Math.max(0, subtotal + envio - descuento)
    return { subtotal, envio, descuento, total }
  }, [productos, descuentoAplicado])
>>>>>>> feature/deibyvt

  const cambiarCantidad = (id, delta) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
<<<<<<< HEAD
        const nuevaCantidad = Math.min(p.cantidadDisponible, Math.max(1, p.cantidad + delta))
        return { ...p, cantidad: nuevaCantidad }
      }),
=======
        const nuevaCantidad = Math.min(
          p.cantidadDisponible,
          Math.max(1, p.cantidad + delta)
        )
        return { ...p, cantidad: nuevaCantidad }
      })
>>>>>>> feature/deibyvt
    )
  }

  const iniciarEliminar = (id) => setIdAEliminar(id)

  const confirmarEliminar = () => {
    setProductos((prev) => prev.filter((p) => p.id !== idAEliminar))
    setIdAEliminar(null)
<<<<<<< HEAD
=======
    setAviso('El producto fue retirado de tu carrito.')
>>>>>>> feature/deibyvt
  }

  const cancelarEliminar = () => setIdAEliminar(null)

  const proponerTrueque = () => {
<<<<<<< HEAD
    // El flujo real de propuesta de trueque se abre desde la ficha de producto
    // (definido en otra HU). Desde el carrito solo se ofrece el punto de entrada.
=======
>>>>>>> feature/deibyvt
    setAviso('Esto abriría el flujo de "Proponer Trueque" definido para el producto.')
  }

  const verTrueque = (producto) => setProductoTruequeVisible(producto)
  const cerrarDetalleTrueque = () => setProductoTruequeVisible(null)

  const continuarAlPago = () => {
<<<<<<< HEAD
    setAviso('Esto continuaría al flujo de pago (fuera del alcance de esta HU).')
=======
    setAviso('Redirigiendo al flujo seguro de pago...')
  }

  const handleAplicarDescuento = (montoDescuento) => {
    setDescuentoAplicado(montoDescuento)
>>>>>>> feature/deibyvt
  }

  const productoAEliminar = productos.find((p) => p.id === idAEliminar) ?? null
  const detalleTruequeVisible = productoTruequeVisible
    ? detalleTruequePorProductoMock[productoTruequeVisible.id]
    : null

  return (
<<<<<<< HEAD
    <section className="carrito-page">
      <h1>Mi Carrito</h1>
=======
    <section className={styles.pagina} aria-labelledby="titulo-mi-carrito">
      <h1 id="titulo-mi-carrito" className={styles.titulo}>
        Mi Carrito
      </h1>
>>>>>>> feature/deibyvt

      <Aviso mensaje={aviso} onCerrar={() => setAviso('')} />

      {productos.length === 0 ? (
<<<<<<< HEAD
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <a href="/catalogo" className="btn-secundario">
            Ir al catálogo
          </a>
        </div>
      ) : (
        <div className="carrito-layout">
          <div className="carrito-lista">
            {productos.map((producto) => (
              <ProductoCarritoCard
                key={producto.id}
                producto={producto}
                onCambiarCantidad={cambiarCantidad}
                onIniciarEliminar={iniciarEliminar}
                onProponerTrueque={proponerTrueque}
                onVerTrueque={verTrueque}
                precioActual={precioActual}
              />
            ))}
            <a href="/catalogo" className="link-seguir-comprando">
              ← Seguir comprando
            </a>
          </div>
=======
        <div className={styles.vacio}>
          <p>Tu carrito está actualmente vacío.</p>
          <Link to="/catalogo" className={styles.btnIrCatalogo}>
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <ProductosCarrito
            productos={productos}
            onCambiarCantidad={cambiarCantidad}
            onIniciarEliminar={iniciarEliminar}
            onProponerTrueque={proponerTrueque}
            onVerTrueque={verTrueque}
            precioActual={precioActual}
          />
>>>>>>> feature/deibyvt

          <ResumenPedido
            subtotal={resumen.subtotal}
            envio={resumen.envio}
            descuento={resumen.descuento}
            total={resumen.total}
            deshabilitado={productos.length === 0}
            onContinuar={continuarAlPago}
<<<<<<< HEAD
=======
            onAplicarDescuento={handleAplicarDescuento}
>>>>>>> feature/deibyvt
          />
        </div>
      )}

<<<<<<< HEAD
      <section className="sugeridos">
        <h2>También te podría interesar</h2>
        <div className="sugeridos__grid">
          {productosSugeridosMock.map((producto) => (
            <ProductoSugeridoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
=======
      <ProductosRelacionados productos={productosSugeridosMock} />
>>>>>>> feature/deibyvt

      <ConfirmarEliminarModal
        producto={productoAEliminar}
        onConfirmar={confirmarEliminar}
        onCancelar={cancelarEliminar}
      />

      <DetalleTruequeCarritoModal
        producto={productoTruequeVisible}
        detalle={detalleTruequeVisible}
        onClose={cerrarDetalleTrueque}
      />
    </section>
  )
}
