import { useEffect } from "react";
import { Star, X } from "lucide-react";
import styles from "./VentanaModalMiResena.module.css";

const VentanaModalMiResena = ({ resenas, onCerrar }) => {

    useEffect(() => {
        if (!resenas) return;

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = overflowAnterior;
        };
    }, [resenas]);

    const renderizarEstrellas = (calificacion) =>
        [1, 2, 3, 4, 5].map((valor) => (
            <Star
                key={valor}
                className={`${styles.estrella} ${valor <= calificacion ? styles.estrellaRellena : ""}`}
            />
        ));

    if (!resenas || resenas.length === 0) {
        return null;
    }

    return (
        <div className={styles.ventanaModal}>
            <div className={styles.contenidoVentanaModal}>

                <div className={styles.encabezadoVentanaModal}>
                    <h2>Mi reseña</h2>

                    <button
                        type="button"
                        className={styles.botonCerrarModal}
                        onClick={onCerrar}
                        aria-label="Cerrar mi reseña">
                        <X />
                    </button>
                </div>

                <div className={styles.listaResenas}>
                    {resenas.map((resena) => (
                        <article className={styles.bloqueResena} key={resena.id}>
                            <div className={styles.vendedorResena}>
                                <h3>Vendedor: {resena.vendedor}</h3>
                            </div>

                            <div className={styles.calificacionResena}>
                                {renderizarEstrellas(resena.calificacion)}
                            </div>

                            <p className={styles.comentarioResena}>{resena.comentario}</p>

                            {resena.fotos && resena.fotos.length > 0 && (
                                <div className={styles.fotosResena}>
                                    {resena.fotos.map((foto) => (
                                        <img
                                            className={styles.fotoResena}
                                            key={foto.id}
                                            src={foto.url}
                                            alt={`Foto de la reseña de ${resena.vendedor}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default VentanaModalMiResena;
