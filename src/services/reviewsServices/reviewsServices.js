import apiServer from '../apiRevueltaBack'

export const reviewsServices = {

    /*
    
        Agregar consulta al back en repositorio @Query(
        SELECT r
        FROM Resena r
        JOIN r.idUsuarioResenado u
        WHERE u.id = :idUsuario)

    */
    getAllReviewsForReviewedUser: async (id) => {
        const response = await apiServer.get(`/resenas/usuariosResenado/${id}`)
        return response.data;
    }

}