import api from './api';

export const solicitarRecuperacionContrasena = async (correo) => {
    try {
        const respuesta = await api.post('/auth/recuperar-contrasena', { correo });
        return respuesta.data;
    } catch {
        return { exito: true };
    }
};