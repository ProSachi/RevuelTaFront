import { useState } from 'react';
import { Link } from 'react-router-dom';

import MisPuntosDisponibles from './MisPuntosDisponibles/MisPuntosDisponibles';
import ComoFunciona from './ComoFunciona/ComoFunciona';
import NivelUsuario from './NivelUsuario/NivelUsuario';
import OfertaDestacada from './OfertaDestacada/OfertaDestacada';
import CampanasActivas from './CampanasActivas/CampanasActivas';
import CatalogoDescuentos from './CatalogoDescuentos/CatalogoDescuentos';
import AccionesPuntos from './AccionesPuntos/AccionesPuntos';

import VentanaModalNivelesBeneficios from './modales/VentanaModalNivelesBeneficios';
import VentanaModalConfirmarCanje from './modales/VentanaModalConfirmarCanje';
import VentanaModalCampanas from './modales/VentanaModalCampanas';

import { puntosUsuario as puntosUsuarioMock } from '../../data/puntosMock';
import { nivelesPrograma } from '../../data/nivelesMock';
import { ofertaDestacada } from '../../data/ofertaDestacadaMock';
import { RUTAS } from '../../constants/rutas';


const DescuentosCampanas = () => {
  
  
  const [puntosUsuario, setPuntosUsuario] = useState(puntosUsuarioMock);

  
  const [modalActiva, setModalActiva] = useState(null); 
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);

  const handleVerHistorial = () => console.log('Pendiente MER-DC06: VentanaModalHistorialPuntos');
  const handleVerTodasCampanas = () => setModalActiva('campanas');
  const handleVerOfertas = () => console.log('Pendiente MER-DC05: VentanaModalOfertaDestacada');

  const handleVerNiveles = () => {
    setModalActiva('niveles');
  };

  const handleSeleccionarCanje = (descuento) => {
    setDescuentoSeleccionado(descuento);
    setModalActiva('canje');
  };

  const handleCerrarModal = () => {
    setModalActiva(null);
    setDescuentoSeleccionado(null);
  };

  
  
  const handleCanjeExitoso = (costoEnPuntos) => {
    setPuntosUsuario((prev) => ({
      ...prev,
      saldoActual: prev.saldoActual - costoEnPuntos,
    }));
  };

  return (
    <div className="container py-4" style={{ fontFamily: 'var(--font-body)' }}>
      {
}
      <div className="mb-4 d-flex justify-content-between align-items-end gap-3 flex-wrap">
        <div>
          <h1 className="fw-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
            Descuentos y campañas
          </h1>
          <p className="text-muted mb-0">
            Usa tus puntos, accede a descuentos exclusivos y participa en campañas especiales
          </p>
        </div>

        <Link
          to={RUTAS.RECUPERAR_CONTRASENA}
          className="btn btn-sm rounded-pill px-3 fw-semibold"
          style={{
            border: '1px solid var(--color-pine)',
            backgroundColor: 'white',
            color: 'var(--color-pine)',
            fontFamily: 'var(--font-body)',
            boxShadow: 'none',
          }}
        >
          Recuperar contraseña
        </Link>
      </div>

      <div className="row g-4">
        {
}
        <div className="col-lg-8">
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <MisPuntosDisponibles
                puntosDisponibles={puntosUsuario.saldoActual}
                onVerHistorial={handleVerHistorial}
              />
            </div>
            <div className="col-md-6">
              <ComoFunciona />
            </div>
          </div>

          <OfertaDestacada oferta={ofertaDestacada} onVerOfertas={handleVerOfertas} />

          <CatalogoDescuentos onSeleccionarCanje={handleSeleccionarCanje} />
        </div>

        {
}
        <div className="col-lg-4">
          <NivelUsuario
            nivelActual={puntosUsuario.nivelActual}
            siguienteNivel={puntosUsuario.siguienteNivel}
            puntosFaltantes={puntosUsuario.puntosFaltantes}
            progresoPorcentaje={puntosUsuario.progresoPorcentaje}
            onVerNiveles={handleVerNiveles}
          />

          <CampanasActivas onVerTodas={handleVerTodasCampanas} />

          <AccionesPuntos />
        </div>
      </div>

      {
}
      {modalActiva === 'niveles' && (
        <VentanaModalNivelesBeneficios
          nivelActualId={puntosUsuario.nivelId}
          puntosFaltantes={puntosUsuario.puntosFaltantes}
          siguienteNivel={puntosUsuario.siguienteNivel}
          niveles={nivelesPrograma}
          onCerrar={handleCerrarModal}
        />
      )}

      {modalActiva === 'canje' && descuentoSeleccionado && (
        <VentanaModalConfirmarCanje
          oferta={descuentoSeleccionado}
          saldoActual={puntosUsuario.saldoActual}
          onCerrar={handleCerrarModal}
          onCanjeExitoso={handleCanjeExitoso}
        />
      )}
      
      {modalActiva === 'campanas' && (
        <VentanaModalCampanas onCerrar={handleCerrarModal} />
      )}
    </div>
  );
};

export default DescuentosCampanas;
