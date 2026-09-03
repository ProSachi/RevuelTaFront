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
    },

    /*
    
        agregar consulta al back @Query("""
        SELECT DISTINCT pr
        FROM Prenda pr
        JOIN pr.usuario uPublicador
        JOIN pr.detallePedidos dp
        JOIN dp.pedido pe
        JOIN pe.usuario uComprador
        WHERE uPublicador.id = :idPublicador
          AND uComprador.id = :idComprador
          AND LOWER(pe.estado) = 'entregado'
        """)
    
    */

    getGarmentsForUserIdAndBuyerId : async (idPublicador, idComprador) => {
        const response = await apiServer.get(`/prendas/publicador/${idPublicador}/comprador/${idComprador}`);
        return response.data;
    } 

}