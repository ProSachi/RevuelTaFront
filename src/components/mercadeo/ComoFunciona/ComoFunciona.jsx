import styles from './ComoFunciona.module.css';

const pasos = [
  { id: 1, texto: 'Gana puntos al realizar trueques y acciones' },
  { id: 2, texto: 'Acumula puntos en tu cuenta' },
  { id: 3, texto: 'Canjea puntos por descuentos o beneficios' },
];

const ComoFunciona = () => {
  return (
    <div className={`${styles.root} card shadow-sm border-0 p-4 h-100`}>
      <h6 className={`${styles.title} fw-bold mb-3`}>
        ¿Cómo funciona?
      </h6>

      <div className={`${styles.list} d-flex flex-column gap-3`}>
        {pasos.map((paso) => (
          <div key={paso.id} className={`${styles.item} d-flex align-items-center gap-2`}>
            <span className={`${styles.step} d-flex justify-content-center align-items-center rounded-circle flex-shrink-0 fw-bold small`}>
              {paso.id}
            </span>
            <span className={`${styles.text} small text-secondary`}>{paso.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComoFunciona;
