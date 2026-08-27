import React from 'react';
import styles from './ResenasPropias.module.css';
import BotonPerfilNavegacion from '../botonNavecionPerfil/BotonPerfilNavegacion';
import TarjetaResena from '../tarjetaReseña/TarjetaResena';
import { FaPlusCircle } from 'react-icons/fa';

const ResenasPropias = ({id}) => {
  return (
    <div className={styles.resenasPropiasContenedor}>
      {/* Barra superior de acción */}
      <div className={styles.resenasPropiasHeader}>
        <BotonPerfilNavegacion
          direccion={`/perfil/${id}/crear/reseña`}
          icono={FaPlusCircle}
          nombre={'Crear Reseña'}
          colorActivo="#1F5E4A"
        />
      </div>

      {/* Lista / Grilla de reseñas dinámicas */}
      <div className={styles.resenasPropiasGrid}>
        <TarjetaResena
          fotoPerfil={''}
          nombrePerfil={'Juan Zapata'}
          promedio={3}
          titulo={'Camisa'}
          comentario={'Excelente Prenda llego en muy buen estado'}
          direccion={'/perfil/3'}
        />
      </div>
    </div>
  );
};

export default ResenasPropias;