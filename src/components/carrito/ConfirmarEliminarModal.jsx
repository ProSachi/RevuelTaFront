export default function ConfirmarEliminarModal({ producto, onConfirmar, onCancelar }) {
  if (!producto) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal--pequena">
        <h2>¿Eliminar producto?</h2>
        <p>
          Vas a quitar <strong>{producto.nombre}</strong> de tu carrito.
        </p>
        <div className="modal__acciones">
          <button type="button" className="btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="button" className="btn-peligro" onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
