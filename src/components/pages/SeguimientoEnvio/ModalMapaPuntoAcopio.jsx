import { useEffect, useRef, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { ChevronLeft, ChevronRight, LocateFixed, Maximize2, Minimize2, X } from "lucide-react"
import FormularioRutaPuntoAcopio from "./FormularioRutaPuntoAcopio"
import styles from "./ModalMapaPuntoAcopio.module.css"

maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_KEY

const ModalMapaPuntoAcopio = ({ longitud, latitud, nombrePunto }) => {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [origenSeleccionado, setOrigenSeleccionado] = useState(null)
    const [errorRuta, setErrorRuta] = useState("")
    const [panelVisible, setPanelVisible] = useState(true)

    const contenedorMapaModal = useRef(null)
    const mapaModal = useRef(null)
    const marcadorOrigen = useRef(null)

    const volverAlPuntoModal = () => {
        if (!mapaModal.current) return

        mapaModal.current.flyTo({
            center: [longitud, latitud],
            zoom: 15
        })
    }

    useEffect(() => {
        if (!modalAbierto) return
        if (!contenedorMapaModal.current) return
        if (mapaModal.current) return

        mapaModal.current = new maptilersdk.Map({
            container: contenedorMapaModal.current,
            style: "outdoor-v4",
            center: [longitud, latitud],
            zoom: 15,
            attributionControl: {
                compact: true
            }
        })

        mapaModal.current.on("styleimagemissing", (event) => {
            if (!mapaModal.current) return
            if (mapaModal.current.hasImage(event.id)) return

            mapaModal.current.addImage(event.id, {
                width: 1,
                height: 1,
                data: new Uint8Array([0, 0, 0, 0])
            })
        })

        requestAnimationFrame(() => {
            mapaModal.current?.resize()
        })

        mapaModal.current.fire("drag")

        new maptilersdk.Marker({
            color: "var(--color-pine)"
        })
            .setLngLat([longitud, latitud])
            .addTo(mapaModal.current)

        return () => {
            marcadorOrigen.current?.remove()
            marcadorOrigen.current = null

            mapaModal.current?.remove()
            mapaModal.current = null
        }
    }, [modalAbierto, latitud, longitud])

    useEffect(() => {
        if (!modalAbierto) return
        if (!origenSeleccionado) return
        if (!mapaModal.current) return

        const mapaActual = mapaModal.current
        let cancelado = false

        const mostrarOrigenYCalcularRuta = async () => {
            try {
                setErrorRuta("")

                marcadorOrigen.current?.remove()

                marcadorOrigen.current = new maptilersdk.Marker({color: "var(--color-clay)"})
                    .setLngLat([
                        origenSeleccionado.longitud,
                        origenSeleccionado.latitud
                    ])
                    .addTo(mapaActual)

                const url = `https://router.project-osrm.org/route/v1/driving/${origenSeleccionado.longitud},${origenSeleccionado.latitud};${longitud},${latitud}?overview=full&geometries=geojson`

                const respuesta = await fetch(url)

                if (!respuesta.ok) {
                    throw new Error("No se pudo calcular la ruta")
                }

                const datos = await respuesta.json()

                if (cancelado) return

                if (datos.code !== "Ok" || !datos.routes?.length) {
                    setErrorRuta("No se encontró una ruta hasta el punto ReVuelta.")
                    return
                }

                const geometriaRuta = datos.routes[0].geometry

                const rutaGeoJson = {
                    type: "Feature",
                    properties: {},
                    geometry: geometriaRuta
                }

                const fuenteRuta = mapaActual.getSource("ruta")

                if (fuenteRuta) {
                    fuenteRuta.setData(rutaGeoJson)
                } else {
                    mapaActual.addSource("ruta", {
                        type: "geojson",
                        data: rutaGeoJson
                    })

                    mapaActual.addLayer({
                        id: "ruta-linea",
                        type: "line",
                        source: "ruta",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round"
                        },
                        paint: {
                            "line-color": "#2563eb",
                            "line-width": 6
                        }
                    })
                }

                const limites = new maptilersdk.LngLatBounds()

                geometriaRuta.coordinates.forEach((coordenada) => {
                    limites.extend(coordenada)
                })

                mapaActual.fitBounds(limites, {
                    padding: 80,
                    maxZoom: 15
                })
            } catch (error) {
                if (cancelado) return

                console.error("Error calculando la ruta:", error)
                setErrorRuta("No fue posible calcular la ruta.")
            }
        }

        if (mapaActual.isStyleLoaded()) {
            mostrarOrigenYCalcularRuta()
        } else {
            mapaActual.once("load", mostrarOrigenYCalcularRuta)
        }

        return () => {
            cancelado = true
            mapaActual.off("load", mostrarOrigenYCalcularRuta)
        }
    }, [modalAbierto, origenSeleccionado, longitud, latitud])

    useEffect(() => {
        if (!modalAbierto) return

        const overflowAnterior = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = overflowAnterior
        }
    }, [modalAbierto])

    return (
        <>
            <button className={styles.botonAbrirMapaModal} onClick={() => setModalAbierto(true)}>
                <Maximize2 />
            </button>

            {modalAbierto && (
                <div className={styles.modalMapa}>
                    <div className={styles.contenidoModalMapa}>
                        <div className={styles.encabezadoModalMapa}>
                            <h2>Mapa de ruta</h2>

                            <button className={styles.botonCerrarModal} onClick={() => setModalAbierto(false)}>
                                <X />
                            </button>
                        </div>

                        <div className={styles.contenedorMapaModal}>
                            <div className={styles.mapaModal} ref={contenedorMapaModal}></div>

                            <div className={styles.panelRuta}>
                                <div className={`${styles.contenidoPanelRuta} ${!panelVisible ? styles.contenidoPanelRutaOculto : ""}`}>
                                    <FormularioRutaPuntoAcopio nombrePunto={nombrePunto} longitudPunto={longitud} latitudPunto={latitud} onSeleccionarOrigen={setOrigenSeleccionado} />

                                    {errorRuta && <span className={styles.errorRuta}>{errorRuta}</span>}
                                </div>

                                <button
                                    type="button"
                                    className={styles.botonAlternarPanel}
                                    onClick={() => setPanelVisible(!panelVisible)}>
                                    {panelVisible ? <ChevronLeft /> : <ChevronRight />}
                                </button>
                            </div>
                            <button className={styles.botonCerrarMapaModal} onClick={() => setModalAbierto(false)}>
                                <Minimize2 />
                            </button>

                            <button className={styles.botonVolverPuntoModal} onClick={volverAlPuntoModal}>
                                <LocateFixed />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalMapaPuntoAcopio