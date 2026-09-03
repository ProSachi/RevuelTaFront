import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResumenPedidoTrueque from '../../components/pedidos/ResumenPedidoTrueque';
import InformacionEntregaTrueque from '../../components/pedidos/InformacionEntregaTrueque';
import ResumenEconomicoTrueque from '../../components/pedidos/ResumenEconomicoTrueque';
import styles from './DetallePedido.module.css';
import { RUTAS } from '../../constants/rutas';

export default function DetallePedido() {
  const navigate = useNavigate();
  const { pedidoId } = useParams();

  // Inicializamos el estado directamente sin necesidad de useEffect
  const [pedido] = useState(() => ({
    id: pedidoId || '005',
    fechaRealizacion: '26 ago 2026',
    tipo: 'Trueque',
    estado: 'Enviado',
    prendaPropia: {
      nombre: 'Camiseta gris',
      valor: 50000,
      marca: 'Zara',
      talla: 'M',
      usuario: 'Tú',
      imagen: 'https://res.cloudinary.com/ihe8jaok/image/upload/v1788310066/CamisetaGris.png'
    },
    prendaRecibida: {
      nombre: 'Camibuso azul',
      valor: 50000,
      marca: 'Levi\'s',
      talla: 'M',
      usuario: 'N.Comprador',
      imagen: 'https://res.cloudinary.com/ihe8jaok/image/upload/v1788310066/CamisetaAzul1.png'
    },
    entregaPropia: {
      puntoAcopio: 'Punto Re-vuelta Chapinero · Cra 0 #0-0 · Abierto hasta las 8 p.m.',
      transportista: 'Envios Rapidos SAS',
      costoEnvio: 10000
    },
    entregaContraparte: {
      nombreContraparte: 'N.Comprador',
      puntoAcopio: 'Punto Re-vuelta Chapinero · Cra 0 #0-0 · Abierto hasta las 8 p.m.',
      transportista: 'Envios Rapidos SAS',
      costoEnvio: 10000
    },
    resumenEconomico: {
      valorPrendaPropia: 50000,
      valorPrendaRecibida: 50000,
      diferenciaTrueque: 0,
      costoEnvio: 10000,
      totalPedido: 10000
    }
  }));

  if (!pedido) {
    return <div className="text-center py-5">Cargando detalle del pedido...</div>;
  }

  return (
    <div className={styles.detalleContainer}>
      <div className={styles.contentWrapper}>
        
        <h2 className={styles.title}>Detalle del pedido</h2>

        {pedido.tipo === 'Trueque' && (
          <>
            <ResumenPedidoTrueque 
              id={pedido.id}
              fechaRealizacion={pedido.fechaRealizacion}
              tipo={pedido.tipo}
              estado={pedido.estado}
              prendaPropia={pedido.prendaPropia}
              prendaRecibida={pedido.prendaRecibida}
            />

            <InformacionEntregaTrueque 
              entregaPropia={pedido.entregaPropia}
              entregaContraparte={pedido.entregaContraparte}
            />

            <ResumenEconomicoTrueque 
              valorPrendaPropia={pedido.resumenEconomico.valorPrendaPropia}
              valorPrendaRecibida={pedido.resumenEconomico.valorPrendaRecibida}
              diferenciaTrueque={pedido.resumenEconomico.diferenciaTrueque}
              costoEnvio={pedido.resumenEconomico.costoEnvio}
              totalPedido={pedido.resumenEconomico.totalPedido}
            />
          </>
        )}

        <div className={styles.actionsBar}>
          <button 
            className={styles.btnVolver}
            onClick={() => navigate(RUTAS.PEDIDOS)}
          >
            ← Volver a Mis Pedidos
          </button>

          <button 
            className={styles.btnRastrear}
            onClick={() => navigate(`${RUTAS.SEGUIMIENTO_ENVIO}/${pedido.id}`)}
          >
            Rastrear envío
          </button>
        </div>

      </div>
    </div>
  );
}