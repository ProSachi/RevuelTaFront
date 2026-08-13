import { useState } from 'react';

const GaleriaProducto = ({ imagenes = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagenActiva = imagenes[activeIndex] || imagenes[0] || null;

  return (
    <div className="galeria-container">
      <div className="imagen-principal-wrapper">
        <img
          src={imagenActiva?.url || ''}
          alt="Producto principal"
          className="imagen-principal"
        />
      </div>
      <div className="miniaturas-container">
        {imagenes.map((imagen, idx) => (
          <button
            key={imagen.id}
            onClick={() => setActiveIndex(idx)}
            className={`miniatura-btn ${imagenActiva?.id === imagen.id ? 'activa' : ''}`}
          >
            <img src={imagen.url} alt="miniatura" className="miniatura-img" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GaleriaProducto;
