// Utilidad local a la HU de Carrito (no se comparte con otras historias por ahora).
export function formatoMoneda(valor) {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  })
}
