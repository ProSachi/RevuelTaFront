import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export async function obtenerCategorias() {
  const respuesta = await axios.get(`${BASE_URL}/products/categories`);
  return respuesta.data; 
}