// src/components/profiles/botonNavecionPerfil/BotonPerfilNavegacion.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BotonPerfilNavegacionEstilo.module.css';

const BotonPerfilNavegacion = ({ 
  direccion, 
  icono: IconComponent, // Renombrado directamente en los parámetros
  nombre, 
  colorBase = '#FFFFFF', 
  colorActivo = '#1F5E4A',
  colorTextoBase = '#121212',
  colorTextoActivo = '#FFFFFF',
  state
}) => {
  return (
    <div>
      <NavLink
        to={direccion}
        state={state}
        // Usamos la función de estilo de NavLink para alternar colores según el estado activo
        style={({ isActive }) => ({
          '--bg-actual': isActive ? colorActivo : colorBase,
          '--text-actual': isActive ? colorTextoActivo : colorTextoBase,
        })}
        className={({ isActive }) => 
          `${styles.boton} ${isActive ? styles.activo : ''}`
        }
      >
        {IconComponent && <IconComponent className={styles.icono} />}
        <span>{nombre}</span>
      </NavLink>
    </div>
  );
};

export default BotonPerfilNavegacion;