import { useEffect, useState, useCallback } from 'react';
import { PuntosContext } from './puntosContextObject.js';
import {
  obtenerSaldoActual,
  obtenerHistorialPuntos,
  registrarMovimientoPuntos,
} from '../services/puntosService.js';

// -----------------------------------------------------------------------
// PuntosProvider
//
// Fuente única de verdad para el saldo y el historial de puntos del
// usuario identificado. Cualquier componente de la app -publicar una
// prenda, confirmar un trueque, enviar una reseña, invitar a un amigo,
// canjear una oferta, etc.- puede usar usePuntos() para otorgar o
// descontar puntos, y ese movimiento queda reflejado de inmediato en la
// Ventana Modal Historial de Puntos, sin importar en qué parte del
// sistema haya ocurrido la acción.
// -----------------------------------------------------------------------

let contadorIdMovimiento = 1000; // evita colisión con los ids quemados iniciales

export const PuntosProvider = ({ children }) => {
  const [saldoActual, setSaldoActual] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Carga inicial. Hoy viene de datos quemados; cuando exista backend,
  // puntosService.js hace la consulta Axios sin que este archivo cambie.
  useEffect(() => {
    let activo = true;

    Promise.all([obtenerSaldoActual(), obtenerHistorialPuntos()]).then(
      ([saldo, movimientos]) => {
        if (!activo) return;
        setSaldoActual(saldo);
        setHistorial(movimientos);
        setCargando(false);
      }
    );

    return () => {
      activo = false;
    };
  }, []);

  // Cualquier parte del sistema llama esto cuando el usuario realiza una
  // acción que otorga puntos (prenda publicada, trueque realizado, reseña
  // enviada, amigo invitado, u otras acciones que se agreguen a futuro).
  const otorgarPuntos = useCallback(({ tipo, motivo, puntos }) => {
    const nuevoMovimiento = {
      id: contadorIdMovimiento++,
      tipo,
      motivo,
      puntos,
      fecha: new Date().toISOString(),
    };

    // Optimista: se refleja de inmediato en el historial.
    setHistorial((prev) => [nuevoMovimiento, ...prev]);
    setSaldoActual((prev) => prev + puntos);

    // Persiste el movimiento (hoy simulado, mañana vía Axios).
    registrarMovimientoPuntos(nuevoMovimiento);
  }, []);

  // Usado por flujos que gastan puntos (ej. canje de una oferta).
  const descontarPuntos = useCallback((cantidad) => {
    setSaldoActual((prev) => prev - cantidad);
  }, []);

  const value = {
    saldoActual,
    historial,
    cargando,
    otorgarPuntos,
    descontarPuntos,
  };

  return (
    <PuntosContext.Provider value={value}>{children}</PuntosContext.Provider>
  );
};
