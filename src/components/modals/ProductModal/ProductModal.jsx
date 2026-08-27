import "./ProductModal.css";

function ProductModal({ product, isOpen, onClose, onProposeTrade }) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="product-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.nombre}
    >
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="product-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className="product-modal__title">{product.nombre}</h2>

        <div className="product-modal__images">
          {(product.imagenes?.length
            ? product.imagenes
            : ["https://via.placeholder.com/400x500"]
          ).map((img, i) => (
            <img
              key={i}
              className="product-modal__image"
              src={img}
              alt={`${product.nombre} - imagen ${i + 1}`}
            />
          ))}
        </div>

        <p className="product-modal__price">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(product.precio)}
        </p>

        <div className="product-modal__details">
          <div className="product-modal__detail">
            <span className="product-modal__detail-label">Tallas</span>
            <span className="product-modal__detail-value">
              {product.tallas?.join(", ") || "Única"}
            </span>
          </div>
          <div className="product-modal__detail">
            <span className="product-modal__detail-label">Disponibles</span>
            <span className="product-modal__detail-value">
              {product.cantidadDisponible ?? 0}
            </span>
          </div>
          <div className="product-modal__detail product-modal__detail--lote">
            <span className="product-modal__detail-label">Lote</span>
            <span className="product-modal__detail-value product-modal__lote">
              {product.lote || "—"}
            </span>
          </div>
        </div>

        {product.truequesDeInteres?.length > 0 && (
          <div className="product-modal__trades">
            {product.truequesDeInteres.map((t, i) => (
              <span key={i} className="product-modal__tag">
                {t}
              </span>
            ))}
          </div>
        )}

        <button
          className="product-modal__action"
          onClick={onProposeTrade}
          disabled={!product.cantidadDisponible}
        >
          Proponer Trueque
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
