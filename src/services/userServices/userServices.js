import apiServer from '../apiRevueltaBack'

export const userServices = {

    /*
    
        Agregar consulta al back en repositorio @Query(
        SELECT u
        FROM Usuario u
        WHERE u.id = :idUsuario)

    */
    getById: async (id) => {
        const response = await apiServer.get(`/usuarios/${id}`);
        return response.data;
    },

};




