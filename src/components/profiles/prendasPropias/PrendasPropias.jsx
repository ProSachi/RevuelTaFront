
import TarjetaPrendas from '../tarjetaPrendas/TarjetaPrendas';
import styles from './PrendasPropias.module.css';

const PrendasPropias = ({ myProfile }) => {
  return (
    <div className={styles.seccionTabsAreaContenido}>
      <div className={styles.seccionTabsGridPrendas}>
        {/* Contenido dinámico (Tarjetas de prendas) */}
        <TarjetaPrendas 
          imagen={''} 
          titulo={'Camisa'} 
          precio={50000} 
          talla={'M'} 
          id={1} 
          usuarioLogueado={myProfile} 
        />
      </div>
    </div>
  );
};

export default PrendasPropias;