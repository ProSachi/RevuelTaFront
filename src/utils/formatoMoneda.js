/**
 * Formatea un valor numérico a moneda colombiana ($XX.XXX).
 * @param {number} valor
 * @returns {string}
 */
export function formatoMoneda(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor ?? 0)
}

export default formatoMoneda
