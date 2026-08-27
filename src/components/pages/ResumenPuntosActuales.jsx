
export const ResumenPuntosActuales = ({ saldoActual }) => {
  return (
    <div className="resumen-puntos">
      <div>
        <span className="label-gris">Saldo actual</span>
        <p className="saldo-valor">{saldoActual} <span className="saldo-unidad">puntos</span></p>
      </div>
      <div className="saldo-icono">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" stroke="none">
          <path d="M12 2l2.9 6.26L21.8 9l-5 4.87L18.2 21 12 17.27 5.8 21l1.4-7.13L2.2 9l6.9-.74z" />
        </svg>
      </div>
    </div>
  );
};
