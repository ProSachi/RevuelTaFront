import { useState } from "react";
import ProductModal from "./components/modals/ProductModal/ProductModal";
import TradeModal from "./components/modals/TradeModal/TradeModal";
import { mockProducts } from "./data/mockProducts";
import { mockUserGarments } from "./data/mockUserGarments";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  return (
    <div>
      {/* Botón provisional, solo para probar — esto NO va al repo final */}
      <button onClick={() => {
        setSelectedProduct(mockProducts[0]);
        setIsProductModalOpen(true);
      }}>
        [PRUEBA] Abrir producto
      </button>

      {isProductModalOpen && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onProposeTrade={() => {
            setIsProductModalOpen(false);
            setIsTradeModalOpen(true);
          }}
        />
      )}

      {isTradeModalOpen && (
        <TradeModal
          targetProduct={selectedProduct}
          userGarments={mockUserGarments}
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          onSubmit={(selectedIds) => {
            console.log("Propuesta de trueque:", selectedIds);
            setIsTradeModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;