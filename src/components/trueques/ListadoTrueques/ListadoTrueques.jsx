import TarjetaTrueque from '../TarjetaTrueque/TarjetaTrueque.jsx'
import styles from './ListadoTrueques.module.css'

export default function ListadoTrueques({
  trueques = [],
  onVerDetalles,
  onCancelarPropuesta,
  onNuevaPropuesta,
  onAceptarPropuesta,
  onRechazarPropuesta,
}) {
  if (!trueques || trueques.length === 0) {
    return (
      <div className={styles.sinResultados}>
        <h2>No encontramos trueques</h2>
        <p>Prueba ajustando el estado, el rango de fechas o el término de búsqueda.</p>
      </div>
    )
  }

  return (
    <div className={styles.listado}>
      {trueques.map((item) => (
        <TarjetaTrueque
          key={item.id}
          trueque={item}
          onVerDetalles={onVerDetalles}
          onCancelarPropuesta={onCancelarPropuesta}
          onNuevaPropuesta={onNuevaPropuesta}
          onAceptarPropuesta={onAceptarPropuesta}
          onRechazarPropuesta={onRechazarPropuesta}
        />
      ))}
    </div>
  )
}
