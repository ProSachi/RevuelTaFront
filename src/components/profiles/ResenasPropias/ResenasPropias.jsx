import React, { useEffect, useState } from 'react';
import styles from './ResenasPropias.module.css';
import BotonPerfilNavegacion from '../botonNavecionPerfil/BotonPerfilNavegacion';
import TarjetaResena from '../tarjetaReseña/TarjetaResena';
import { FaPlusCircle } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import LoadingComunity from '../loading/LoadingComunity';
import MensajeError from '../mensajeError/MensajeError';
import { reviewsServices } from '../../../services/reviewsServices/reviewsServices';
import { userServices } from '../../../services/userServices/userServices';
import { ratingServices } from '../../../services/ratingServices/ratingServices';
import sinResenas from '../../../assets/sinResenas.svg';
import imagenError from '../../../assets/errorserver.jpeg';
import { useConnectedUser } from '../../../context/ConnectedUser.context';

/*

  UUID id,
  String comentario,
  String titulo,
  LocalDate fecha,
  Boolean recomendado,
  Boolean editada,
  Boolean visible,
  UUID idAutor,
  UUID idUsuarioResenado

*/

const ResenasPropias = () => {

  const { id, myProfile } = useOutletContext();
  const { connectedUser } = useConnectedUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {

      try {

        const response = await reviewsServices.getAllReviewsForReviewedUser(id);
        setReviews(response);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          setReviews([]);
        } else {
          setError(true);
          setReviews([]);
        }
      } finally {

        setLoading(false);

      }

    };

    fetchReviews();

  }, [id]);

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

  /* 3. Estado de contenido (con o sin reseñas) */
  const reviewsExist = Array.isArray(reviews) && reviews.length > 0;

  return (
    <>

      <div className={styles.resenasPropiasContenedor}>
        {/* Barra superior de acción */}
        {id !== connectedUser.id && (
          <div className={styles.resenasPropiasHeader}>
            <BotonPerfilNavegacion
              direccion={`/perfil/${id}/crear/reseña`}
              state={{ backgroundLocation: location }}
              icono={FaPlusCircle}
              nombre={'Crear Reseña'}
              colorActivo="#1F5E4A"
            />
          </div>
        )}

        {

          reviewsExist ? (
            /* Lista / Grilla de reseñas dinámicas */
            <div className={styles.resenasPropiasGrid}>
              {reviews.map((review) => (
                <TarjetaResena
                  key={review.id}
                  fotoPerfil={review.autor?.color_avatar || ''}
                  nombrePerfil={review.autor?.nombre || 'Usuario'}
                  promedio={review.calificacion?.puntaje || 0}
                  titulo={review.titulo || 'Sin título'}
                  comentario={review.comentario || 'Sin comentario'}
                  direccion={`/${review.autor?.id}`}
                />
              ))}
            </div>

          ) : (

            <MensajeError
              imagen={sinResenas}
              alt={myProfile ? "Sin reseñas publicadas" : "Usuario sin reseñas"}
              titulo={
                myProfile
                  ? "AÚN NO TIENES NINGUNA RESEÑA."
                  : "NADIE HA RESEÑADO ESTE PERFIL AÚN."
              }
              mensajePrincipal={
                myProfile
                  ? "Aun no tienes ninguna reseña. ¡Tranquilo y sigue interactuando con la comunidad!"
                  : "¡Parece que tu perfil está muy solo! Anímate y crea tu primera reseña."
              }
              mensajeSecundario={
                myProfile ? "(entre mas interactues tendras reseñas mas pronto)" : null
              }
            />
          )

        }

      </div>

    </>
  );
};

export default ResenasPropias;