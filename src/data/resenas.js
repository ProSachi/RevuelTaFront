let resenasRegistradas = []

export function obtenerVendedoresResenados(pedidoId) {
  return resenasRegistradas
    .filter((resena) => resena.pedidoId === pedidoId)
    .map((resena) => resena.vendedorId)
}

export function crearResena(resena) {
  const nuevaResena = { id: crypto.randomUUID(), ...resena }
  resenasRegistradas = [...resenasRegistradas, nuevaResena]
  return nuevaResena
}

export function obtenerResenasPedido(pedidoId) {
  return resenasRegistradas.filter((resena) => resena.pedidoId === pedidoId)
}
