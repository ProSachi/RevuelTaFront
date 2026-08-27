export async function actualizarPrenda(datosActualizados) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return { exito: true, prenda: datosActualizados };
}
