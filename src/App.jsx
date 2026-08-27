import { useState } from 'react';
import { VentanaModalConfirmarCanje } from './components/pages/VentanaModalConfirmarCanje.jsx';
import { VentanaModalHistorialPuntos } from './components/pages/VentanaModalHistorialPuntos.jsx';
import { usePuntos } from './context/usePuntos.js';

const ofertaEjemplo = {
  id: 1,
  titulo: '$10.000 COP',
  condicion: 'En compras desde $50.000',
  descripcion: 'Aplica en tiendas participantes.',
  costoPuntos: 500
};


const accionesQueOtorganPuntos = [
  { tipo: 'prenda', motivo: 'Prenda publicada', puntos: 20, etiqueta: 'Publicar prenda' },
  { tipo: 'trueque', motivo: 'Trueque realizado', puntos: 100, etiqueta: 'Realizar trueque' },
  { tipo: 'resena', motivo: 'Reseña enviada', puntos: 10, etiqueta: 'Enviar reseña' },
  { tipo: 'amigo', motivo: 'Amigo invitado', puntos: 50, etiqueta: 'Invitar amigo' },
];

export default function App() {
  const [verModal, setVerModal] = useState(false);
  const [verHistorial, setVerHistorial] = useState(false);

  const { saldoActual, historial, cargando, otorgarPuntos, descontarPuntos } = usePuntos();

  const handleCanjeExitoso = (oferta) => {
    descontarPuntos(oferta.costoPuntos);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Descuentos y Campañas</h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '360px',
          padding: '12px 16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
          marginBottom: '20px'
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Mis puntos disponibles:</strong>{' '}
          {cargando ? 'Cargando...' : `${saldoActual} puntos`}
        </p>
        <button
          onClick={() => setVerHistorial(true)}
          disabled={cargando}
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            color: '#333',
            border: '1px solid #333',
            borderRadius: '4px',
            cursor: cargando ? 'default' : 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            opacity: cargando ? 0.5 : 1
          }}
        >
          Historial de puntos
        </button>
      </div>

      <button 
        onClick={() => setVerModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Canjear Oferta
      </button>

      
      <div style={{ marginTop: '32px', maxWidth: '420px' }}>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
          Simular acciones de otras partes del sistema que otorgan puntos:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {accionesQueOtorganPuntos.map((accion) => (
            <button
              key={accion.tipo}
              onClick={() => otorgarPuntos(accion)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {accion.etiqueta} (+{accion.puntos})
            </button>
          ))}
        </div>
      </div>

      {verModal && (
        <VentanaModalConfirmarCanje
          oferta={ofertaEjemplo}
          saldoActual={saldoActual}
          onCerrar={() => setVerModal(false)}
          onCanjeExitoso={handleCanjeExitoso}
        />
      )}

      {verHistorial && (
        <VentanaModalHistorialPuntos
          saldoActual={saldoActual}
          movimientos={historial}
          onCerrar={() => setVerHistorial(false)}
        />
      )}
    </div>
  );
}
