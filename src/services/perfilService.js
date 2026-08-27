export async function validarContrasenaActual(contrasenaActual) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const valida = contrasenaActual !== "incorrecta123";
  return { valida };
}

export async function actualizarPerfil(datosActualizados) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return { exito: true, usuario: datosActualizados };
}
