import { useEffect, useRef, useState } from "react"
import { EllipsisVertical, LocateFixed, MapPin, X } from "lucide-react"
import { importLibrary } from "./googleMaps"
import styles from "./FormularioRutaPuntoAcopio.module.css"

const calcularDistancia = (origen, destino) => {
    const radioTierra = 6371000
    const convertirRadianes = (grados) => grados * Math.PI / 180

    const diferenciaLatitud = convertirRadianes(
        destino.latitud - origen.latitud
    )

    const diferenciaLongitud = convertirRadianes(
        destino.longitud - origen.longitud
    )

    const latitudOrigen = convertirRadianes(origen.latitud)
    const latitudDestino = convertirRadianes(destino.latitud)

    const calculo =
        Math.sin(diferenciaLatitud / 2) ** 2 +
        Math.cos(latitudOrigen) *
        Math.cos(latitudDestino) *
        Math.sin(diferenciaLongitud / 2) ** 2

    return radioTierra * 2 * Math.atan2(
        Math.sqrt(calculo),
        Math.sqrt(1 - calculo)
    )
}

const FormularioRutaPuntoAcopio = ({
    nombrePunto,
    longitudPunto,
    latitudPunto,
    onSeleccionarOrigen
}) => {
    const [errorBusqueda, setErrorBusqueda] = useState("")
    const [placeIdSeleccionado, setPlaceIdSeleccionado] = useState(null)
    const [siguiendoUbicacion, setSiguiendoUbicacion] = useState(false)
    const [textoBuscador, setTextoBuscador] = useState("")

    const contenedorBuscadorGoogle = useRef(null)
    const buscadorGoogle = useRef(null)
    const detalleLugar = useRef(null)
    const solicitudLugar = useRef(null)

    const seguimientoUbicacion = useRef(null)
    const ultimaUbicacionEnviada = useRef(null)

    const detenerSeguimientoUbicacion = () => {
        if (seguimientoUbicacion.current !== null) {
            navigator.geolocation.clearWatch(
                seguimientoUbicacion.current
            )

            seguimientoUbicacion.current = null
        }

        ultimaUbicacionEnviada.current = null
        setSiguiendoUbicacion(false)
    }

    useEffect(() => {
        if (!contenedorBuscadorGoogle.current) return

        let activo = true
        let elementoAutocomplete = null

        const cargarBuscador = async () => {
            try {
                const { PlaceAutocompleteElement } = await importLibrary("places")

                if (!activo) return
                if (!contenedorBuscadorGoogle.current) return

                elementoAutocomplete = new PlaceAutocompleteElement({
                    includedRegionCodes: ["co"],
                    locationBias: {
                        center: {
                            lat: latitudPunto,
                            lng: longitudPunto
                        },
                        radius: 50000
                    },
                    origin: {
                        lat: latitudPunto,
                        lng: longitudPunto
                    },
                    requestedLanguage: "es",
                    requestedRegion: "co"
                })

                elementoAutocomplete.placeholder = "Escribe tu dirección exacta"
                elementoAutocomplete.noInputIcon = true
                elementoAutocomplete.noClearButton = true
                elementoAutocomplete.className = styles.buscadorGoogle

                const manejarEntrada = () => {
                    setTextoBuscador(
                        elementoAutocomplete.value ?? ""
                    )
                }

                const seleccionarLugar = async (event) => {
                    try {
                        const placePrediction = event.placePrediction

                        if (!placePrediction) {
                            setErrorBusqueda(
                                "No fue posible obtener esta dirección."
                            )
                            return
                        }

                        detenerSeguimientoUbicacion()

                        const lugar = placePrediction.toPlace()

                        await lugar.fetchFields({
                            fields: [
                                "id",
                                "displayName",
                                "formattedAddress",
                                "location"
                            ]
                        })

                        const ubicacion = lugar.location

                        if (!ubicacion) {
                            setErrorBusqueda(
                                "No se encontraron coordenadas para esta dirección."
                            )
                            return
                        }

                        const nombreOrigen =
                            lugar.formattedAddress ||
                            lugar.displayName ||
                            "Origen seleccionado"

                        elementoAutocomplete.value = nombreOrigen

                        setTextoBuscador(nombreOrigen)
                        setPlaceIdSeleccionado(lugar.id ?? null)
                        setErrorBusqueda("")

                        onSeleccionarOrigen({
                            nombre: nombreOrigen,
                            longitud: ubicacion.lng(),
                            latitud: ubicacion.lat()
                        })

                        elementoAutocomplete.blur()
                    } catch (error) {
                        console.error(
                            "Error obteniendo el lugar:",
                            error
                        )

                        setErrorBusqueda(
                            "No fue posible obtener esta dirección."
                        )
                    }
                }

                const manejarError = () => {
                    setErrorBusqueda(
                        "No fue posible buscar la dirección."
                    )
                }

                elementoAutocomplete.addEventListener(
                    "input",
                    manejarEntrada
                )

                elementoAutocomplete.addEventListener(
                    "gmp-select",
                    seleccionarLugar
                )

                elementoAutocomplete.addEventListener(
                    "gmp-error",
                    manejarError
                )

                contenedorBuscadorGoogle.current.appendChild(
                    elementoAutocomplete
                )

                buscadorGoogle.current = elementoAutocomplete

                elementoAutocomplete._manejarEntrada = manejarEntrada
                elementoAutocomplete._seleccionarLugar = seleccionarLugar
                elementoAutocomplete._manejarError = manejarError
            } catch (error) {
                console.error(
                    "Error cargando Google Places:",
                    error
                )

                setErrorBusqueda(
                    "No fue posible cargar el buscador."
                )
            }
        }

        cargarBuscador()

        return () => {
            activo = false

            if (elementoAutocomplete) {
                elementoAutocomplete.removeEventListener(
                    "input",
                    elementoAutocomplete._manejarEntrada
                )

                elementoAutocomplete.removeEventListener(
                    "gmp-select",
                    elementoAutocomplete._seleccionarLugar
                )

                elementoAutocomplete.removeEventListener(
                    "gmp-error",
                    elementoAutocomplete._manejarError
                )

                elementoAutocomplete.remove()
            }

            buscadorGoogle.current = null
        }
    }, [
        longitudPunto,
        latitudPunto,
        onSeleccionarOrigen
    ])

    useEffect(() => {
        if (!placeIdSeleccionado) return
        if (!solicitudLugar.current) return

        solicitudLugar.current.place = placeIdSeleccionado
    }, [placeIdSeleccionado])

    useEffect(() => {
        return () => {
            if (seguimientoUbicacion.current !== null) {
                navigator.geolocation.clearWatch(
                    seguimientoUbicacion.current
                )
            }
        }
    }, [])

    const seleccionarUbicacionActual = () => {
        if (!navigator.geolocation) {
            setErrorBusqueda(
                "Tu navegador no permite obtener la ubicación."
            )
            return
        }

        detenerSeguimientoUbicacion()

        setPlaceIdSeleccionado(null)
        setSiguiendoUbicacion(true)
        setTextoBuscador("Tu ubicación")
        setErrorBusqueda("")

        ultimaUbicacionEnviada.current = null

        if (buscadorGoogle.current) {
            buscadorGoogle.current.value = "Tu ubicación"
            buscadorGoogle.current.blur()
        }

        seguimientoUbicacion.current =
            navigator.geolocation.watchPosition(
                (posicion) => {
                    const nuevaUbicacion = {
                        nombre: "Tu ubicación",
                        longitud: posicion.coords.longitude,
                        latitud: posicion.coords.latitude
                    }

                    if (buscadorGoogle.current) {
                        buscadorGoogle.current.value = "Tu ubicación"

                        buscadorGoogle.current.origin = {
                            lat: nuevaUbicacion.latitud,
                            lng: nuevaUbicacion.longitud
                        }

                        buscadorGoogle.current.locationBias = {
                            center: {
                                lat: nuevaUbicacion.latitud,
                                lng: nuevaUbicacion.longitud
                            },
                            radius: 50000
                        }
                    }

                    setTextoBuscador("Tu ubicación")

                    if (ultimaUbicacionEnviada.current) {
                        const distancia = calcularDistancia(
                            ultimaUbicacionEnviada.current,
                            nuevaUbicacion
                        )

                        if (distancia < 15) return
                    }

                    ultimaUbicacionEnviada.current = nuevaUbicacion

                    setErrorBusqueda("")

                    onSeleccionarOrigen(
                        nuevaUbicacion
                    )
                },
                (error) => {
                    console.error(
                        "Error obteniendo ubicación:",
                        error
                    )

                    detenerSeguimientoUbicacion()

                    if (error.code === error.PERMISSION_DENIED) {
                        setErrorBusqueda(
                            "Debes permitir el acceso a tu ubicación."
                        )
                        return
                    }

                    if (error.code === error.TIMEOUT) {
                        setErrorBusqueda(
                            "La ubicación tardó demasiado en responder."
                        )
                        return
                    }

                    setErrorBusqueda(
                        "No fue posible obtener tu ubicación."
                    )
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            )
    }

    const limpiarBuscador = () => {
        detenerSeguimientoUbicacion()

        if (buscadorGoogle.current) {
            buscadorGoogle.current.value = ""
            buscadorGoogle.current.focus()
        }

        setTextoBuscador("")
        setPlaceIdSeleccionado(null)
        setErrorBusqueda("")

        onSeleccionarOrigen(null)
    }

    return (
        <div className={styles.formularioRuta}>
            <div className={styles.indicadoresRuta}>
                <LocateFixed className={styles.iconoOrigen} />
                <EllipsisVertical className={styles.iconoConexion} />
                <MapPin className={styles.iconoDestino} />
            </div>

            <div className={styles.camposRuta}>
                <div className={styles.campoRuta}>
                    <div className={styles.contenedorBuscador}>
                        <div
                            className={styles.contenedorBuscadorGoogle}
                            ref={contenedorBuscadorGoogle}>
                        </div>

                        {textoBuscador && (
                            <button
                                type="button"
                                className={styles.botonLimpiar}
                                onClick={limpiarBuscador}>
                                <X />
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`${styles.opcionUbicacion} ${siguiendoUbicacion ? styles.opcionUbicacionActiva : ""}`}
                        onClick={seleccionarUbicacionActual}>
                        <LocateFixed />
                        <span>Tu ubicación</span>
                    </button>

                    {placeIdSeleccionado && (
                        <gmp-place-details-compact
                            ref={detalleLugar}
                            className={styles.detalleLugar}
                            truncation-preferred>
                            <gmp-place-details-place-request
                                ref={solicitudLugar}>
                            </gmp-place-details-place-request>
                            <gmp-place-content-config>
                                <gmp-place-media></gmp-place-media>
                                <gmp-place-address></gmp-place-address>
                                <gmp-place-attribution></gmp-place-attribution>
                            </gmp-place-content-config>
                        </gmp-place-details-compact>
                    )}

                    {errorBusqueda && (
                        <span className={styles.errorBusqueda}>
                            {errorBusqueda}
                        </span>
                    )}
                </div>

                <div className={styles.campoRuta}>
                    <input
                        type="text"
                        value={nombrePunto ?? ""}
                        disabled />
                </div>
            </div>
        </div>
    )
}

export default FormularioRutaPuntoAcopio