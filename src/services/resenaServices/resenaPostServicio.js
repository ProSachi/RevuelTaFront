import api from "../api";

export const obtenerResenas = async () => {
  const response = await api.get("/resenas");
  return response.data;
};

export const obtenerResenaPorId = async (id) => {
  const response = await api.get(`/resenas/${id}`);
  return response.data;
};

export const crearResena = async (datosResena) => {
  const response = await api.post("/resenas", datosResena);
  return response.data;
};

const resenaServicio = {
  obtenerResenas,
  obtenerResenaPorId,
  crearResena
};

export default resenaServicio;
