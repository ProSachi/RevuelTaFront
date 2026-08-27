const vendedoresPorPedido = {
  "003": [
    { id: "v1", nombre: "CHEVIGNON" },
    { id: "v2", nombre: "NAF NAF" },
  ],
  "005": [
    { id: "v3", nombre: "AMERICANINO" },
    { id: "v4", nombre: "ESPRIT" },
    { id: "v5", nombre: "MNG" },
  ],
  "006": [
    { id: "v6", nombre: "AMERICAN EAGLE" },
  ],
}

export function obtenerVendedoresPedido(pedidoId) {
  return vendedoresPorPedido[pedidoId] ?? []
}
