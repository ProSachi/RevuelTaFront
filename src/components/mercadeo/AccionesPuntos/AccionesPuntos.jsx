import styles from './AccionesPuntos.module.css';

const acciones = [
  { id: 1, accion: 'Publicar una prenda', puntos: '+20 pts', icono: 'bi-bag-plus' },
  { id: 2, accion: 'Realizar trueque', puntos: '+100 pts', icono: 'bi-arrow-left-right' },
  { id: 3, accion: 'Dejar reseñas después de una compra', puntos: '+10 pts', icono: 'bi-star' },
  { id: 4, accion: 'Invitar a un amigo', puntos: '+50 pts', icono: 'bi-people' },
];

const AccionesPuntos = () => {
  return (
    <div className={`${styles.root} card shadow-sm border-0 p-4`}>
      <h6 className={`${styles.title} fw-bold mb-3`}>
        Acciones que te dan puntos
      </h6>
      <div className={`${styles.list} d-flex flex-column gap-3`}>
        {acciones.map((item) => (
          <div key={item.id} className={`${styles.item} d-flex justify-content-between align-items-center`}>
            <div className={`${styles.meta} d-flex align-items-center gap-2`}>
              <div className={`${styles.iconWrap} d-flex justify-content-center align-items-center rounded-circle flex-shrink-0`}>
                <i className={`bi ${item.icono} small`}></i>
              </div>
              <span className={`${styles.label} small text-secondary`}>{item.accion}</span>
            </div>
            <span className={`${styles.points} fw-bold small text-nowrap ms-2`}>
              {item.puntos}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccionesPuntos;
