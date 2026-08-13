import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConnectedUserProvider } from './contexts/ConnectedUser.context.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConnectedUserProvider>
        <App />
      </ConnectedUserProvider>
    </BrowserRouter>
  </StrictMode>,
)
