import apiServer from '../apiRevueltaBack'

export const reportServices = {

    /*
    
        Agregar consulta al back en repositorio @Query(
        SELECT r
        FROM Reporte r
        JOIN r.prenda p
        JOIN p.usuario u
        WHERE u.id = :idUsuario)

    */
    getReportForReported: async (id) => {
        const response = await apiServer.get(`/reportes/usuarioReportado/${id}`)
        return response.data;
    },

    postReport: async (reportData) => {
        const response = await apiServer.post(`/reportes`, reportData);
        return response.data;
    }

}