import { useState } from "react";
import NivelesBeneficios from "./components/NivelesBeneficios";
import "./App.css";

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h1>Prueba HU-DC02</h1>
      <button type="button" onClick={() => setModalAbierto(true)}>
        Ver niveles y beneficios
      </button>

      <NivelesBeneficios
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      />
    </div>
  );
}

export default App;
