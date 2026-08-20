import Hero from "./Home/Hero/Hero";
import heroImg from "../../assets/landing_img.jpeg";
import CategoriasDestacadas from "./Home/CategoriasDestacadas/CategoriasDestacadas";
import Estadisticas from "./Home/Estadisticas/Estadisticas";
function Home() {
    const handleExplorarCatalogo = () => {
        console.log("Ir a catálogo con categoría Todas");
    };

    const handleSeleccionarCategoria = (nombreCategoria) => {
        console.log("Filtrar catálogo por categoría:", nombreCategoria);
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
        </main>
    );
}

export default Home;