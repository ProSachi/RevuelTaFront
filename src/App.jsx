import FormularioReporteVendedor from "./components/pages/FormularioReportarVendedor/FormularioReporteVendedor";
import PruebaPaginaReport from "./pages/PruebaPaginaReport";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <header style={{
        backgroundColor: "var(--color-paper-2)",
        borderBottom: "1px solid var(--color-line)",
        padding: "0.85rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: "800",
            color: "var(--color-pine)",
            letterSpacing: "-0.02em"
          }}>
            ReVuelta
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            backgroundColor: "var(--color-pine)",
            color: "white",
            padding: "0.15rem 0.45rem",
            borderRadius: "var(--radius-sm)"
          }}>
            FRONT
          </span>
        </div>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link
            to="/test-reporte"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--color-ink)",
              textDecoration: "none",
              padding: "0.4rem 0.8rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(31, 94, 74, 0.08)"
            }}
          >
            Prueba Modal Reporte
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<PruebaPaginaReport />} />
          <Route path="/test-reporte" element={<PruebaPaginaReport />} />
          <Route path="/reportar-vendedor" element={<FormularioReporteVendedor />} />        
          {/* En el futuro:
              <Route path="/perfil/:id" element={<PerfilVendedorPage />} />
          */}
        </Routes>
      </main>
    </BrowserRouter>
  );  
}

export default App;