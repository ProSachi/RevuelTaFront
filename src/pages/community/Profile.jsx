import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ImagenPerfil from '../../components/profiles/imagenPerfil/ImagenPerfil';
import Verificado from '../../components/profiles/verificacion/Verificado';
import { MdEdit } from "react-icons/md";
import { FaStar, FaExclamationTriangle, FaShoppingBag, FaUser, FaUserCircle } from "react-icons/fa";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import BotonPerfilNavegacion from '../../components/profiles/botonNavecionPerfil/BotonPerfilNavegacion';
import TarjetaEstadisticaPerfil from '../../components/profiles/tarjetaEstadisticaPerfil/TarjetaEstadisticaPerfil';
import CalificacionEstrellas from '../../components/profiles/estrellasCalificacion/CalificacionEstrellas';
import PrendasPropias from '../../components/profiles/prendasPropias/PrendasPropias';
import ResenasPropias from '../../components/profiles/ResenasPropias/ResenasPropias';
import styles from './Profile.module.css';
import { useConnectedUser } from '../../context/ConnectedUser.context';
import { userServices } from '../../services/userServices/userServices';
import { ratingServices } from '../../services/ratingServices/ratingServices';
import { orderServices } from '../../services/OrderServices/orderServices';
import { exchangeServices } from '../../services/exchangeServices/exchangeServices';
import { reportServices } from '../../services/reportServices/resportServices';

const Profile = () => {

    {/* modelo response de usuario
        {
          Id : null,
          nombre : null,
          correo : null,
          rol : null,
          activo : null,
          color_avatar : null,
          fecha_registro : null
        }  
    */}

    const { id } = useParams();
    const { connectedUser } = useConnectedUser;
    const [myProfile, setMyProfile] = useState(false);
    const [otherProfile, setOtherProfile] = useState({});
    const [ratings, setRatings] = useState({});
    const [orders, setOrders] = useState({});
    const [exchange, setExchange] = useState({});
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [average, setAverage] = useState(0);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (connectedUser?.id === String(id)) {
                    setMyProfile(true);
                    setVerified(connectedUser.activo)
                } else {
                    const data = await userServices.getById(id);
                    setOtherProfile(data);
                    setVerified(otherProfile.activo)
                }

                const response = await ratingServices.getAllRatingsForUserId(id);
                const ratings = response.data;

                if (ratings && ratings.length > 0) {

                    const totalPuntaje = ratings.reduce((acumulado, rating) => acumulado + rating.puntaje, 0);

                    const promedioCalculado = totalPuntaje / ratings.length;

                    setAverage(promedioCalculado);

                } else {

                    setAverage(0);

                }

                response = await orderServices.getOrderForSeller(id);
                setOrders(response.data);

                response = await exchangeServices.getExchangeForUserId(id);
                setExchange(response.data);

                response = await reportServices.getReportForReported(id);
                setReport(response.data);

            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <div className={styles.perfilPaginaWrapper}>
            {/* Cabecera del perfil */}
            <div className={styles.cabeceraContenedor}>
                {/* Columna Izquierda: Foto, Nombre, Fecha y Estrellas */}
                <div className={styles.columnaIzquierda}>
                    <div className={styles.avatarWrapper}>
                        {
                            myProfile ?
                                (<ImagenPerfil imagen={connectedUser?.color_avatar || null} iconoFallback={FaUserCircle} nombreUsuario={connectedUser.nombre} />)
                                :
                                (<ImagenPerfil imagen={connectedUser?.color_avatar || null} iconoFallback={FaUserCircle} nombreUsuario={otherProfile.nombre} />)
                        }
                    </div>

                    <div className={styles.detallesUsuario}>

                        {
                            myProfile ?
                                (<>
                                    <h2 className={styles.nombreUsuario}>{connectedUser.nombre}</h2>
                                    <span className={styles.miembroDesde}>Miembro desde: {connectedUser.fecha_registro}</span>
                                </>)
                                :
                                (<>
                                    <h2 className={styles.nombreUsuario}>{otherProfile.nombre}</h2>
                                    <span className={styles.miembroDesde}>Miembro desde: {otherProfile.fecha_registro}</span>
                                </>)
                        }

                        <div className={styles.estrellasWrapper}>
                            <CalificacionEstrellas promedio={average} tamano="1.25rem" />
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Badge de Verificado y Botones de Acción */}
                <div className={styles.columnaDerecha}>
                    <div className={styles.verificadoBadge}>
                        <Verificado estaVerificado={verified} />
                    </div>

                    <div className={styles.accionesBotones}>
                        {myProfile ? (
                            <BotonPerfilNavegacion
                                direccion={`/editar/${id}`}
                                icono={MdEdit}
                                nombre="Editar Perfil"
                            />
                        ) : (
                            <>
                                <BotonPerfilNavegacion
                                    direccion={`/calificar/${id}`}
                                    icono={FaStar}
                                    nombre="Calificar"
                                />
                                <BotonPerfilNavegacion
                                    direccion={`/reportar/${id}`}
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
                    <TarjetaEstadisticaPerfil icono={FaShoppingBag} nombreEstadistica={'Ventas Realizadas'} valorEstadistica={orders.length || 0} />
                    <TarjetaEstadisticaPerfil icono={HiOutlineSwitchHorizontal} nombreEstadistica={'Trueques Exitosos'} valorEstadistica={exchange.length || 0} />
                    <TarjetaEstadisticaPerfil icono={FaExclamationTriangle} nombreEstadistica={'Reportes'} valorEstadistica={report.length || 0} />
                    <TarjetaEstadisticaPerfil icono={FaStar} nombreEstadistica={'Calificación'} valorEstadistica={average} />
                </div>
            </div>

            {/* Contenido Dinámico del Perfil */}
            <div className={styles.seccionTabsContenedor}>
                <div className={styles.seccionTabsBarraNav}>
                    <BotonPerfilNavegacion direccion={'/perfil/prendasPublicadas'} icono={null} nombre={'Prendas Publicadas'} />
                    <BotonPerfilNavegacion direccion={'/perfil/resenas'} icono={null} nombre={'Reseñas'} />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;