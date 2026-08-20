import React, { useState } from "react";
import PuntoAcopio from "./components/PuntoAcopio";
import puntosAcopio from "./data/PuntoAcopio";

function App() {
    const [modalAbierta, setModalAbierta] = useState(true);

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>Puntos de Acopio linea muerta Alejandro - Puntos de Acopio</h1>
            
            <button 
                onClick={() => setModalAbierta(true)}
                style={{
                    padding: "12px 24px",
                    backgroundColor: "#1F5E4A",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                Abrir Puntos de Acopio
            </button>

            <PuntoAcopio
                isOpen={modalAbierta}
                onClose={() => setModalAbierta(false)}
                estadoLogistico="Pendiente"
                puntoRecogidaOriginal={puntosAcopio[0]}
                puntoEntregaOriginal={puntosAcopio[1]}
                todosLosPuntos={puntosAcopio}
            />
        </div>
    );
}

export default App;