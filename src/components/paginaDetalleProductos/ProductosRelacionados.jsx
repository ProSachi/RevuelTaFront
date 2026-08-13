const ProductosRelacionados = ({ productos, onSeleccionarProducto }) => {
  if (!productos) return null;

  return (
    <div className="relacionados-container">
      <h3 className="relacionados-titulo">TAMBIÉN TE PODRÍA INTERESAR</h3>
      <div className="relacionados-grid">
        {productos.map((prod) => {
          const imageUrl = prod.imagen || prod.imagenes?.[0]?.url || '/placeholder.png';
          return (
            <div 
              key={prod.id} 
              className="tarjeta-producto"
              onClick={() => onSeleccionarProducto(prod.id)}
            >
              <img src={imageUrl} alt={prod.nombre} className="tarjeta-img" />
              <div className="tarjeta-body">
                <h4 className="tarjeta-nombre">{prod.nombre}</h4>
                <span className="tarjeta-precio">${(prod.precio || 0).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductosRelacionados;