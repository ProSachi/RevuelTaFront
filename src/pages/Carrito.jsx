import { useMemo, useState, useEffect } from 'react'
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
import styles from './Carrito.module.css'

// MKT-CR01 — Carrito
// Responsabilidad: Contenedor principal de la página, coordina los productos agregados,
// el resumen del pedido y los productos sugeridos.
export default function Carrito() {
  const [productos, setProductos] = useState(productosCarritoMock)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [productoTruequeVisible, setProductoTruequeVisible] = useState(null)
  const [aviso, setAviso] = useState('')
  const [descuentoAplicado, setDescuentoAplicado] = useState(0)
  const [productosSugeridos, setProductosSugeridos] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((data) => {
        setProductosSugeridos(
          data.map((p) => ({
            id: p.id,
            nombre: p.title,
            marca: p.category,
            precio: p.price * 1000,
            imagenUrl: p.image
          }))
        )
      })
  }, [])

  const precioActual = (producto) => {
    const detalle = producto.trueque ? detalleTruequePorProductoMock[producto.id] : null
    if (!detalle || detalle.tipo === 'solo_intercambio' || detalle.diferencia == null) {
      return producto.precio
    }
    return Math.max(0, producto.precio + detalle.diferencia)
  }

  const resumen = useMemo(() => {
    const subtotal = productos.reduce((acc, p) => acc + precioActual(p) * p.cantidad, 0)
    const envio = productos.length > 0 ? envioFijo : 0
    const descuento = Math.min(subtotal + envio, descuentoAplicado)
    const total = Math.max(0, subtotal + envio - descuento)
    return { subtotal, envio, descuento, total }
  }, [productos, descuentoAplicado])

  const cambiarCantidad = (id, delta) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const nuevaCantidad = Math.min(
          p.cantidadDisponible,
          Math.max(1, p.cantidad + delta)
        )
        return { ...p, cantidad: nuevaCantidad }
      })
    )
  }

  const iniciarEliminar = (id) => setIdAEliminar(id)

  const confirmarEliminar = () => {
    setProductos((prev) => prev.filter((p) => p.id !== idAEliminar))
    setIdAEliminar(null)
    setAviso('El producto fue retirado de tu carrito.')
  }

  const cancelarEliminar = () => setIdAEliminar(null)

  const proponerTrueque = () => {
    setAviso('Esto abriría el flujo de "Proponer Trueque" definido para el producto.')
  }

  const verTrueque = (producto) => setProductoTruequeVisible(producto)
  const cerrarDetalleTrueque = () => setProductoTruequeVisible(null)

  const continuarAlPago = () => {
    setAviso('Redirigiendo al flujo seguro de pago...')
  }

  const handleAplicarDescuento = (montoDescuento) => {
    setDescuentoAplicado(montoDescuento)
  }

  const productoAEliminar = productos.find((p) => p.id === idAEliminar) ?? null
  const detalleTruequeVisible = productoTruequeVisible
    ? detalleTruequePorProductoMock[productoTruequeVisible.id]
    : null

  return (
    <section className={styles.pagina} aria-labelledby="titulo-mi-carrito">
      <h1 id="titulo-mi-carrito" className={styles.titulo}>
        Mi Carrito
      </h1>

      <Aviso mensaje={aviso} onCerrar={() => setAviso('')} />

      {productos.length === 0 ? (
        <div className={styles.vacio}>
          <p>Tu carrito está actualmente vacío.</p>
          <Link to="#" className={styles.btnIrCatalogo}>
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

          <ResumenPedido
            subtotal={resumen.subtotal}
            envio={resumen.envio}
            descuento={resumen.descuento}
            total={resumen.total}
            deshabilitado={productos.length === 0}
            onContinuar={continuarAlPago}
            onAplicarDescuento={handleAplicarDescuento}
          />
        </div>
      )}

      <ProductosRelacionados productos={productosSugeridos} />

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
