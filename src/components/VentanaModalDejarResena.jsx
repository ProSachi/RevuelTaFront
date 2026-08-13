import { useEffect, useState } from 'react'
import { obtenerVendedoresPedido } from '../data/vendedores'
import { crearResena, obtenerVendedoresResenados } from '../data/resenas'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Califica tu compra</h2>
          <button
            type="button"
            onClick={onCerrar}
            className="text-ink/50 transition hover:text-clay"
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

        <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink/60">
              Selecciona el vendedor a reseñar
            </label>
            <select
              value={vendedorSeleccionado}
              onChange={(evento) => setVendedorSeleccionado(evento.target.value)}
              disabled={vendedoresDisponibles.length === 1}
              className="w-full rounded-lg border border-line bg-paper-2 px-4 py-3 text-ink disabled:opacity-70"
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
            <p className="mb-2 font-display text-lg text-ink">Califícanos</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((valor) => (
                <button
                  key={valor}
                  type="button"
                  onClick={() => setCalificacion(valor)}
                  aria-label={`${valor} estrellas`}
                  className="text-3xl leading-none"
                >
                  <span className={valor <= calificacion ? 'text-marigold' : 'text-line'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-ink/70">
              Cuéntanos tu experiencia
            </label>
            <textarea
              value={comentario}
              onChange={(evento) => setComentario(evento.target.value)}
              rows={3}
              placeholder="¿Como era la prenda comparada a las fotos? ¿Como fue el envío?"
              className="w-full resize-none rounded-lg border border-line bg-paper-2 px-4 py-3 text-ink placeholder:text-ink/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-ink/70">
              Subir fotos (Opcional)
            </label>
            <div className="flex flex-wrap gap-3">
              {fotos.map((foto) => (
                <div key={foto.id} className="relative h-16 w-16 overflow-hidden rounded-lg border border-line">
                  <img src={foto.url} alt={foto.nombre} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => eliminarFoto(foto.id)}
                    className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink/70 text-[10px] text-paper"
                    aria-label="Eliminar foto"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-dashed border-line text-ink/50 hover:border-pine hover:text-pine">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={manejarSeleccionFotos}
                  className="hidden"
                />
                +
              </label>
            </div>
          </div>

          {error && <p className="text-sm text-clay">{error}</p>}

          <button
            type="submit"
            disabled={calificacion === 0}
            className="w-full rounded-lg bg-pine py-3 font-semibold text-paper transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-line disabled:text-ink/40"
          >
            Enviar reseña
          </button>
        </form>
      </div>
    </div>
  )
}

export default VentanaModalDejarResena
