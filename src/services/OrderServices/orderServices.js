import apiRevueltaBack from '../apiRevueltaBack'

export const orderServices = {
    /* 
    
    */
    getOrderForSeller: async (id) => { 
        const response = await apiRevueltaBack.get(`/pedidos/vendedor/${id}`);
        return response.data;
    }
} 