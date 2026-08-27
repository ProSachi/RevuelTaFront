import apiRevueltaBack from '../apiRevueltaBack'

export const userServices = {

    getById: async (id) => {
        const response = await apiRevueltaBack.get(`/usuarios/${id}`);
        return response.data;
    },

};




