import FormularioReporteVendedor from "./components/pages/FormularioReportarVendedor/FormularioReporteVendedor";
import PruebaPaginaReport from "./pages/PruebaPaginaReport";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext, useState } from 'react'
import { ConnectedUserContext } from './context/ConnectedUser.context';
import Profile from './pages/community/Profile';

function App() {
  const [count, setCount] = useState(0)
  const { connectedUser, setConnectedUser } = useContext(ConnectedUserContext);

  return (
    <Profile />
  )
}

export default App;