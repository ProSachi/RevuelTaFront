import { seguimientosEnvioMock } from "../data/seguimientoEnvioMock"

export const obtenerSeguimientoEnvio = async (pedidoId) => {
    const seguimiento = seguimientosEnvioMock[pedidoId]

    console.log(
        "SERVICIO SEGUNDA ENTREGA:",
        seguimiento?.entregas?.[1]
    )

    return seguimiento
}