import { useState, useEffect } from "react";
import { obtenerProductosDeRopa } from "../services/ejemploServicio";
import { mezclarArray } from "../utils/aleatorio";

const CANTIDAD_A_MOSTRAR = 3;

function useProductosDestacados() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarProductos() {
            try {
                const datos = await obtenerProductosDeRopa();

                const transformados = datos.map((producto) => ({
                    id: producto.id,
                    nombre: producto.title,
                    marca: producto.category,
                    imagen: producto.image,
                    talla: "Única", 
                    calificacion: producto.rating?.rate ?? 0,
                    precio: producto.price,
                }));

                const aleatorios = mezclarArray(transformados).slice(0, CANTIDAD_A_MOSTRAR);
                setProductos(aleatorios);
            } catch (err) {
                setError(err);
            } finally {
                setCargando(false);
            }
        }

        cargarProductos();
    }, []);

    return { productos, cargando, error };
}

export default useProductosDestacados;