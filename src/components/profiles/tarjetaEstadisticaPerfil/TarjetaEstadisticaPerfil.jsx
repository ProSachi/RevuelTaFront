import React from 'react';
import styles from './TarjetaEstadisticaPerfil.module.css';

const TarjetaEstadisticaPerfil = ({ icono, nombreEstadistica, valorEstadistica }) => {
  const IconComponent = icono;

  return (
    <div className={styles.tarjeta}>
      <div className={styles.iconoContenedor}>
        {IconComponent && <IconComponent className={styles.icono} />}
      </div>

      <span className={styles.valor}>
        {valorEstadistica}
      </span>

      <span className={styles.nombre}>
        {nombreEstadistica}
      </span>
    </div>
  );
};

export default TarjetaEstadisticaPerfil;