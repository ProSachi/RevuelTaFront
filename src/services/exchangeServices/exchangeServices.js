import apiServer from '../apiRevueltaBack'

export const exchangeServices = {

    /* 
    
        Agregar consulta al back en repositorio @Query(
        SELECT p
        FROM Pedido p
        JOIN p.usuario u
        WHERE u.id = :idUsuario)
|
    */
    getExchangeForUserId: async (id) => {
        const response = apiServer.get(`/pedidos/usuario/${id}`)
        return (await response).data;
    }
}