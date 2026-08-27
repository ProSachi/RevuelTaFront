import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
=======
import './index.css'
import App from './App.jsx'
import { ConnectedUserProvider } from './context/ConnectedUser.context'
import { ProveedorAutenticacion } from './context/ProveedorAutenticacion'
import { BrowserRouter } from 'react-router-dom'
>>>>>>> feature/deibyvt

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
      <ConnectedUserProvider>
        <ProveedorAutenticacion>
          <App />
        </ProveedorAutenticacion>
      </ConnectedUserProvider>
>>>>>>> feature/deibyvt
    </BrowserRouter>
  </StrictMode>,
)
