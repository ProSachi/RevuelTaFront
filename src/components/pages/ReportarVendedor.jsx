import React, { useState } from 'react';
import estilos from './ReportarVendedor.module.css';

const MOTIVOS = [
  {
    id: 'motivo1',
    titulo: 'Prenda no coincide con el de la descripción',
    descripcion: 'El producto recibido presenta características distintas a las publicadas.'
  },
  {
    id: 'motivo2',
    titulo: 'No cumplió con la entrega',
    descripcion: 'El vendedor no envió el producto dentro del plazo pactado.'
  },
  {
    id: 'motivo3',
    titulo: 'Comportamiento sospechoso o fraude',
    descripcion: 'Actividades que ponen en riesgo la seguridad de la transacción.'
  },
  {
    id: 'motivo4',
    titulo: 'Lenguaje ofensivo o acoso',
    descripcion: 'Interacciones inapropiadas o faltas de respeto en la comunicación.'
  },
  {
    id: 'motivo5',
    titulo: 'Otro motivo',
    descripcion: 'Cualquier otra situación no contemplada en las opciones anteriores.'
  }
];

export const ReportarVendedor = ({ alCerrar, nombreVendedor = "Carlos Pérez" }) => {
  const [motivoSeleccionado, setMotivoSeleccionado] = useState(MOTIVOS[0].titulo);
  const [comentario, setComentario] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (comentario.trim() === '') {
      setMensajeError('El comentario es obligatorio para continuar con el reporte.');
      return;
    }

    setMensajeError('');
    
    alert(`Reporte enviado con éxito.\nVendedor: ${nombreVendedor}\nMotivo: ${motivoSeleccionado}\nComentario: ${comentario}`);
    
    setComentario('');
    setMotivoSeleccionado(MOTIVOS[0].titulo);
    if (alCerrar) alCerrar();
  };

  const manejarCierre = () => {
    setComentario('');
    setMensajeError('');
    setMotivoSeleccionado(MOTIVOS[0].titulo);
    if (alCerrar) alCerrar();
  };

  return (
    <div className={estilos.superposicion}>
      <div className={estilos.ventana}>
        
        <div className={estilos.encabezado}>
          <h2 className={estilos.titulo}>Reportar a {nombreVendedor}</h2>
          <button className={estilos.botonCerrar} onClick={manejarCierre}>
            &times;
          </button>
        </div>

        <p className={estilos.subtitulo}>Cuéntanos qué está pasando</p>

        <form onSubmit={manejarEnvio}>
          <div className={estilos.listaOpciones}>
            {MOTIVOS.map((motivo) => (
              <label key={motivo.id} className={estilos.tarjetaOpcion}>
                <input
                  type="radio"
                  name="motivoReporte"
                  value={motivo.titulo}
                  checked={motivoSeleccionado === motivo.titulo}
                  onChange={(e) => setMotivoSeleccionado(e.target.value)}
                  className={estilos.inputRadio}
                />
                <div className={estilos.contenidoOpcion}>
                  <span className={estilos.tituloOpcion}>{motivo.titulo}</span>
                  <span className={estilos.descripcionOpcion}>{motivo.descripcion}</span>
                </div>
              </label>
            ))}
          </div>

          <div className={estilos.seccionComentario}>
            <label className={estilos.etiqueta} htmlFor="campoComentario">
              Comentario sobre el reporte *
            </label>
            <textarea
              id="campoComentario"
              className={estilos.campoTexto}
              placeholder="Escribe aquí los detalles de la situación..."
              value={comentario}
              onChange={(e) => {
                setComentario(e.target.value);
                if (e.target.value.trim() !== '') {
                  setMensajeError('');
                }
              }}
            />
            {mensajeError && <p className={estilos.textoError}>{mensajeError}</p>}
          </div>

          <div className={estilos.acciones}>
            <button
              type="button"
              className={estilos.botonCancelar}
              onClick={manejarCierre}
            >
              Cancelar
            </button>
            <button type="submit" className={estilos.botonEnviar}>
              Enviar Reporte
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};