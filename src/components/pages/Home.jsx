import Hero from "./Home/Hero/Hero";
import heroImg from "../../assets/landing_img.jpeg";
import CategoriasDestacadas from "./Home/CategoriasDestacadas/CategoriasDestacadas";
import Estadisticas from "./Home/Estadisticas/Estadisticas";
import ProductosDestacados from "./Home/ProductosDestacados/ProductosDestacados";
import ComoFunciona from "./Home/ComoFunciona/ComoFunciona";
import MarcasDestacadas from "./Home/MarcasDestacadas/MarcasDestacadas";
import Testimonios from "./Home/Testimonios/Testimonios";

function Home() {
    const handleExplorarCatalogo = () => {
        console.log("Ir a catálogo con categoría Todas");
    };

    const handleSeleccionarCategoria = (nombreCategoria) => {
        console.log("Filtrar catálogo por categoría:", nombreCategoria);
    };

    const handleVerProducto = (idProducto) => {
        
        console.log("Abrir modal de producto:", idProducto);
    };

    const handleAgregarCarrito = (idProducto) => {
        
        console.log("Agregar al carrito / abrir modal:", idProducto);
    };

    const handleTrueque = (idProducto) => {
        
        console.log("Iniciar trueque:", idProducto);
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
        </main>
    );
}

export default Home;