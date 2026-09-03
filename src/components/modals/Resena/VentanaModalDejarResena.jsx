import { useState, useRef } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from './VentanaModalDejarResena.module.css';

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
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const opcionesVendedores = vendedoresDisponibles.filter(
    (v) => !vendedoresYaResenados.includes(v.id)
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const nuevasFotos = files.map(file => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file)
      }));
      setFotos(prev => [...prev, ...nuevasFotos]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorValidacion('');

    if (opcionesVendedores.length > 1 && !vendedorSeleccionado) {
      setErrorValidacion('Debes seleccionar un vendedor para reseñar.');
      return;
    }

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

    console.log('Registrando reseña:', nuevaResena);
    setAlertaConfirmacion(true);

    setTimeout(() => {
      setAlertaConfirmacion(false);
      const pendientesRestantes = opcionesVendedores.filter((v) => v.id !== idVendedorActual);

      if (pendientesRestantes.length > 0) {
        setPreguntarSiguiente(true);
      } else {
        onResenaEnviada(idVendedorActual, true);
        onCerrar();
      }
    }, 1500);
  };

  const handleRespuestaContinuar = (deseaContinuar) => {
    const idUltimoReseñado = vendedorSeleccionado || opcionesVendedores[0]?.id;
    setPreguntarSiguiente(false);

    if (deseaContinuar) {
      setVendedorSeleccionado('');
      setCalificacion(0);
      setComentario('');
      setFotos([]);
      onResenaEnviada(idUltimoReseñado, false);
    } else {
      onResenaEnviada(idUltimoReseñado, true);
      onCerrar();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        
        <div className={styles.header}>
          <h5 className={styles.title}>Califica tu compra</h5>
          <button 
            type="button" 
            className={styles.closeButton} 
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div>
          {alertaConfirmacion && (
            <div className={styles.alertSuccess}>
              ¡Reseña registrada con éxito!
            </div>
          )}

          {preguntarSiguiente ? (
            <div className="text-center py-4">
              <p className="mb-4 fw-medium">¿Deseas reseñar a otro vendedor de este pedido?</p>
              <div className="d-flex justify-content-center gap-2">
                <button 
                  type="button" 
                  className="btn text-white px-4" 
                  style={{ backgroundColor: 'var(--pine)' }}
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
                <div className={styles.alertError}>
                  {errorValidacion}
                </div>
              )}

              {opcionesVendedores.length > 1 && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Seleccionar el Vendedor a reseñar</label>
                  <select
                    className={styles.select}
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

              <div className={styles.formGroup}>
                <label className={styles.label}>Califícanos</label>
                <div className={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((estrella) => (
                    <span 
                      key={estrella} 
                      onClick={() => setCalificacion(estrella)}
                    >
                      {calificacion >= estrella ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cuéntanos tu experiencia</label>
                <textarea
                  className={styles.textarea}
                  placeholder="¿Cómo era la prenda comparada a las fotos? ¿Cómo fue el envío?"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subir fotos (Opcional)</label>
                <div className={styles.photosContainer}>
                  <div 
                    className={styles.addPhotoBox}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <span>+</span>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className={styles.hiddenFileInput} 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange}
                  />
                  {fotos.map((foto, index) => (
                    <div key={foto.id} className={styles.photoThumbnail} style={{ overflow: 'hidden' }}>
                      <img src={foto.url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Enviar reseña
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}