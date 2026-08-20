import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CalificacionEstrellas.module.css';

const CalificacionEstrellas = ({ promedio = 0, tamano = '1rem' }) => {
  return (
    <div className={styles.contenedorEstrellas} style={{ '--star-size': tamano }}>
      {[1, 2, 3, 4, 5].map((index) => {
        let porcentajeLlenado = 0;

        if (promedio >= index) {
          porcentajeLlenado = 100;
        } else if (promedio >= index - 1) {
          porcentajeLlenado = (promedio % 1) * 100;
        }

        return (
          <div key={index} className={styles.estrellaWrapper}>
            {/* Estrella base inactiva */}
            <FaStar className={styles.estrellaInactiva} />

            {/* Capa rellena con la paleta de la marca */}
            <div
              className={styles.estrellaParcial}
              style={{ width: `${porcentajeLlenado}%` }}
            >
              <FaStar className={styles.estrellaActiva} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalificacionEstrellas;