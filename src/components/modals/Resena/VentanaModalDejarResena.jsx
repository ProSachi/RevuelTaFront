import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function VentanaModalDejarResena({
  isOpen,
  onCerrar,
  pedido,
  vendedoresDisponibles = [],
  vendedoresYaResenados = [],
  onResenaEnviada
}) {
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [fotos, setFotos] = useState([]);
  const [errorValidacion, setErrorValidacion] = useState('');
  const [alertaConfirmacion, setAlertaConfirmacion] = useState(false);
  const [preguntarSiguiente, setPreguntarSiguiente] = useState(false);

  if (!isOpen) return null;

  // Filtrar los vendedores del pedido que todavía no han sido reseñados en este flujo
  const opcionesVendedores = vendedoresDisponibles.filter(
    (v) => !vendedoresYaResenados.includes(v.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorValidacion('');

    // Validación: Si hay varios vendedores y no se ha seleccionado uno
    if (opcionesVendedores.length > 1 && !vendedorSeleccionado) {
      setErrorValidacion('Debes seleccionar un vendedor para reseñar.');
      return;
    }

    // Validación: La calificación mediante estrellas es obligatoria
    if (calificacion === 0) {
      setErrorValidacion('La calificación mediante estrellas es obligatoria para poder enviar una reseña.');
      return;
    }

    const idVendedorActual = vendedorSeleccionado || opcionesVendedores[0]?.id;

    const nuevaResena = {
      pedidoId: pedido?.id,
      vendedorId: idVendedorActual,
      calificacion,
      comentario,
      fotos
    };

    // Preparado para usar Axios cuando conectes el backend, por ahora simulación local
    console.log('Registrando reseña:', nuevaResena);

    // Mostrar alerta de confirmación
    setAlertaConfirmacion(true);

    setTimeout(() => {
      setAlertaConfirmacion(false);
      const pendientesRestantes = opcionesVendedores.filter((v) => v.id !== idVendedorActual);

      if (pendientesRestantes.length > 0) {
        // Si hay más vendedores, preguntar si desea continuar reseñando
        setPreguntarSiguiente(true);
      } else {
        // Si ya no quedan más, finalizar automáticamente y regresar
        onResenaEnviada(idVendedorActual, true);
        onCerrar();
      }
    }, 1500);
  };

  const handleRespuestaContinuar = (deseaContinuar) => {
    const idUltimoReseñado = vendedorSeleccionado || opcionesVendedores[0]?.id;
    setPreguntarSiguiente(false);

    if (deseaContinuar) {
      // Mantener modal abierta, limpiar formulario e iniciar limpio para el siguiente vendedor
      setVendedorSeleccionado('');
      setCalificacion(0);
      setComentario('');
      setFotos([]);
      onResenaEnviada(idUltimoReseñado, false);
    } else {
      // Finalizar flujo voluntariamente y actualizar estado en Mis Pedidos
      onResenaEnviada(idUltimoReseñado, true);
      onCerrar();
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(21, 32, 27, 0.6)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 border-0" style={{ backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-md)' }}>
          
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Califica tu compra
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onCerrar}
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body">
            {alertaConfirmacion && (
              <div className="alert alert-success text-center py-2 mb-3" role="alert">
                ¡Reseña registrada con éxito!
              </div>
            )}

            {preguntarSiguiente ? (
              <div className="text-center py-4">
                <p className="mb-4 fw-medium">¿Deseas reseñar a otro vendedor de este pedido?</p>
                <div className="d-flex justify-content-center gap-2">
                  <button 
                    type="button" 
                    className="btn px-4 text-white" 
                    style={{ backgroundColor: 'var(--color-pine)' }}
                    onClick={() => handleRespuestaContinuar(true)}
                  >
                    Sí
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-dark px-4" 
                    onClick={() => handleRespuestaContinuar(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorValidacion && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {errorValidacion}
                  </div>
                )}

                {opcionesVendedores.length > 1 && (
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Seleccionar el Vendedor a reseñar</label>
                    <select
                      className="form-select"
                      value={vendedorSeleccionado}
                      onChange={(e) => setVendedorSeleccionado(e.target.value)}
                    >
                      <option value="">Selecciona un vendedor...</option>
                      {opcionesVendedores.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">Califícanos</label>
                  <div className="d-flex gap-1 fs-4 text-warning">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                      <span 
                        key={estrella} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCalificacion(estrella)}
                      >
                        {calificacion >= estrella ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">Cuéntanos tu experiencia</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="¿Cómo era la prenda comparada a las fotos? ¿Cómo fue el envío?"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">Subir fotos (Opcional)</label>
                  <div className="d-flex gap-2 align-items-center">
                    <div 
                      className="border border-dashed d-flex align-items-center justify-content-center rounded bg-white text-muted"
                      style={{ width: '65px', height: '65px', cursor: 'pointer', borderStyle: 'dashed' }}
                      onClick={() => setFotos([...fotos, { id: Date.now(), url: '' }])}
                    >
                      <span className="fs-3 fw-light">+</span>
                    </div>
                    {fotos.map((foto, index) => (
                      <div 
                        key={foto.id} 
                        className="bg-secondary text-white d-flex align-items-center justify-content-center rounded small" 
                        style={{ width: '65px', height: '65px' }}
                      >
                        Foto {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn w-100 py-2 text-white fw-bold"
                  style={{ backgroundColor: 'var(--color-clay)', borderRadius: 'var(--radius-sm)' }}
                >
                  Enviar reseña
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}