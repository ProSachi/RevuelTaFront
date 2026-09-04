import React from 'react';
import styles from './TarjetaReporte.module.css';
import { FaExclamationCircle, FaClock, FaTag } from 'react-icons/fa';

const TarjetaReporte = ({ motivo, descripcion, estado, prioridad, fecha }) => {
    // Normalizar clases de estado para estilos dinámicos
    const estadoClass = styles[estado?.toLowerCase()] || styles.estadoDefault;
    const prioridadClass = styles[`prioridad_${prioridad?.toLowerCase()}`] || styles.prioridadDefault;

    // Formatear la fecha si viene en string/ISO
    const formatearFecha = (fechaTexto) => {
        if (!fechaTexto) return "Sin fecha";
        try {
            const date = new Date(fechaTexto);
            if (isNaN(date.getTime())) return fechaTexto;
            return new Intl.DateTimeFormat('es-CO', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).format(date);
        } catch {
            return fechaTexto;
        }
    };

    return (
        <div className={styles.tarjeta}>
            {/* Encabezado: Motivo del reporte y Fecha */}
            <div className={styles.cabecera}>
                <div className={styles.motivoWrapper}>
                    <FaExclamationCircle className={styles.iconoAlerta} />
                    <h3 className={styles.titulo}>{motivo || "Reporte de usuario"}</h3>
                </div>
                <span className={styles.fecha}>
                    <FaClock className={styles.iconoFecha} />
                    {formatearFecha(fecha)}
                </span>
            </div>

            {/* Cuerpo: Descripción o comentario */}
            <div className={styles.contenido}>
                <p className={styles.comentario}>
                    {descripcion || "Sin descripción proporcionada."}
                </p>
            </div>

            {/* Pie de tarjeta: Badges de Estado y Prioridad */}
            <div className={styles.footerDetalles}>
                <div className={styles.badgeGroup}>
                    <span className={`${styles.badge} ${estadoClass}`}>
                        {estado || "Pendiente"}
                    </span>
                    <span className={`${styles.badge} ${prioridadClass}`}>
                        Prioridad: {prioridad || "Normal"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TarjetaReporte;