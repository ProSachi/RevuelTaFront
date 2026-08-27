import apiRevueltaBack from '../apiRevueltaBack'

export const reportServices = {

    getReportForReported: async (id) => {
        const response = await apiRevueltaBack.get(`/reportes/usuarioReportado/${id}`)
        return response.data;
    }

}