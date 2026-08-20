import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConnectedUserContext } from '../../context/ConnectedUser.context';
import ImagenPerfil from '../../components/profiles/imagenPerfil/ImagenPerfil';
import Verificado from '../../components/profiles/verificacion/Verificado';
import { MdEdit } from "react-icons/md";
import { FaStar, FaExclamationTriangle, FaShoppingBag } from "react-icons/fa";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import BotonPerfilNavegacion from '../../components/profiles/botonNavecionPerfil/BotonPerfilNavegacion';
import TarjetaEstadisticaPerfil from '../../components/profiles/tarjetaEstadisticaPerfil/TarjetaEstadisticaPerfil';
import CalificacionEstrellas from '../../components/profiles/estrellasCalificacion/CalificacionEstrellas';
import PrendasPropias from '../../components/profiles/prendasPropias/PrendasPropias';
import ResenasPropias from '../../components/profiles/ResenasPropias/ResenasPropias';
import styles from './Profile.module.css';

const Profile = () => {
    const { connectedUser } = useContext(ConnectedUserContext);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [myProfile, setMyProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [promedio, setPromedio] = useState(4);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (connectedUser?.id === String(id)) {
                    setUser(connectedUser);
                    setMyProfile(true);
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/users/${id}`);
                if (!response.ok) throw new Error("Error al obtener el perfil");
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [id, connectedUser]);

    return (
        <div className={styles.perfilPaginaWrapper}>
            {/* Cabecera del perfil */}
            <div className={styles.cabeceraContenedor}>
                {/* Columna Izquierda: Foto, Nombre, Fecha y Estrellas */}
                <div className={styles.columnaIzquierda}>
                    <div className={styles.avatarWrapper}>
                        <ImagenPerfil imagen={user?.avatar || ''} nombreUsuario={user?.nombre || 'Juan Zapata'} />
                    </div>

                    <div className={styles.detallesUsuario}>
                        <h2 className={styles.nombreUsuario}>{user?.nombre || 'Nombre de Usuario'}</h2>
                        <span className={styles.miembroDesde}>Miembro desde: {user?.fechaRegistro || '2026'}</span>

                        <div className={styles.estrellasWrapper}>
                            <CalificacionEstrellas promedio={promedio} tamano="1.25rem" />
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Badge de Verificado y Botones de Acción */}
                <div className={styles.columnaDerecha}>
                    <div className={styles.verificadoBadge}>
                        <Verificado estaVerificado={true} />
                    </div>

                    <div className={styles.accionesBotones}>
                        {myProfile ? (
                            <BotonPerfilNavegacion
                                direccion="/editar"
                                icono={MdEdit}
                                nombre="Editar Perfil"
                            />
                        ) : (
                            <>
                                <BotonPerfilNavegacion
                                    direccion="/calificar"
                                    icono={FaStar}
                                    nombre="Calificar"
                                />
                                <BotonPerfilNavegacion
                                    direccion="/reportar"
                                    icono={FaExclamationTriangle}
                                    nombre="Reportar"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Estadísticas del perfil */}
            <div className={styles.contenedorGeneral}>
                <div className={styles.gridEstadisticas}>
                    <TarjetaEstadisticaPerfil icono={FaShoppingBag} nombreEstadistica={'Ventas Realizadas'} valorEstadistica={25} />
                    <TarjetaEstadisticaPerfil icono={HiOutlineSwitchHorizontal} nombreEstadistica={'Trueques Exitosos'} valorEstadistica={25} />
                    <TarjetaEstadisticaPerfil icono={FaExclamationTriangle} nombreEstadistica={'Reportes'} valorEstadistica={0} />
                    <TarjetaEstadisticaPerfil icono={FaStar} nombreEstadistica={'Calificación'} valorEstadistica={promedio} />
                </div>
            </div>

            {/* Contenido Dinámico del Perfil */}
            <div className={styles.seccionTabsContenedor}>
                <div className={styles.seccionTabsBarraNav}>
                    <BotonPerfilNavegacion direccion={'/prendasPublicadas'} icono={null} nombre={'Prendas Publicadas'} />
                    <BotonPerfilNavegacion direccion={'/Reseñas'} icono={null} nombre={'Reseñas'} />
                </div>

                <PrendasPropias myProfile={myProfile} />
                <ResenasPropias />
            </div>
        </div>
    );
};

export default Profile;