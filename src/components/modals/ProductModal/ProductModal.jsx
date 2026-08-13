function ProductModal({ product, isOpen, onClose, onProposeTrade }) {
  if (!isOpen || !product) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "400px" }}>
        <button onClick={onClose}>Cerrar (X)</button>
        <h2>{product.nombre}</h2>
        <p>Precio: ${product.precio}</p>
        <button onClick={onProposeTrade}>Proponer Trueque</button>
      </div>
    </div>
  );
}

export default ProductModal;