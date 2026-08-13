import { useState } from 'react';

const SeccionesProducto = ({ infoSecciones = {}, producto = {} }) => {
  const secciones = [
    { id: 'descripcion', titulo: 'Descripción', contenido: infoSecciones.descripcion },
    { id: 'detalles', titulo: 'Detalles del producto', contenido: infoSecciones.detalles },
    { id: 'preguntas', titulo: 'Preguntas', contenido: infoSecciones.preguntas }
  ];

  const [seccionActiva, setSeccionActiva] = useState(secciones[0]?.id || null);

  if (!infoSecciones || Object.keys(infoSecciones).length === 0) return null;

  const seccionActual = secciones.find(s => s.id === seccionActiva);

  // Parsear detalles en pares label:value si vienen en formato de líneas
  const parseDetalles = (texto = '') => {
    const lines = texto.split('\n').map(l => l.trim()).filter(Boolean);
    const map = {};
    lines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        map[key.trim()] = rest.join(':').trim();
      }
    });
    return map;
  };

  const detallesMap = parseDetalles(infoSecciones.detalles || '');

  return (
    <div className="secciones-container">
      <div className="tabs-header">
        {secciones.map((seccion) => (
          <button
            key={seccion.id}
            onClick={() => setSeccionActiva(seccion.id)}
            className={`tab-btn ${seccionActiva === seccion.id ? 'activa' : ''}`}
          >
            {seccion.titulo}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {seccionActiva === 'descripcion' && (
          <div>
            <p className="descripcion-text">{infoSecciones.descripcion}</p>
          </div>
        )}

        {seccionActiva === 'detalles' && (
          <div>
            <table className="detalles-table">
              <tbody>
                <tr>
                  <td className="detalles-label">Estado</td>
                  <td className="detalles-value">{detallesMap['Estado'] || ''}</td>
                </tr>
                <tr>
                  <td className="detalles-label">Material</td>
                  <td className="detalles-value">{detallesMap['Material'] || ''}</td>
                </tr>
                <tr>
                  <td className="detalles-label">Medidas</td>
                  <td className="detalles-value">{detallesMap['Medidas'] || ''}</td>
                </tr>
                <tr>
                  <td className="detalles-label">Marca</td>
                  <td className="detalles-value">{producto.marca || detallesMap['Marca'] || ''}</td>
                </tr>
                <tr>
                  <td className="detalles-label">Publicado</td>
                  <td className="detalles-value">{detallesMap['Publicado'] || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {seccionActiva === 'preguntas' && (
          <p>{seccionActual?.contenido}</p>
        )}
      </div>
    </div>
  );
};

export default SeccionesProducto;