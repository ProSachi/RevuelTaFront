import DetallePedido from '../pages/Pedidos/DetallePedido';

export default function TestDetallePedido() {
  return (
    <div>
      <div style={{ backgroundColor: '#efe9dc', padding: '10px 20px', borderBottom: '1px solid #ded6c5', textAlign: 'center' }}>
        <strong>Prueba de la HU LOG-PD04 (Detalle del Pedido)</strong>
      </div>
      <DetallePedido />
    </div>
  );
}