import api from './api'; // Importamos la instancia configurada, no la librería cruda


export const obtenerCategorias = async () => {
    const respuesta = await api.get('/products/categories');
    return respuesta.data; 
};

export const obtenerProductosDeRopa = async () => {
    const [hombre, mujer] = await Promise.all([
        api.get("/products/category/men's clothing"),
        api.get("/products/category/women's clothing"),
    ]);

    return [...hombre.data, ...mujer.data];
};
export const obtenerProductos = async () => {
    // Ya no escribimos la URL completa, Axios concatena '/products' a la baseURL
    const respuesta = await api.get('/products');
    return respuesta.data; // Retorna directamente el JSON
};