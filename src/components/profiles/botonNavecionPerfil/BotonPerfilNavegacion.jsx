import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BotonPerfilNavegacionEstilo.module.css';

const BotonPerfilNavegacion = ({ 
  direccion, 
  icono, 
  nombre, 
  colorBase = '#FFFFFF', 
  colorActivo = '#1F5E4A',
  colorTextoBase = '#121212',
  colorTextoActivo = '#FFFFFF'
}) => {
  const IconComponent = icono;

  // Inyectamos las variables CSS inline para consumirlas en el módulo CSS
  const estilosDinamicos = {
    '--bg-base': colorBase,
    '--bg-activo': colorActivo,
    '--text-base': colorTextoBase,
    '--text-activo': colorTextoActivo,
  };

  return (
    <div>
      <Link
        to={direccion}
        className={styles.boton}
        style={estilosDinamicos}
      >
        {IconComponent && <IconComponent className={styles.icono} />}
        <span>{nombre}</span>
      </Link>
    </div>
  );
};

export default BotonPerfilNavegacion;