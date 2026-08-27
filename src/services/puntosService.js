import { historialPuntosData, saldoActualPuntos } from '../data/historialPuntosData.js';


export async function obtenerSaldoActual() {
  return Promise.resolve(saldoActualPuntos);


}

export async function obtenerHistorialPuntos() {
  return Promise.resolve(historialPuntosData);


}


export async function registrarMovimientoPuntos(movimiento) {
  return Promise.resolve(movimiento);

}
