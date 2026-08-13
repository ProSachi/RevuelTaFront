import { useState, useEffect } from "react";
import { obtenerCategorias } from "../services/categoriasService";
import categoriasMeta from "../data/categoriasMeta";

function useCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const nombres = await obtenerCategorias();

                const combinadas = nombres.map((nombre, index) => ({
                    id: index + 1,
                    nombre,
                    imagen: categoriasMeta[nombre]?.imagen ?? null,
                    contador: categoriasMeta[nombre]?.contador ?? 0,
                }));

                setCategorias(combinadas);
            } catch (err) {
                setError(err);
            } finally {
                setCargando(false);
            }
        }

        cargarCategorias();
    }, []);

    return { categorias, cargando, error };
}

export default useCategorias;