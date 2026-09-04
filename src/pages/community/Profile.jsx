import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import ImagenPerfil from '../../components/profiles/imagenPerfil/ImagenPerfil';
import Verificado from '../../components/profiles/verificacion/Verificado';
import { MdEdit } from "react-icons/md";
import { FaStar, FaExclamationTriangle, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import BotonPerfilNavegacion from '../../components/profiles/botonNavecionPerfil/BotonPerfilNavegacion';
import TarjetaEstadisticaPerfil from '../../components/profiles/tarjetaEstadisticaPerfil/TarjetaEstadisticaPerfil';
import CalificacionEstrellas from '../../components/profiles/estrellasCalificacion/CalificacionEstrellas';
import styles from './Profile.module.css';
import { useConnectedUser } from '../../context/ConnectedUser.context';
import { userServices } from '../../services/userServices/userServices';
import { ratingServices } from '../../services/ratingServices/ratingServices';
import { orderServices } from '../../services/OrderServices/orderServices';
import { exchangeServices } from '../../services/exchangeServices/exchangeServices';
import { reportServices } from '../../services/reportServices/resportServices';
import LoadingComunity from '../../components/profiles/loading/LoadingComunity';
import MensajeError from '../../components/profiles/mensajeError/MensajeError';
import imagenError from '../../assets/errorserver.jpeg';

const Profile = () => {

    {/* modelo response de usuario
        {
          id : null,
          nombre : null,
          correo : null,
          rol : null,
          activo : null,
          color_avatar : null,
          fecha_registro : null
        }  
    */}

    const { id } = useParams();
    const location = useLocation();
    const { connectedUser } = useConnectedUser();
    const [myProfile, setMyProfile] = useState(false);
    const [otherProfile, setOtherProfile] = useState({});
    const [orders, setOrders] = useState({});
    const [exchange, setExchange] = useState({});
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [average, setAverage] = useState(0);
    const [verified, setVerified] = useState(false);
    const cargarReportes = useCallback(async () => {
        try {
            const reportData = await reportServices.getReportForReported(id);
            setReport(reportData?.data || reportData || []);
        } catch {
            setReport([]);
        }
    }, [id]);

    useEffect(() => {
        const fetchUserProfile = async () => {

            try {
                if (connectedUser?.id === String(id) || connectedUser?.Id === String(id)) {
                    setMyProfile(true);
                    setVerified(Boolean(connectedUser?.activo));
                } else {
                    const data = await userServices.getById(id);
                    setOtherProfile(data);
                    setMyProfile(false);
                    setVerified(Boolean(data?.activo));
                }

                try {
                    const ratingsResponse = await ratingServices.getAllRatingsForUserId(id);
                    if (ratingsResponse && ratingsResponse.length > 0) {
                        const totalPuntaje = ratingsResponse.reduce((acumulado, rating) => acumulado + rating.puntaje, 0);
                        setAverage(totalPuntaje / ratingsResponse.length);
                    } else {
                        setAverage(0);
                    }
                } catch {
                    setAverage(0);
                }

                try {
                    const ordersData = await orderServices.getOrderForSeller(id);
                    setOrders(ordersData?.data || ordersData || []);
                } catch {
                    setOrders([]);
                }

                try {
                    const exchangeData = await exchangeServices.getExchangeForUserId(id);
                    setExchange(exchangeData?.data || exchangeData || []);
                } catch {
                    setExchange([]);
                }

                await cargarReportes();

            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserProfile();
        }

    }, [id, connectedUser, cargarReportes]);


    // 1. Estado de carga
    if (loading) {
        return (
            <div className={styles.seccionTabsAreaContenido}>
                <LoadingComunity />;
            </div>
        );
    }

    // 2. Estado de error
    if (error) {
        return (
            <div className={styles.seccionTabsAreaContenido}>
                <MensajeError
                    imagen={imagenError}
                    alt={"Error al comunicarse con el servidor"}
                    titulo={"¡ERROR CRITICO DEL SERVIDOR!"}
                    mensajePrincipal={"Parece que hubo un problema al conectar con el servidor... Intentalo más tarde."}
                    mensajeSecundario={"(Trabajamos para que esto no vuelva a suceder)"}
                />
            </div>
        )
    }

    /* 3. perfil */

    const activeUser = myProfile ? connectedUser : otherProfile;

    return (
        <div className={styles.perfilPaginaWrapper}>

            


            {/* Cabecera del perfil */}
            <div className={styles.cabeceraContenedor}>
                <div className={styles.columnaIzquierda}>
                    <div className={styles.avatarWrapper}>
                        <ImagenPerfil
                            imagen={activeUser?.color_avatar || null}
                            iconoFallback={FaUserCircle}
                            nombreUsuario={activeUser?.nombre || 'Usuario'}
                        />
                    </div>

                    <div className={styles.detallesUsuario}>
                        <h2 className={styles.nombreUsuario}>{activeUser?.nombre || 'Cargando...'}</h2>
                        <span className={styles.miembroDesde}>
                            Miembro desde: {
                                new Intl.DateTimeFormat('es-CO', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                }).format(new Date(activeUser?.fechaRegistro))

                            }
                        </span>

                        <div className={styles.estrellasWrapper}>
                            <CalificacionEstrellas promedio={average} tamano="1.25rem" />
                        </div>
                    </div>
                </div>

                <div className={styles.columnaDerecha}>
                    <div className={styles.verificadoBadge}>
                        <Verificado estaVerificado={verified} />
                    </div>

                    <div className={styles.accionesBotones}>
                        {myProfile ? (
                            <BotonPerfilNavegacion
                                direccion="editar"
                                state={{ backgroundLocation: location }}
                                icono={MdEdit}
                                nombre="Editar Perfil"
                            />
                        ) : (
                            <>
                                <BotonPerfilNavegacion
                                    direccion="calificar"
                                    state={{ backgroundLocation: location }}
                                    icono={FaStar}
                                    nombre="Calificar"
                                />
                                <BotonPerfilNavegacion
                                    direccion="reportar"
                                    state={{ backgroundLocation: location }}
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
                    <BotonPerfilNavegacion direccion="prendasPublicadas" state={""} icono={null} nombre={'Prendas Publicadas'} />
                    <BotonPerfilNavegacion direccion="resenas" state={""} icono={null} nombre={'Reseñas'} />
                    <BotonPerfilNavegacion direccion="reportes" state={""} icono={null} nombre={'Reportes'} />
                </div>
                <Outlet context={{ id, myProfile, vendedor: otherProfile, onReporteCreado: cargarReportes }} />
            </div>
        </div>
    );
};

export default Profile;