import api from './api'; // Importamos la instancia configurada, no la librería cruda

export const obtenerProductos = async () => {
    // Ya no escribimos la URL completa, Axios concatena '/products' a la baseURL
    const respuesta = await api.get('/products');
    return respuesta.data; // Retorna directamente el JSON
};