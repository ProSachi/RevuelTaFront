import { useState } from 'react';
import VentanaModalDejarResena from './modals/Resena/VentanaModalDejarResena';

export default function TestModalResena() {
  const [isOpen, setIsOpen] = useState(false);
  const [mostrarAlertaFin, setMostrarAlertaFin] = useState(false);

  const pedidoMock = { id: '005', tipo: 'Trueque' };
  const vendedoresMock = [
    { id: 1, nombre: 'María Fernanda López' },
    { id: 2, nombre: 'Carlos Andrés Ramírez' }
  ];
  const [vendedoresResenados, setVendedoresResenados] = useState([]);

  const handleResenaEnviada = (vendedorId, finalizarFlujo) => {
    console.log(`Reseña enviada para el vendedor ID: ${vendedorId}`);
    if (finalizarFlujo) {
      setIsOpen(false);
      setMostrarAlertaFin(true);
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

      {/* Modal principal para dejar reseña */}
      <VentanaModalDejarResena
        isOpen={isOpen}
        onCerrar={() => setIsOpen(false)}
        pedido={pedidoMock}
        vendedoresDisponibles={vendedoresMock}
        vendedoresYaResenados={vendedoresResenados}
        onResenaEnviada={handleResenaEnviada}
      />

      {mostrarAlertaFin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(21, 32, 27, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            color: '#15201b',
            width: '100%',
            maxWidth: '400px',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(21, 32, 27, 0.2)',
            textAlign: 'center'
          }}>
            <h5 className="fw-bold mb-3">Flujo Finalizado</h5>
            <p className="mb-4">'Ver mi reseña'</p>
            <button 
              className="btn text-white px-4 py-2"
              style={{ backgroundColor: '#1f5e4a' }}
              onClick={() => setMostrarAlertaFin(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}