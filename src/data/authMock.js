// Simulación de autenticación para MKT-R01 / MKT-L01 mientras no exista backend real.
// Debe exponer el mismo contrato que usará la autenticación real: usuario, autenticado, iniciarSesion, cerrarSesion.
export const usuarioMock = {
  id: 1,
  nombre: 'Usuario de prueba',
  correo: 'usuario@ejemplo.com',
}
