import useProductosDestacados from "../../../../hooks/useProductosDestacados";
import ProductoCard from "./ProductoCard";
import styles from "../ProductosDestacados/ProductosDestacados.module.css";

function ProductosDestacados({ onVerProducto, onAgregarCarrito, onTrueque }) {
    const { productos, cargando, error } = useProductosDestacados();

    if (cargando) return <div className={styles.loading}>Cargando productos...</div>;
    if (error) return <div className={styles.error}>No se pudieron cargar los productos.</div>;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Productos Destacados</h2>
            <div className={styles.grid}>
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        nombre={producto.nombre}
                        marca={producto.marca}
                        imagen={producto.imagen}
                        talla={producto.talla}
                        calificacion={producto.calificacion}
                        precio={producto.precio}
                        onVerProducto={() => onVerProducto(producto.id)}
                        onAgregarCarrito={() => onAgregarCarrito(producto.id)}
                        onTrueque={() => onTrueque(producto.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductosDestacados;