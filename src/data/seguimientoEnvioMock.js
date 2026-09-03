const puntoPoblado = {
    id: 1,
    nombre: "Punto ReVuelta - Poblado",
    direccion: "Cra 43A # 10-32",
    horario: "8:00 a.m. - 8:00 p.m.",
    latitud: 6.209,
    longitud: -75.5675
}

const puntoLaureles = {
    id: 2,
    nombre: "Punto ReVuelta - Laureles",
    direccion: "Circular 3 # 72-18",
    horario: "8:30 a.m. - 7:30 p.m.",
    latitud: 6.2444,
    longitud: -75.5922
}

const puntoBelen = {
    id: 3,
    nombre: "Punto ReVuelta - Belén",
    direccion: "Cra 76 # 30A-25",
    horario: "9:00 a.m. - 7:00 p.m.",
    latitud: 6.2307,
    longitud: -75.601
}

const puntoEnvigado = {
    id: 4,
    nombre: "Punto ReVuelta - Envigado",
    direccion: "Cra 43 # 35 Sur-21",
    horario: "8:00 a.m. - 7:00 p.m.",
    latitud: 6.1706,
    longitud: -75.586
}

const puntoSabaneta = {
    id: 5,
    nombre: "Punto ReVuelta - Sabaneta",
    direccion: "Cra 45 # 68 Sur-14",
    horario: "8:30 a.m. - 6:30 p.m.",
    latitud: 6.151,
    longitud: -75.6157
}

const puntoItagui = {
    id: 6,
    nombre: "Punto ReVuelta - Itagüí",
    direccion: "Cra 50A # 51-29",
    horario: "8:00 a.m. - 7:00 p.m.",
    latitud: 6.1712,
    longitud: -75.6113
}

const puntoFloresta = {
    id: 7,
    nombre: "Punto ReVuelta - Floresta",
    direccion: "Cra 81 # 48A-20",
    horario: "9:00 a.m. - 7:30 p.m.",
    latitud: 6.2587,
    longitud: -75.5988
}

const puntoBuenosAires = {
    id: 8,
    nombre: "Punto ReVuelta - Buenos Aires",
    direccion: "Calle 49 # 30-22",
    horario: "8:00 a.m. - 7:30 p.m.",
    latitud: 6.2393,
    longitud: -75.5538
}

const transportista = {
    id: 1,
    nombre: "Envios Rapidos SAS"
}

export const seguimientosEnvioMock = {
    "001": {
        pedidoId: "001",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 1,
                nombre: "Blusa roja"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "11111111-1111-1111-1111-111111111001",
                codigoGuia: "REV-ENV-001",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 1,
                    nombre: "Blusa roja"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Pedido confirmado",
                        fechaHora: "2026-07-10T09:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: null,
                        situacion: "actual"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: null,
                        situacion: "pendiente"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoBelen,
                puntoDestino: puntoLaureles,
                transportista,
                costoEnvio: 12000
            }
        ]
    },

    "002": {
        pedidoId: "002",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 2,
                nombre: "Mochila"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "22222222-2222-2222-2222-222222222002",
                codigoGuia: "REV-ENV-002",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 2,
                    nombre: "Mochila"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Pedido confirmado",
                        fechaHora: "2026-08-09T08:45:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: "2026-08-09T10:20:00",
                        situacion: "completado"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: "2026-08-09T13:10:00",
                        situacion: "completado"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: "2026-08-10T09:15:00",
                        situacion: "completado"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: null,
                        situacion: "actual"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: null,
                        situacion: "pendiente"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoFloresta,
                puntoDestino: puntoEnvigado,
                transportista,
                costoEnvio: 13500
            }
        ]
    },

    "003": {
        pedidoId: "003",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 3,
                nombre: "Chaqueta azul"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "33333333-3333-3333-3333-333333333003",
                codigoGuia: "REV-ENV-003",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 3,
                    nombre: "Chaqueta azul"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Pedido confirmado",
                        fechaHora: "2026-08-20T08:00:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: "2026-08-20T09:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: "2026-08-20T12:00:00",
                        situacion: "completado"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: "2026-08-20T15:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: "2026-08-21T08:40:00",
                        situacion: "completado"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: "2026-08-21T13:20:00",
                        situacion: "completado"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: "2026-08-21T17:10:00",
                        situacion: "completado"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoSabaneta,
                puntoDestino: puntoPoblado,
                transportista,
                costoEnvio: 14000
            }
        ]
    },

    "004": {
        pedidoId: "004",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 4,
                nombre: "Chaqueta negra"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "44444444-4444-4444-4444-444444444004",
                codigoGuia: "REV-ENV-004",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 4,
                    nombre: "Chaqueta negra"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Pedido confirmado",
                        fechaHora: "2026-08-25T09:00:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pedido cancelado",
                        fechaHora: "2026-08-25T11:30:00",
                        situacion: "actual"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoBuenosAires,
                puntoDestino: puntoItagui,
                transportista,
                costoEnvio: 0
            }
        ]
    },

    "005": {
        pedidoId: "005",
        tipoOperacion: "trueque",
        prendas: [
            {
                id: 5,
                nombre: "Camiseta gris"
            },
            {
                id: 6,
                nombre: "Camibuso azul"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "55555555-5555-5555-5555-555555555051",
                codigoGuia: "REV-ENV-005-A",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 5,
                    nombre: "Camiseta gris"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Trueque aceptado",
                        fechaHora: "2026-08-26T08:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: "2026-08-26T09:15:00",
                        situacion: "completado"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: "2026-08-26T11:20:00",
                        situacion: "completado"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: "2026-08-26T14:00:00",
                        situacion: "completado"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: "2026-08-27T08:20:00",
                        situacion: "completado"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: "2026-08-27T13:10:00",
                        situacion: "completado"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: "2026-08-27T17:00:00",
                        situacion: "completado"
                    }
                ],
                tipoEntrega: "propia",
                puntoOrigen: puntoEnvigado,
                puntoDestino: puntoLaureles,
                transportista,
                costoEnvio: 12500
            },
            {
                id: 2,
                envioId: "55555555-5555-5555-5555-555555555052",
                codigoGuia: "REV-ENV-005-B",
                etiqueta: "Entrega de la otra persona",
                prenda: {
                    id: 6,
                    nombre: "Camibuso azul"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Trueque aceptado",
                        fechaHora: "2026-08-26T08:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: "2026-08-26T10:00:00",
                        situacion: "completado"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: "2026-08-26T12:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: "2026-08-26T15:10:00",
                        situacion: "completado"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: "2026-08-27T08:50:00",
                        situacion: "completado"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: "2026-08-27T13:45:00",
                        situacion: "completado"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: "2026-08-27T17:30:00",
                        situacion: "completado"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoBelen,
                puntoDestino: puntoSabaneta,
                transportista,
                costoEnvio: 13800
            }
        ]
    },

    "006": {
        pedidoId: "006",
        tipoOperacion: "trueque",
        prendas: [
            {
                id: 7,
                nombre: "Chaqueta negra"
            },
            {
                id: 8,
                nombre: "Camiseta blanca"
            }
        ],
        entregas: [
            {
                id: 1,
                envioId: "11111111-1111-1111-1111-111111111111",
                codigoGuia: "REV-ENV-006-A",
                etiqueta: "Tu entrega",
                prenda: {
                    id: 7,
                    nombre: "Chaqueta negra"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Trueque aceptado",
                        fechaHora: "2026-08-27T10:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: null,
                        situacion: "actual"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: null,
                        situacion: "pendiente"
                    }
                ],
                tipoEntrega: "propia",
                puntoOrigen: puntoPoblado,
                puntoDestino: puntoFloresta,
                transportista,
                costoEnvio: 12500
            },
            {
                id: 2,
                envioId: "22222222-2222-2222-2222-222222222222",
                codigoGuia: "REV-ENV-006-B",
                etiqueta: "Entrega de Laura",
                prenda: {
                    id: 8,
                    nombre: "Camiseta blanca"
                },
                estados: [
                    {
                        id: 1,
                        estado: "Trueque aceptado",
                        fechaHora: "2026-08-27T10:30:00",
                        situacion: "completado"
                    },
                    {
                        id: 2,
                        estado: "Pendiente de entrega en",
                        punto: "origen",
                        fechaHora: "2026-08-27T12:15:00",
                        situacion: "completado"
                    },
                    {
                        id: 3,
                        estado: "Prenda recibida en",
                        punto: "origen",
                        fechaHora: "2026-08-27T14:20:00",
                        situacion: "completado"
                    },
                    {
                        id: 4,
                        estado: "Procesamiento en bodega",
                        fechaHora: null,
                        situacion: "actual"
                    },
                    {
                        id: 5,
                        estado: "Traslado hacia",
                        punto: "destino",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 6,
                        estado: "Lista para ser recogida",
                        fechaHora: null,
                        situacion: "pendiente"
                    },
                    {
                        id: 7,
                        estado: "Recogida por el usuario",
                        fechaHora: null,
                        situacion: "pendiente"
                    }
                ],
                tipoEntrega: "recibida",
                puntoOrigen: puntoItagui,
                puntoDestino: puntoBuenosAires,
                transportista,
                costoEnvio: 13800
            }
        ]
    }
}