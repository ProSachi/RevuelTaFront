import { useEffect, useState } from 'react';
import styles from './ReportesPropios.module.css';
import TarjetaReporte from '../tarjetaReporte/TarjetaReporte';
import { useOutletContext } from 'react-router-dom';
import LoadingComunity from '../loading/LoadingComunity';
import MensajeError from '../mensajeError/MensajeError';
import sinResenas from '../../../assets/sinResenas.svg';
import imagenError from '../../../assets/errorserver.jpeg';
import { reportServices } from '../../../services/reportServices/resportServices';

const ReportesPropios = () => {

  const { id, myProfile } = useOutletContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {

      try {

        const response = await reportServices.getReportForReported(id);
        setReports(response?.data || response || []);

      } catch (error) {
        if (error.response && error.response.status === 404) {
          setReports([]);
        } else {
          setError(true);
          setReports([]);
        }
      } finally {

        setLoading(false);

      }

    };

    fetchReports();

  }, [id]);

  // 1. Estado de carga
  if (loading) {
    return (
      <div className={styles.seccionTabsAreaContenido}>
        <LoadingComunity />
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

  /* 3. Estado de contenido (con o sin reportes) */
  const reportsExist = Array.isArray(reports) && reports.length > 0;

  return (
    <>

      <div className={styles.reportesPropiosContenedor}>
        {reportsExist ? (
            <div className={styles.reportesPropiosGrid}>
              {reports.map((report) => (
                <TarjetaReporte
                  key={report.id}
                  motivo={report.motivo || 'Sin título'}
                  descripcion={report.descripcion || 'Sin comentario'}
                  estado={report.estado || 'Sin estado'}
                  prioridad={report.prioridad || 'Sin prioridad'}
                  fecha={report.fecha || 'Sin fecha'}
                />
              ))}
            </div>
          ) : (
            <MensajeError
              imagen={sinResenas}
              alt={myProfile ? "Sin reportes" : "Usuario sin reportes"}
              titulo={myProfile ? "AÚN NO TIENES NINGÚN REPORTE." : "ESTE PERFIL NO TIENE REPORTES."}
              mensajePrincipal={myProfile ? "No hay reportes asociados a tu perfil." : "No hay reportes asociados a este perfil."}
              mensajeSecundario={null}
            />
          )}
      </div>
    </>
  );
};

export default ReportesPropios;