import { useEffect, useRef, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { LocateFixed } from "lucide-react"
import ModalMapaPuntoAcopio from "./ModalMapaPuntoAcopio"
import styles from "./MapaPuntoAcopio.module.css"

maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_KEY

const MapaPuntoAcopio = ({ longitud, latitud, nombrePunto }) => {
    const [mapaCargado, setMapaCargado] = useState(false)

    const contenedorMapa = useRef(null)
    const mapa = useRef(null)

    const volverAlPunto = () => {
        if (!mapa.current) return

        mapa.current.flyTo({
            center: [longitud, latitud],
            zoom: 15
        })
    }

    useEffect(() => {
        if (!contenedorMapa.current) return
        if (mapa.current) return

        mapa.current = new maptilersdk.Map({
            container: contenedorMapa.current,
            style: "outdoor-v4",
            center: [longitud, latitud],
            zoom: 15,
            attributionControl: {
                compact: true
            }
        })

        

        mapa.current.fire("drag")

        new maptilersdk.Marker({
            color: "var(--color-pine)"
        })
            .setLngLat([longitud, latitud])
            .addTo(mapa.current)

        mapa.current.on("load", () => {
            setMapaCargado(true)
        })

        return () => {
            mapa.current?.remove()
            mapa.current = null
        }
    }, [latitud, longitud])

    return (
        <div className={styles.contenedorMapa}>
            <div className={styles.mapa} ref={contenedorMapa}></div>

            {mapaCargado && (
                <>
                    <button className={styles.botonVolverPunto} onClick={volverAlPunto}>
                        <LocateFixed />
                    </button>

                    <ModalMapaPuntoAcopio longitud={longitud} latitud={latitud} nombrePunto={nombrePunto} />
                </>
            )}
        </div>
    )
}

export default MapaPuntoAcopio