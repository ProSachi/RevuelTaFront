import apiServer from '../apiRevueltaBack'

export const garmentsServices = {

    /*
    
        Agregar consulta al back en repositorio @Query(
        SELECT p
        FROM Prenda p
        JOIN p.usuario u
        WHERE u.id = :idUsuario)

    */

    getGarmentsForUserId : async (id) => {
        const response = await apiServer.get(`/prendas/usuario/${id}`);
        return response.data;
    } 

}