// Datos quemados para MKT-CR01 — reemplazar por datos del backend (Axios) más adelante.
// Mantener la misma forma de objeto para no romper los componentes al integrar.
export const productosCarritoMock = [
  {
    id: 1,
    nombre: 'Chaqueta de jean',
    marca: "Levi's",
    talla: 'M',
    color: 'Azul',
    vendedor: 'Ana M.',
    calificacionVendedor: 4.8,
    imagen: '',
    precio: 45000,
    cantidad: 1,
    cantidadDisponible: 3,
    // null | 'propuesto' | 'aceptado' | 'rechazado'
    trueque: null,
  },
  {
    id: 2,
    nombre: 'Tenis blancos',
    marca: 'Adidas',
    talla: '40',
    color: 'Blanco',
    vendedor: 'Luis P.',
    calificacionVendedor: 4.5,
    imagen: '',
    precio: 58000,
    cantidad: 1,
    cantidadDisponible: 1,
    trueque: 'propuesto',
  },
  {
    id: 3,
    nombre: 'Vestido floral',
    marca: 'Zara',
    talla: 'S',
    color: 'Multicolor',
    vendedor: 'Camila R.',
    calificacionVendedor: 4.9,
    imagen: '',
    precio: 32000,
    cantidad: 2,
    cantidadDisponible: 4,
    trueque: 'aceptado',
  },
]

// Detalle mínimo del trueque asociado a cada producto (para el modal de info del carrito).
// Se relaciona por productoId. En el backend real esto vendría con el pedido/producto.
export const detalleTruequePorProductoMock = {
  2: {
    estado: 'propuesto',
    tipo: 'solo_intercambio',
    ofreces: 'Bolso de cuero',
    recibes: 'Tenis blancos',
    diferencia: 0,
    fecha: '2026-08-11T09:00:00',
  },
  3: {
    estado: 'aceptado',
    tipo: 'intercambio_y_diferencia',
    ofreces: 'Falda plisada',
    recibes: 'Vestido floral',
    diferencia: -4000,
    fecha: '2026-08-09T15:30:00',
  },
}

export const envioFijo = 8000
