import { useEffect, useState } from 'react'
import { obtenerVendedoresPedido } from '../data/vendedores'
import { crearResena, obtenerVendedoresResenados } from '../data/resenas'
import './VentanaModalDejarResena.css'

const VentanaModalDejarResena = ({ pedidoId, onCerrar, onFlujoFinalizado }) => {
  const vendedoresPedido = obtenerVendedoresPedido(pedidoId)

  const [vendedoresResenados, setVendedoresResenados] = useState(() =>
    obtenerVendedoresResenados(pedidoId)
  )
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState('')
  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState('')
  const [fotos, setFotos] = useState([])
  const [error, setError] = useState('')

  const vendedoresDisponibles = vendedoresPedido.filter(
    (vendedor) => !vendedoresResenados.includes(vendedor.id)
  )

  useEffect(() => {
    if (vendedoresDisponibles.length === 1) {
      setVendedorSeleccionado(vendedoresDisponibles[0].id)
    }
  }, [vendedoresResenados])

  const limpiarFormulario = () => {
    setVendedorSeleccionado('')
    setCalificacion(0)
    setComentario('')
    setFotos([])
    setError('')
  }

  const manejarSeleccionFotos = (evento) => {
    const archivos = Array.from(evento.target.files).map((archivo) => ({
      id: crypto.randomUUID(),
      nombre: archivo.name,
      url: URL.createObjectURL(archivo),
    }))
    setFotos((actuales) => [...actuales, ...archivos])
  }

  const eliminarFoto = (id) => {
    setFotos((actuales) => actuales.filter((foto) => foto.id !== id))
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    if (calificacion === 0) {
      setError('Selecciona una calificación para poder enviar tu reseña')
      return
    }

    if (!vendedorSeleccionado) {
      setError('Selecciona el vendedor que deseas reseñar')
      return
    }

    setError('')

    crearResena({
      pedidoId,
      vendedorId: vendedorSeleccionado,
      calificacion,
      comentario,
      fotos: fotos.map((foto) => foto.nombre),
    })

    const nuevosResenados = [...vendedoresResenados, vendedorSeleccionado]
    setVendedoresResenados(nuevosResenados)
    window.alert('¡Gracias! Tu reseña fue registrada.')

    const pendientes = vendedoresPedido.filter(
      (vendedor) => !nuevosResenados.includes(vendedor.id)
    )

    if (pendientes.length === 0) {
      onFlujoFinalizado(pedidoId)
      onCerrar()
      return
    }

    const continuar = window.confirm(
      '¿Deseas reseñar a otro vendedor de este pedido?'
    )

    if (continuar) {
      limpiarFormulario()
    } else {
      onFlujoFinalizado(pedidoId)
      onCerrar()
    }
  }

  return (
    <div className="vmdr-backdrop">
      <div className="vmdr-modal">
        <div className="vmdr-header">
          <h2 className="vmdr-title">Califica tu compra</h2>
          <button
            type="button"
            onClick={onCerrar}
            className="vmdr-close-btn"
            aria-label="Cerrar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={manejarEnvio} className="vmdr-form">
          <div>
            <label className="vmdr-label-secondary">
              Selecciona el vendedor a reseñar
            </label>
            <select
              value={vendedorSeleccionado}
              onChange={(evento) => setVendedorSeleccionado(evento.target.value)}
              disabled={vendedoresDisponibles.length === 1}
              className="vmdr-select"
            >
              <option value="">Selecionar el Vendedor a reseñar</option>
              {vendedoresDisponibles.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="vmdr-rating-title">Califícanos</p>
            <div className="vmdr-stars-container">
              {[1, 2, 3, 4, 5].map((valor) => (
                <button
                  key={valor}
                  type="button"
                  onClick={() => setCalificacion(valor)}
                  aria-label={`${valor} estrellas`}
                  className="vmdr-star-btn"
                >
                  <span className={valor <= calificacion ? 'vmdr-star-active' : 'vmdr-star-inactive'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="vmdr-label-text">
              Cuéntanos tu experiencia
            </label>
            <textarea
              value={comentario}
              onChange={(evento) => setComentario(evento.target.value)}
              rows={3}
              placeholder="¿Como era la prenda comparada a las fotos? ¿Como fue el envío?"
              className="vmdr-textarea"
            />
          </div>

          <div>
            <label className="vmdr-label-text">
              Subir fotos (Opcional)
            </label>
            <div className="vmdr-photo-list">
              {fotos.map((foto) => (
                <div key={foto.id} className="vmdr-photo-item">
                  <img src={foto.url} alt={foto.nombre} className="vmdr-photo-preview" />
                  <button
                    type="button"
                    onClick={() => eliminarFoto(foto.id)}
                    className="vmdr-photo-del-btn"
                    aria-label="Eliminar foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="vmdr-photo-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={manejarSeleccionFotos}
                  className="vmdr-hidden-input"
                />
                +
              </label>
            </div>
          </div>

          {error && <p className="vmdr-error-text">{error}</p>}

          <button
            type="submit"
            disabled={calificacion === 0}
            className="vmdr-submit-btn"
          >
            Enviar reseña
          </button>
        </form>
      </div>
    </div>
  )
}

export default VentanaModalDejarResena