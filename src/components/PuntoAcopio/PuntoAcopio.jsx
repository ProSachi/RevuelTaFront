import LogicaPuntoAcopio from './LogicaPuntoAcopio.jsx'
import puntosAcopio from '../../data/PuntoAcopio.js'

function AppRouter() {
  return (
    <LogicaPuntoAcopio
      isOpen={true}
      estadoLogistico="Pendiente"
      puntoRecogidaOriginal={puntosAcopio[0]}
      puntoEntregaOriginal={puntosAcopio[1]}
      todosLosPuntos={puntosAcopio}
    />
  )
}

export default AppRouter