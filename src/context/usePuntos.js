import { useContext } from 'react';
import { PuntosContext } from './puntosContextObject.js';

export function usePuntos() {
  const contexto = useContext(PuntosContext);
  if (!contexto) {
    throw new Error('usePuntos debe usarse dentro de un PuntosProvider');
  }
  return contexto;
}
