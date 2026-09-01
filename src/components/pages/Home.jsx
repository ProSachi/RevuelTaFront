import { useState } from "react";
import Hero from "./Home/Hero/Hero";
import CategoriasDestacadas from "./Home/CategoriasDestacadas/CategoriasDestacadas";
import Estadisticas from "./Home/Estadisticas/Estadisticas";
import ProductosDestacados from "./Home/ProductosDestacados/ProductosDestacados";
import ComoFunciona from "./Home/ComoFunciona/ComoFunciona";
import MarcasDestacadas from "./Home/MarcasDestacadas/MarcasDestacadas";
import Testimonios from "./Home/Testimonios/Testimonios";
import ProductModal from "../modals/ProductModal/ProductModal";
import TradeModal from "../modals/TradeModal/TradeModal";
import { mockUserGarments } from "../../data/mockUserGarments";

function Home() {
    const heroImg = "https://res.cloudinary.com/ihe8jaok/image/upload/v1788192323/landing_img.jpg";
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productModalAbierto, setProductModalAbierto] = useState(false);
    const [tradeModalAbierto, setTradeModalAbierto] = useState(false);

    const handleExplorarCatalogo = () => {
        console.log("Ir a catálogo con categoría Todas");
    };

    const handleSeleccionarCategoria = (nombreCategoria) => {
        console.log("Filtrar catálogo por categoría:", nombreCategoria);
    };

    const handleVerProducto = (producto) => {
        setProductoSeleccionado(producto);
        setProductModalAbierto(true);
    };

    const handleAgregarCarrito = (idProducto) => {
        console.log("Agregar al carrito / abrir modal:", idProducto);
    };

    const handleTrueque = (producto) => {
        setProductoSeleccionado(producto);
        setTradeModalAbierto(true);
    };

    const abrirTrueque = () => {
        setProductModalAbierto(false);
        setTradeModalAbierto(true);
    };

    return (
        <main>
            <Hero
                titulo="Dale una segunda vida a tu ropa"
                descripcion="Compra, vende y truequea prendas en un solo lugar."
                imagenSrc={heroImg}
                onExplorarCatalogo={handleExplorarCatalogo}
            />
            <Estadisticas />
            <CategoriasDestacadas onSeleccionarCategoria={handleSeleccionarCategoria} />
            <ProductosDestacados
                onVerProducto={handleVerProducto}
                onAgregarCarrito={handleAgregarCarrito}
                onTrueque={handleTrueque}
            />
            < ComoFunciona />
            < MarcasDestacadas />
            < Testimonios />

            <ProductModal
                producto={productoSeleccionado}
                estaAbierto={productModalAbierto}
                onCerrar={() => setProductModalAbierto(false)}
                onProponerTrueque={abrirTrueque}
            />

            <TradeModal
                productoObjetivo={productoSeleccionado}
                prendasUsuario={mockUserGarments}
                estaAbierto={tradeModalAbierto}
                onCerrar={() => setTradeModalAbierto(false)}
                onSubmit={(prendasIds) => {
                    console.log("Propuesta de trueque:", prendasIds);
                    setTradeModalAbierto(false);
                }}
            />
        </main>
    );
}

export default Home;