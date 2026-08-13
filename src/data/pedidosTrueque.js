const pedidosTrueque = {
  "005": {
    id: "005",
    fechaRealizacion: "2026-08-07",
    tipo: "Trueque",
    estado: "Enviado",
    prendaPropia: {
      id: "p1",
      nombre: "Chaqueta de jean",
      valor: 50000,
      marca: "Levi's",
      talla: "M",
      usuario: "N.Vendedor",
      imagen: "",
    },
    prendaRecibida: {
      id: "p2",
      nombre: "Vestido floreado",
      valor: 50000,
      marca: "Zara",
      talla: "S",
      usuario: "N.Comprador",
      imagen: "",
    },
    entregaPropia: {
      puntoAcopio: "Punto Re-vuelta · Chapinero Cra 0 #0 - 0 · Abierto hasta las 8 p.m.",
      transportista: "Nombre de transportista",
      costoEnvio: 10000,
    },
    entregaContraparte: {
      puntoAcopio: "Punto Re-vuelta · Chapinero Cra 0 #0 - 0 · Abierto hasta las 8 p.m.",
      transportista: "Nombre de transportista",
      costoEnvio: 10000,
    },
    diferenciaTrueque: 0,
    costoEnvio: 10000,
    totalPedido: 10000,
  },
}

export function obtenerPedidoPorId(pedidoId) {
  return pedidosTrueque[pedidoId] ?? null
}
