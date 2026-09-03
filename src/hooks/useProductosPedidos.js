import { useState, useEffect } from "react";
import { obtenerPedidosProductos } from "../services/pedidosProductos";

const PRODUCTOS_CON_IMAGEN = [1, 2, 3, 4, 16, 17, 18, 19];

function useProductosPedidos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarProductos() {
            try {
                const datos = await obtenerPedidosProductos();

                const transformados = datos
                    .filter((producto) => PRODUCTOS_CON_IMAGEN.includes(producto.id))
                    .map((producto) => ({
                        id: producto.id,
                        imagen: producto.image,
                    }));

                setProductos(transformados);
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

export default useProductosPedidos;