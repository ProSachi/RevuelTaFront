import React from 'react';
import { HiCheckBadge, HiXCircle } from 'react-icons/hi2';
import styles from './Verificado.module.css';

const Verificado = ({ estaVerificado }) => {
  return (
    <div className={styles.contenedor}>
      {estaVerificado ? (
        <>
          <HiCheckBadge className={styles.iconoVerificado} />
          <span>Vendedor verificado</span>
        </>
      ) : (
        <>
          <HiXCircle className={styles.iconoNoVerificado} />
          <span>Vendedor no verificado</span>
        </>
      )}
    </div>
  );
};

export default Verificado;