import React, { useState, useEffect } from 'react';
import styles from './MensajeError.module.css';

const MensajeError = ({ imagen, titulo, mensajePrincipal, mensajeSecundario, alt }) => {
    
  return (
    <div className={styles.seccionVaciaContenedor}>
      {/* 1. Ilustración vectorial en tarjeta palpitante */}
      {imagen && (
        <img
          src={imagen}
          alt={alt}
          className={styles.imagenVacio}
        />
      )}

      {/* 2. Bloque de textos con jerarquía visual */}
      <div className={styles.contenidoTexto}>
        {titulo && (
          <h2 className={styles.tituloVacio}>
            {titulo}
          </h2>
        )}

        {mensajePrincipal && (
          <p className={styles.mensajePrincipal}>
            {mensajePrincipal}
          </p>
        )}

        {mensajeSecundario && (
          <p className={styles.mensajeSecundario}>
            {mensajeSecundario}
          </p>
        )}
      </div>
    </div>
  );
};

export default MensajeError;