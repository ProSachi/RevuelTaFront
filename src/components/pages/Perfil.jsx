import { useState } from "react";
import VentanaModalEditarPerfil from "../../components/pages/Perfil/VentanaModalEditarPerfil/VentanaModalEditarPerfil";
import VentanaModalEditarPrendaPublicada from "../../components/pages/Perfil/VentanaModalEditarPrendaPublicada/VentanaModalEditarPrendaPublicada";
import estilos from "./Perfil.module.css";

const imagenesDemo = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
];

const prendasIniciales = [
  { id:1, nombrePrenda:"Camiseta básica", marca:"Nike", talla:"M", categoria:"Camisetas", precio:65000, estadoPrenda:"Como nuevo", cantidadDisponible:2, imagenes:imagenesDemo },
  { id:2, nombrePrenda:"Chaqueta denim", marca:"Levi's", talla:"L", categoria:"Chaquetas", precio:120000, estadoPrenda:"Buen estado", cantidadDisponible:1, imagenes:[imagenesDemo[2]] },
];

const usuarioInicial = {
  nombreUsuario: "juanperez",
  correo: "juan.perez@revuelta.com",
  rol: "Estudiante",
  fotoPerfil: null,
  puntosAcopio: { entrega: null, recogida: null },
};

export default function Perfil() {
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [prendas, setPrendas] = useState(prendasIniciales);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);

  function abrirEdicionPrenda(prenda) {
    setPrendaSeleccionada(prenda);
  }

  function manejarAbrirPuntosAcopio(puntosActuales, alConfirmar) {
    const entrega = window.prompt("Punto de acopio de entrega (simulado):", puntosActuales?.entrega ?? "");
    if (entrega === null) return;
    const recogida = window.prompt("Punto de acopio de recogida (simulado):", puntosActuales?.recogida ?? "");
    if (recogida === null) return;
    alConfirmar({ entrega, recogida });
  }

  return (
    <main className={estilos.pagina}>
      <section className={estilos.contenedor}>
        <div className={estilos.tarjetaPerfil}>
          <h1 className={estilos.titulo}>Mi perfil</h1>
          <div className={estilos.datos}>
            <p><strong>Nombre de usuario:</strong> {usuario.nombreUsuario}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p><strong>Punto de entrega:</strong> {usuario.puntosAcopio.entrega ?? "Sin definir"}</p>
            <p><strong>Punto de recogida:</strong> {usuario.puntosAcopio.recogida ?? "Sin definir"}</p>
          </div>
          <button type="button" className={estilos.botonEditar} onClick={() => setModalAbierta(true)}>Editar Perfil</button>
        </div>

        <section className={estilos.prendas}>
          <div className={estilos.encabezadoPrendas}>
            <div>
              <h2>Mis prendas publicadas</h2>
              <p>Selecciona una prenda o pulsa “Editar” para actualizarla.</p>
            </div>
            <span className={estilos.contador}>{prendas.length} publicadas</span>
          </div>

          <div className={estilos.gridPrendas}>
            {prendas.map((prenda) => (
              <article key={prenda.id} className={estilos.tarjetaPrenda} onClick={() => abrirEdicionPrenda(prenda)}>
                <div className={estilos.imagenPrenda}>
                  {prenda.imagenes[0] ? <img src={prenda.imagenes[0]} alt={prenda.nombrePrenda} /> : <div className={estilos.sinImagen}>Sin imagen</div>}
                  <span>{prenda.estadoPrenda}</span>
                </div>
                <div className={estilos.infoPrenda}>
                  <h3>{prenda.nombrePrenda}</h3>
                  <p>{prenda.marca} · Talla {prenda.talla}</p>
                  <strong>${Number(prenda.precio).toLocaleString("es-CO")}</strong>
                  <small>{prenda.cantidadDisponible} disponibles</small>
                  <button type="button" onClick={(e) => { e.stopPropagation(); abrirEdicionPrenda(prenda); }}>Editar</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {modalAbierta && (
        <VentanaModalEditarPerfil
          usuarioOriginal={usuario}
          onCerrar={() => setModalAbierta(false)}
          onAbrirPuntosAcopio={manejarAbrirPuntosAcopio}
          onConfirmar={(usuarioActualizado) => {
            setUsuario((actual) => ({ ...actual, ...usuarioActualizado }));
            setModalAbierta(false);
          }}
        />
      )}

      {prendaSeleccionada && (
        <VentanaModalEditarPrendaPublicada
          prendaOriginal={prendaSeleccionada}
          onCerrar={() => setPrendaSeleccionada(null)}
          onConfirmar={(prendaActualizada) => {
            setPrendas((actuales) => actuales.map((p) => p.id === prendaSeleccionada.id ? { ...prendaActualizada, id:p.id } : p));
            setPrendaSeleccionada(null);
          }}
        />
      )}
    </main>
  );
}
