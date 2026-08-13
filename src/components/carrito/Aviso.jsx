export default function Aviso({ mensaje, onCerrar }) {
  if (!mensaje) return null

  return (
    <div className="aviso" role="status">
      <span>{mensaje}</span>
      <button type="button" onClick={onCerrar} aria-label="Cerrar aviso">
        ✕
      </button>
    </div>
  )
}
