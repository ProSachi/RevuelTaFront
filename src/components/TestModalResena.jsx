import { useState } from 'react';
import VentanaModalDejarResena from './modals/Resena/VentanaModalDejarResena';

export default function TestModalResena() {
  const [isOpen, setIsOpen] = useState(false);

  const pedidoMock = { id: '005', tipo: 'Trueque' };
  const vendedoresMock = [
    { id: 1, nombre: 'María Fernanda López' },
    { id: 2, nombre: 'Carlos Andrés Ramírez' }
  ];
  const [vendedoresResenados, setVendedoresResenados] = useState([]);

  const handleResenaEnviada = (vendedorId, finalizarFlujo) => {
    console.log(`Reseña enviada para el vendedor ID: ${vendedorId}`);
    if (finalizarFlujo) {
      alert("Flujo de reseñas finalizado. El botón pasaría a 'Ver mi reseña'.");
      setIsOpen(false);
    } else {
      setVendedoresResenados(prev => [...prev, vendedorId]);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Prueba de la HU LOG-PD03 (Modal Dejar Reseña)</h2>
      <button 
        className="btn text-white mt-3 px-4 py-2"
        style={{ backgroundColor: '#1f5e4a' }}
        onClick={() => {
          setVendedoresResenados([]);
          setIsOpen(true);
        }}
      >
        Probar "Dejar Reseña"
      </button>

      <VentanaModalDejarResena
        isOpen={isOpen}
        onCerrar={() => setIsOpen(false)}
        pedido={pedidoMock}
        vendedoresDisponibles={vendedoresMock}
        vendedoresYaResenados={vendedoresResenados}
        onResenaEnviada={handleResenaEnviada}
      />
    </div>
  );
}