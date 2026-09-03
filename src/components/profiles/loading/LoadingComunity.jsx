import React from 'react';
import styles from './LoadingComunity.module.css';

const LoadingComunity = () => {
  return (
    <div className={styles.seccionTabsAreaContenido}>
      <div className={styles.pasarelaContenedor}>
        
        {/* 1. Recorrido superior de camisas */}
        <div className={styles.camisaFlujo}>
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={styles.camisaItem}
              style={{ animationDelay: `${index * 0.75}s` }}
            >
              <svg 
                className={styles.iconoCamisa} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 4.5C10.5 5.5 9 5.5 7.5 4.5L2 7.5L4 12L7 11V20H17V11L20 12L22 7.5L16.5 4.5C15 5.5 13.5 5.5 12 4.5Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Línea de riel sutil */}
        <div className={styles.rielSombra} />

        {/* 2. Palabra RevueLTa con animación de latido */}
        <div className={styles.textoMarcaLatido}>
          RevueLTa
        </div>

      </div>
    </div>
  );
};

export default LoadingComunity;