import { useEffect, useRef } from "react";
import "./NivelesBeneficios.css";

const NIVELES = [
  { id: 1, nombre: "Bronce", puntosMin: 0, puntosMax: 999 },
  { id: 2, nombre: "Plata", puntosMin: 1000, puntosMax: 2999 },
  { id: 3, nombre: "Oro", puntosMin: 3000, puntosMax: 4999 },
  { id: 4, nombre: "Diamante", puntosMin: 5000, puntosMax: 9999 },
  { id: 5, nombre: "Black", puntosMin: 10000, puntosMax: null },
];

const BENEFICIOS = [
  "Envío gratis en tu próximo trueque",
  "Doble de puntos en la primera prenda que publiques cada mes",
  "Acceso anticipado a campañas y descuentos",
  "Insignia de nivel visible en tu perfil",
  "Prioridad en soporte y resolución de reportes",
  "5% adicional de descuento al canjear puntos",
];


const PUNTOS_USUARIO_MOCK = 1450;

function obtenerNivelActual(puntos, niveles) {
  return (
    niveles.find(
      (nivel) =>
        puntos >= nivel.puntosMin &&
        (nivel.puntosMax === null || puntos <= nivel.puntosMax)
    ) ?? niveles[0]
  );
}

function formatearPuntos(numero) {
  return numero.toLocaleString("es-CO");
}


function IconoHoja() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 20c8-1 13-6 14-14-8 1-13 6-14 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6 18c3-4 6-7 10-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconoEstrella() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M12 3.5l2.47 5.18 5.53.66-4.1 3.86 1.1 5.5L12 15.9l-4.99 2.8 1.09-5.5-4.1-3.86 5.53-.66L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconoCerrar() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NivelesBeneficios({
  isOpen,
  onClose,
  puntosActuales = PUNTOS_USUARIO_MOCK,
  niveles = NIVELES,
  beneficios = BENEFICIOS,
}) {
  const dialogRef = useRef(null);

  const nivelActual = obtenerNivelActual(puntosActuales, niveles);
  const indiceNivelActual = niveles.findIndex((n) => n.id === nivelActual.id);
  const siguienteNivel = niveles[indiceNivelActual + 1] ?? null;
  const puntosParaSubir = siguienteNivel
    ? siguienteNivel.puntosMin - puntosActuales
    : 0;

  useEffect(() => {
    if (!isOpen) return;

    function manejarTecla(evento) {
      if (evento.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", manejarTecla);
    return () => document.removeEventListener("keydown", manejarTecla);
  }, [isOpen, onClose]);

  // Enfocar el modal al abrir, para accesibilidad de teclado
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function manejarClicOverlay(evento) {
    if (evento.target === evento.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="nb-overlay" onMouseDown={manejarClicOverlay}>
      <div
        className="nb-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nb-titulo"
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="nb-header">
          <h2 id="nb-titulo" className="nb-titulo">
            Niveles y Beneficios
          </h2>
          <button
            type="button"
            className="nb-cerrar-x"
            onClick={onClose}
            aria-label="Cerrar ventana de niveles y beneficios"
          >
            <IconoCerrar />
          </button>
        </header>

        <section className="nb-nivel-actual" aria-label="Tu nivel actual">
          <span className="nb-eyebrow">Tu nivel actual</span>
          <div className="nb-nivel-actual-fila">
            <span className="nb-nivel-icono">
              <IconoHoja />
            </span>
            <div className="nb-nivel-actual-texto">
              <p className="nb-nivel-nombre">{nivelActual.nombre}</p>
              <p className="nb-nivel-detalle">
                {siguienteNivel
                  ? `${formatearPuntos(puntosParaSubir)} pts para subir a ${siguienteNivel.nombre}`
                  : "Nivel máximo alcanzado"}
              </p>
            </div>
            <span className="nb-nivel-puntos" aria-hidden="true">
              {formatearPuntos(puntosActuales)} pts
            </span>
          </div>
        </section>

        <section aria-label="Todos los niveles">
          <h3 className="nb-subtitulo">Todos los niveles</h3>
          <ul className="nb-lista-niveles">
            {niveles.map((nivel) => {
              const esActual = nivel.id === nivelActual.id;
              return (
                <li
                  key={nivel.id}
                  className={
                    esActual ? "nb-fila-nivel nb-fila-nivel--actual" : "nb-fila-nivel"
                  }
                >
                  <span className="nb-nivel-icono nb-nivel-icono--sm">
                    <IconoHoja />
                  </span>
                  <span className="nb-fila-nivel-nombre">
                    Nivel {nivel.id} · {nivel.nombre}
                    {esActual && <span className="nb-etiqueta-actual">Actual</span>}
                  </span>
                  <span className="nb-fila-nivel-rango">
                    {nivel.puntosMax === null
                      ? `${formatearPuntos(nivel.puntosMin)}+ pts`
                      : `${formatearPuntos(nivel.puntosMin)} - ${formatearPuntos(nivel.puntosMax)} pts`}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-label="Beneficios destacados">
          <h3 className="nb-subtitulo">Beneficios destacados</h3>
          <ul className="nb-lista-beneficios">
            {beneficios.map((beneficio) => (
              <li key={beneficio} className="nb-fila-beneficio">
                <span className="nb-beneficio-icono">
                  <IconoEstrella />
                </span>
                {beneficio}
              </li>
            ))}
          </ul>
        </section>

        <button type="button" className="nb-boton-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
