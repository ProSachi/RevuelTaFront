import apiRevueltaBack from '../apiRevueltaBack'

export const exchangeServices = {

    getExchangeForUserId: async (id) => {
        const response = apiRevueltaBack.get(`/pedidos/${id}`)
        return (await response).data;
    }
}