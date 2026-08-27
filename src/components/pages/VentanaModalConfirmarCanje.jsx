import { useState } from 'react';
import "../../index.css";

export const VentanaModalConfirmarCanje = ({ oferta, saldoActual, onCerrar, onCanjeExitoso }) => {
  const [errorCanje, setErrorCanje] = useState('');

  if (!oferta) return null;

  const handleConfirmar = () => {
    setErrorCanje('');

    if (saldoActual < oferta.costoPuntos) {
      setErrorCanje(
        `No cuentas con puntos suficientes para canjear esta oferta. Necesitas ${oferta.costoPuntos} puntos y tu saldo actual es ${saldoActual} puntos.`
      );
      return;
    }

    alert('Canje realizado con exito');
    
    if (onCanjeExitoso) onCanjeExitoso(oferta);
    
    onCerrar();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        <div className="modal-header">
          <h2>Confirmar canje</h2>
          <button className="btn-close" onClick={onCerrar}>X</button>
        </div>

        <div className="card-oferta">
          <div className="img-box">
            {oferta.imagenUrl ? <img src={oferta.imagenUrl} alt="oferta" /> : 'IMG'}
          </div>
          <div className="info-oferta">
            <p className="titulo-oferta">Descuento {oferta.titulo}</p>
            <p className="condicion">{oferta.condicion}</p>
            <p className="descripcion">{oferta.descripcion}</p>
          </div>
        </div>

        <div className="row-costo">
          <div>
            <span className="label-gris">Costo en puntos</span>
            <p className="valor-puntos">{oferta.costoPuntos} puntos</p>
          </div>
          <div className="star-icon">*</div>
        </div>

        <hr className="divider" />

        <div className="row-saldo">
          <span className="label-gris">Saldo actual</span>
          <p className="valor-puntos">{saldoActual} puntos</p>
        </div>

        {errorCanje && <div className="error-box">{errorCanje}</div>}

        <p className="pregunta">¿Desea canjear esta oferta?</p>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="btn-confirmar" onClick={handleConfirmar}>Confirmar canje</button>
        </div>

      </div>
    </div>
  );
};