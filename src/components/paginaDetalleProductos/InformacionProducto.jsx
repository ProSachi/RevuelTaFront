import { useState } from 'react';

const InformacionProducto = ({ producto = {}, onAgregarCarrito, onProponerTrueque }) => {
  const tallasDisponibles = producto.tallas || [];
  const [tallaSeleccionada, setTallaSeleccionada] = useState(tallasDisponibles[0] || null);
  const [cantidad, setCantidad] = useState(1);
  const [agregadoAlCarrito, setAgregadoAlCarrito] = useState(false);
  const [estadoTrueque, setEstadoTrueque] = useState(false); 

  if (!producto || Object.keys(producto).length === 0) return null;

  const handleDecrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleIncrementar = () => {
    if (cantidad < producto.cantidadDisponible) setCantidad(cantidad + 1);
  };

  const handleAgregarClick = () => {
    onAgregarCarrito(producto, tallaSeleccionada, cantidad);
    setAgregadoAlCarrito(true);
    alert("¡Producto añadido al carrito con éxito!");
  };

  return (
    <div className="info-producto-container">
      <span className="producto-marca">{producto.marca}</span>
      <h1 className="producto-titulo">{producto.nombre}</h1>
      <span className="producto-vendedor">👤 {producto.vendedor} {producto.calificacion} </span>
      <span className="producto-precio">${producto.precio.toLocaleString()}</span>

      {/* Selección de Talla */}
      <div className="seccion-tallas">
        <label>TALLA</label>
        <div className="tallas-grid">
          {producto.tallas.map((talla) => (
            <button
              key={talla.id}
              onClick={() => setTallaSeleccionada(talla)}
              className={`talla-btn ${tallaSeleccionada?.id === talla.id ? 'seleccionada' : ''}`}
            >
              {talla.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Control de Cantidad */}
      <div className="seccion-cantidad">
        <label>CANTIDAD</label>
        <div className="control-cantidad">
          <button onClick={handleDecrementar} disabled={cantidad === 1}>-</button>
          <span>{cantidad}</span>
          <button onClick={handleIncrementar} disabled={cantidad >= producto.cantidadDisponible}>+</button>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="acciones-container">
        <button 
          onClick={handleAgregarClick} 
          className={`btn-carrito ${agregadoAlCarrito ? 'agregado' : ''}`}
          disabled={agregadoAlCarrito}
        >
          {agregadoAlCarrito ? 'Añadido al carrito' : 'Añadir al carrito'}
        </button>

        <button 
          onClick={() => {
            onProponerTrueque();
            setEstadoTrueque(true);
          }} 
          className="btn-trueque"
        >
          {estadoTrueque ? 'Trueque propuesto' : 'Proponer Trueque'}
        </button>
      </div>
    </div>
  );
};

export default InformacionProducto;