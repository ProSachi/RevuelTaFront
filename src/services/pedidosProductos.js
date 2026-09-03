import api from "./api.js"

export const obtenerPedidosProductos = async () => {
    const respuesta = await api.get("/products");
    return respuesta.data;
};

export const obtenerPedidoProductoPorId = async (idProducto) => {
    const respuesta = await api.get(`/products/${idProducto}`);
    return respuesta.data;
};