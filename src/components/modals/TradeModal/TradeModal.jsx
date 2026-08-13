function TradeModal({ targetProduct, userGarments, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "400px" }}>
        <button onClick={onClose}>Cerrar (X)</button>
        <h2>Trueque por: {targetProduct?.nombre}</h2>
        <p>Tienes {userGarments.length} prendas disponibles para ofrecer</p>
      </div>
    </div>
  );
}

export default TradeModal;