import apiServer from '../apiRevueltaBack'

export const ratingServices = {

    /*
        Agregar consulta al back en repositorio @Query(
        SELECT c 
        FROM Calificacion c
        JOIN c.resena r
        WHERE r.usuarioResenado.id = :idUsuario)
    */
    getAllRatingsForUserId: async (id) => {
        const response = await apiServer.get(`/calificaciones/usuario/${id}`);
        return response.data;
    }

}