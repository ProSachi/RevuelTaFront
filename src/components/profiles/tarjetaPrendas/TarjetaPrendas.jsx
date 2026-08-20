import React from 'react';
import { HiPencil } from 'react-icons/hi2';
import styles from './TarjetaPrendas.module.css';
import BotonPerfilNavegacion from '../botonNavecionPerfil/BotonPerfilNavegacion';
import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

const TarjetaPrendas = ({ imagen, titulo, precio, talla, id, usuarioLogueado }) => {
  // Formato para mostrar precios en pesos ($)
  const precioFormateado = typeof precio === 'number'
    ? `$${precio.toLocaleString('es-CO')}`
    : precio;

  return (
    <div className={styles.tarjeta}>
      <div className={styles.contenedorImagen}>
        {/* Botón Editar flotante */}
        {usuarioLogueado && (
          <div className={styles.botonFlotante}>
            <BotonPerfilNavegacion
              nombre="Editar"
              direccion={`/prendas/editar/${id}`}
              icono={HiPencil}
              colorActivo="#1F5E4A"
            />
          </div>
        )}

        {/* Imagen del producto */}
        {imagen ? (
          <img
            src={imagen}
            alt={titulo || 'Imagen de producto'}
            className={styles.imagen}
          />
        ) : (
          <svg className={styles.placeholder} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Información del Producto */}
      <div className={styles.info}>
        <h3 className={styles.titulo}>
          {titulo || 'Nombre de producto'}
        </h3>

        <span className={styles.talla}>
          Talla: {talla || 'N/A'}
        </span>

        <span className={styles.precio}>
          {precioFormateado || '$0'}
        </span>
      </div>

      {/* Botones de acción si no es el perfil propio */}
      {!usuarioLogueado && (
        <div className={styles.acciones}>
          <BotonPerfilNavegacion
            nombre=""
            direccion={`/comprar/${id}`}
            icono={FaShoppingCart}
            colorActivo="#1F5E4A"
          />
          <BotonPerfilNavegacion
            nombre=""
            direccion={`/trueque/${id}`}
            icono={HiOutlineSwitchHorizontal}
            colorActivo="#1F5E4A"
          />
        </div>
      )}
    </div>
  );
};

export default TarjetaPrendas;