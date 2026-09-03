import ProveedorAutenticacion from './context/ProveedorAutenticacion'
import TestModalResena from './components/TestModalResena' // Ajusta la ruta si lo guardaste en otra carpeta

function App() {
  return (
    <ProveedorAutenticacion>
      {/* Componente de prueba temporal para ver la modal */}
      <TestModalResena />
      
      {/* Tu enrutador normal (puedes comentarlo si solo quieres ver la modal) */}
      {/* <AppRouter /> */}
    </ProveedorAutenticacion>
  )
}

export default App