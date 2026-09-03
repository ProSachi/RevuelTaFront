import { useState } from 'react';
import { Link } from 'react-router-dom';

import MisPuntosDisponibles from '../../components/mercadeo/MisPuntosDisponibles/MisPuntosDisponibles';
import ComoFunciona from '../../components/mercadeo/ComoFunciona/ComoFunciona';
import NivelUsuario from '../../components/mercadeo/NivelUsuario/NivelUsuario';
import OfertaDestacada from '../../components/mercadeo/OfertaDestacada/OfertaDestacada';
import CampanasActivas from '../../components/mercadeo/CampanasActivas/CampanasActivas';
import CatalogoDescuentos from '../../components/mercadeo/CatalogoDescuentos/CatalogoDescuentos';
import AccionesPuntos from '../../components/mercadeo/AccionesPuntos/AccionesPuntos';

import VentanaModalNivelesBeneficios from '../../components/mercadeo/modales/VentanaModalNivelesBeneficios';
import VentanaModalConfirmarCanje from '../../components/mercadeo/modales/VentanaModalConfirmarCanje';
import VentanaModalCampanas from '../../components/mercadeo/modales/VentanaModalCampanas';
import VentanaModalHistorialPuntos from '../../components/mercadeo/modales/VentanaModalHistorialPuntos';
import VentanaModalOfertaDestacada from '../../components/mercadeo/modales/VentanaModalOfertaDestacada';

import { puntosUsuario as puntosUsuarioMock } from '../../data/puntosMock';
import { nivelesPrograma } from '../../data/nivelesMock';
import { ofertaDestacada } from '../../data/ofertaDestacadaMock';
import { historialPuntos } from '../../data/historialMock';
import { RUTAS } from '../../constants/rutas';
import styles from './DescuentosCampanas.module.css';

const DescuentosCampanas = () => {
  const [puntosUsuario, setPuntosUsuario] = useState(puntosUsuarioMock);

  const [modalActiva, setModalActiva] = useState(null);
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);

  const handleVerHistorial = () => setModalActiva('historial');
  const handleVerTodasCampanas = () => setModalActiva('campanas');
  const handleVerOfertas = () => setModalActiva('ofertas');

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
    <div className={`container py-4 ${styles.root}`}>
      <div className="mb-4 d-flex justify-content-between align-items-end gap-3 flex-wrap">
        <div>
          <h1 className={`fw-bold mb-1 ${styles.title}`}>
            Descuentos y campañas
          </h1>

          <p className="text-muted mb-0">
            Usa tus puntos, accede a descuentos exclusivos y participa en campañas especiales
          </p>
        </div>

        <Link
          to={RUTAS.RECUPERAR_CONTRASENA}
          className={`btn btn-sm rounded-pill px-3 fw-semibold ${styles.btnRecuperar}`}
        >
          Recuperar contraseña
        </Link>
      </div>

      <div className="row g-4">
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

          <OfertaDestacada
            oferta={ofertaDestacada}
            onVerOfertas={handleVerOfertas}
          />

          <CatalogoDescuentos
            onSeleccionarCanje={handleSeleccionarCanje}
          />
        </div>

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

      {modalActiva === 'historial' && (
        <VentanaModalHistorialPuntos
          historial={historialPuntos}
          onCerrar={handleCerrarModal}
        />
      )}

      {modalActiva === 'ofertas' && (
        <VentanaModalOfertaDestacada
          oferta={ofertaDestacada}
          onCerrar={handleCerrarModal}
        />
      )}
    </div>
  );
};

export default DescuentosCampanas;