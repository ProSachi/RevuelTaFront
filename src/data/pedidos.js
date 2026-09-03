const pedidos = [
    {
        id: "001",
        fecha: "2026-07-10",
        estado: "En preparación",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 1,
                nombre: "Blusa roja",
                precio: 50000
            }
        ]
    },
    {
        id: "002",
        fecha: "2026-08-09",
        estado: "Enviado",
        tipoOperacion: "compra",
        prendas: [
            {
                id: 2,
                nombre: "Mochila",
                precio: 80000
            }
        ]
    },
    {
        id: "003",
        fecha: "2026-08-20",
        estado: "Entregado",
        tipoOperacion: "compra",
        tieneResena: true,
        prendas: [
            {
                id: 3,
                nombre: "Chaqueta azul",
                precio: 90000
            }
        ]
    },
    {
        id: "004",
        fecha: "2026-08-25",
        estado: "Cancelado",
        tipoOperacion: "compra",
        motivoCancelacion: "Producto no disponible",
        estadoReembolso: "Pendiente",
        prendas: [
            {
                id: 4,
                nombre: "Chaqueta negra",
                precio: 120000
            }
        ]
    },
    {
        id: "005",
        fecha: "2026-08-26",
        estado: "Entregado",
        tipoOperacion: "trueque",
        tieneResena: true,
        saldoTrueque: -10000,
        prendas: [
            {
                id: 5,
                nombre: "Camiseta gris"
            },
            {
                id: 6,
                nombre: "Camibuso azul"
            }
        ]
    },
    {
        id: "006",
        fecha: "2026-08-27",
        estado: "En preparación",
        tipoOperacion: "trueque",
        saldoTrueque: 0,
        prendas: [
            {
                id: 7,
                nombre: "Chaqueta negra"
            },
            {
                id: 8,
                nombre: "Camiseta blanca"
            }
        ]
    }
]

export default pedidos