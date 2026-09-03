import { formatearMoneda } from '../../utils/formatoMoneda';
import { BiTransfer } from 'react-icons/bi';
import styles from '../../pages/Pedidos/DetallePedido.module.css';

export default function ResumenPedidoTrueque({ id, fechaRealizacion, tipo, estado, prendaPropia, prendaRecibida }) {
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardHeader}>
        <div>
          <h4 className="fw-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Pedido #{id}</h4>
          <p className="text-muted small mb-1">Realizado el {fechaRealizacion}</p>
          <p className="text-muted small mb-0">Tipo de pedido: <strong>{tipo}</strong></p>
        </div>
        <span className={styles.badgeEstado}>📦 {estado}</span>
      </div>

      <div className={styles.prendasGrid}>
        {/* Prenda Propia */}
        <div className={styles.prendaCard}>
          <img src={prendaPropia.imagen} alt={prendaPropia.nombre} className={styles.prendaImg} />
          <div>
            <small className="text-muted d-block">Tu prenda</small>
            <h6 className="fw-bold mb-1">{prendaPropia.nombre}</h6>
            <p className="text-success fw-bold mb-1">{formatearMoneda(prendaPropia.valor)}</p>
            <small className="text-muted d-block">{prendaPropia.marca} · {prendaPropia.talla}</small>
            <small className="text-muted">👤 {prendaPropia.usuario}</small>
          </div>
        </div>

        {/* Icono Trueque */}
        <div className={styles.transferIcon}>
          <BiTransfer />
        </div>

        {/* Prenda Recibida */}
        <div className={styles.prendaCard}>
          <img src={prendaRecibida.imagen} alt={prendaRecibida.nombre} className={styles.prendaImg} />
          <div>
            <small className="text-muted d-block">Prenda que recibes</small>
            <h6 className="fw-bold mb-1">{prendaRecibida.nombre}</h6>
            <p className="text-success fw-bold mb-1">{formatearMoneda(prendaRecibida.valor)}</p>
            <small className="text-muted d-block">{prendaRecibida.marca} · {prendaRecibida.talla}</small>
            <small className="text-muted">👤 {prendaRecibida.usuario}</small>
          </div>
        </div>
      </div>
    </div>
  );
}