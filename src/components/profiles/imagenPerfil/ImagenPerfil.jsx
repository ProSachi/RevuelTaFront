
import styles from './ImagenPerfil.module.css';
import { FaUser } from 'react-icons/fa';

const ImagenPerfil = ({ imagen, nombreUsuario, tamano = '6rem' }) => {
  return (
    <div className={styles.contenedor} style={{ '--avatar-size': tamano }}>
      {imagen ? (
        <img
          src={imagen}
          alt={nombreUsuario || 'Foto de perfil'}
          className={styles.imagen}
        />
      ) : (
        <div className={styles.avatarFallback}>
          <FaUser className={styles.iconoAvatar} />
        </div>
      )}
    </div>
  );
};

export default ImagenPerfil;