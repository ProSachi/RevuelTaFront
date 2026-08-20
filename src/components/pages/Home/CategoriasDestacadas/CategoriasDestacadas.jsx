import useCategorias from "../../../../hooks/useCategorias";
import CategoriaCard from "./CategoriaCard";
import styles from "./CategoriasDestacadas.module.css";

function CategoriasDestacadas({ onSeleccionarCategoria }) {
    const { categorias, cargando, error } = useCategorias();

    if (cargando) return <div className={styles.loading}>Cargando categorías...</div>;
    if (error) return <div className={styles.error}>No se pudieron cargar las categorías.</div>;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categorías Destacadas</h2>
            <div className={styles.grid}>
                {categorias.map((categoria) => (
                    <CategoriaCard
                        key={categoria.id}
                        nombre={categoria.nombre}
                        imagen={categoria.imagen}
                        contador={categoria.contador}
                        onSeleccionar={onSeleccionarCategoria}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoriasDestacadas;