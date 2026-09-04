import apiRevueltaBack from '../apiRevueltaBack'

export const orderServices = {
    /* 
        
        @Query(
            SELECT p
            FROM  Pedido p
            JOIN p.detallePedidos d
            JOIN d.prenda pr
            JOIN pr.usuario u
            WHERE u.id = :idUsuario)

    */
    getOrderForSeller: async (id) => {
        const response = await apiRevueltaBack.get(`/pedidos/vendedor/${id}`);
        return response.data;
    }
} 
