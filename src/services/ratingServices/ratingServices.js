import apiRevueltaBack from '../apiRevueltaBack'

export const ratingServices = {

    /*
        Agregar consulta al back en repositorio @Query(
        SELECT c 
        FROM Calificacion c
        JOIN c.resena r
        WHERE r.usuarioResenado.id = :idUsuario)
    */
    getAllRatingsForUserId: async (id) => {
        const response = await apiRevueltaBack.get(`/calificaciones/usuario/${id}`);
        return response.data;
    }

}