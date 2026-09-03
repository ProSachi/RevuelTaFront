import AppRouter from './router/AppRouter'
import ProveedorAutenticacion from './context/ProveedorAutenticacion'

function App() {
    return (
        <ProveedorAutenticacion><AppRouter /></ProveedorAutenticacion>
    )
}

export default App