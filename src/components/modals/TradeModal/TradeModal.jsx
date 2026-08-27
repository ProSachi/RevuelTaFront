import { useState } from "react";
import "./TradeModal.css";

function TradeModal({ targetProduct, userGarments, isOpen, onClose, onSubmit }) {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!isOpen) return null;

  const toggleGarment = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const thumbnail = targetProduct?.imagenes?.[0];

  return (
    <div
      className="trade-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Trueque por ${targetProduct?.nombre || ""}`}
    >
      <div className="trade-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="trade-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className="trade-modal__header">
          {thumbnail && (
            <img
              className="trade-modal__thumbnail"
              src={thumbnail}
              alt={targetProduct?.nombre}
            />
          )}
          <div>
            <h2 className="trade-modal__title">
              Trueque por: {targetProduct?.nombre}
            </h2>
            <p className="trade-modal__subtitle">
              Tienes <strong>{userGarments.length}</strong> prendas disponibles
              para ofrecer
            </p>
          </div>
        </div>

        {userGarments.length === 0 ? (
          <p className="trade-modal__empty">
            No tienes prendas disponibles para ofrecer.
          </p>
        ) : (
          <div className="trade-modal__grid">
            {userGarments.map((garment) => (
              <div
                key={garment.id}
                className={`trade-modal__garment${
                  selectedIds.includes(garment.id)
                    ? " trade-modal__garment--selected"
                    : ""
                }`}
                onClick={() => toggleGarment(garment.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleGarment(garment.id);
                  }
                }}
              >
                <img src={garment.imagen} alt={garment.nombre} />
                <p className="trade-modal__garment-name">{garment.nombre}</p>
                <p className="trade-modal__garment-price">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(garment.precio)}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="trade-modal__footer">
          <button className="trade-modal__btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="trade-modal__btn trade-modal__btn--primary"
            disabled={selectedIds.length === 0}
            onClick={() => onSubmit?.(selectedIds)}
          >
            Enviar propuesta
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
