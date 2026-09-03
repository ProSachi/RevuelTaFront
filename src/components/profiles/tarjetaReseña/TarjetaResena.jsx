
import { Link } from 'react-router-dom';
import CalificacionEstrellas from '../estrellasCalificacion/CalificacionEstrellas';
import styles from './TarjetaResena.module.css';
import { FaUser } from 'react-icons/fa';

const TarjetaResena = ({ fotoPerfil, nombrePerfil, promedio, titulo, comentario, direccion = '#' }) => {
  return (
    <div className={styles.tarjeta}>
      {/* Encabezado: Avatar, Nombre y Estrellas */}
      <div className={styles.encabezado}>
        <div className={styles.avatarContenedor}>
          <Link to={direccion} className={styles.enlacePerfil}>
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt={nombrePerfil || "Foto de perfil"}
                className={styles.avatar}
              />
            ) : (
              <FaUser className={styles.iconoAvatar} />
            )}
          </Link>
        </div>

        <div className={styles.infoUsuario}>
          <Link to={direccion} className={styles.enlacePerfil}>
            <span className={styles.nombrePerfil}>
              {nombrePerfil || "Nombre de comprador"}
            </span>
          </Link>

          <CalificacionEstrellas promedio={promedio} tamano="0.875rem" />
        </div>
      </div>

      {/* Contenido: Título y Comentario */}
      <div className={styles.contenido}>
        {titulo && <h3 className={styles.titulo}>{titulo}</h3>}
        <p className={styles.comentario}>
          {comentario || "Sin comentario."}
        </p>
      </div>
    </div>
  );
};

export default TarjetaResena;