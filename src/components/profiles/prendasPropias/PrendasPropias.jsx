// Importa tu ilustración desde la carpeta assets
import imagenError from '../../../assets/errorserver.jpeg';

import React, { useEffect, useState, useCallback } from 'react';
import TarjetaPrendas from '../tarjetaPrendas/TarjetaPrendas';
import styles from './PrendasPropias.module.css';
import { useOutletContext } from 'react-router-dom';
import { garmentsServices } from '../../../services/garmentsServices/garmentsServices';
import LoadingComunity from '../loading/LoadingComunity';
import aunSinPrendas from '../../../assets/armarioVacio.svg';
import MensajeError from '../mensajeError/MensajeError';


const PrendasPropias = () => {
  const { id, myProfile } = useOutletContext();
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGarments = useCallback(async () => {
    if (!id) return;

    try {
      const garmentData = await garmentsServices.getGarmentsForUserId(id);

      const listaPrendas = Array.isArray(garmentData)
        ? garmentData
        : (garmentData?.content || []);

      setGarments(listaPrendas);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setGarments([]);
      } else {
        setError(true);
        setGarments([]);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGarments();
  }, [fetchGarments]);

  // 1. Estado de carga
  if (loading) {
    return (
      <div className={styles.seccionTabsAreaContenido}>
        <LoadingComunity />;
      </div>
    );
  }

  // 2. Estado de error
  if (error) {
    return (
      <div className={styles.seccionTabsAreaContenido}>
        <MensajeError
          imagen={imagenError}
          alt={"Error al comunicarse con el servidor"}
          titulo={"¡ERROR CRITICO DEL SERVIDOR!"}
          mensajePrincipal={"Parece que hubo un problema al conectar con el servidor... Intentalo más tarde."}
          mensajeSecundario={"(Trabajamos para que esto no vuelva a suceder)"}
        />
      </div>
    )
  }

  const tienePrendas = Array.isArray(garments) && garments.length > 0;

  // 3. Estado de contenido (con o sin prendas)
  return (
    <div className={styles.seccionTabsAreaContenido}>

      {/* CONTENIDO DE LA PESTAÑA */}
      {
        tienePrendas ? (
          <div className={styles.seccionTabsGridPrendas}>
            {garments.map((garment) => (
              <TarjetaPrendas
                key={garment.id}
                imagen={garment.avatar || garment.imagen}
                titulo={garment.titulo}
                precio={garment.precio}
                talla={garment.talla}
                id={garment.id}
                usuarioLogueado={myProfile}
              />
            ))}
          </div>
        ) : (

          <MensajeError
            imagen={aunSinPrendas}
            alt={myProfile ? "Sin prendas publicadas" : "Usuario sin prendas"}
            titulo={
              myProfile
                ? "AÚN NO HAS SUBIDO NINGUNA PRENDA"
                : "ESTE ARMARIO ESTÁ VACÍO"
            }
            mensajePrincipal={
              myProfile
                ? "¡Parece que tu armario está muy solo! Anímate y sube tu ropa con historia."
                : "Parece que aquí no hay nada que ver por el momento..."
            }
            mensajeSecundario={
              myProfile ? "(Vamos, tu percha te está esperando)" : null
            }
          />

        )
      }
      
    </div>
  );
};

export default PrendasPropias;