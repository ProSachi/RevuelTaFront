import Hero from "../components/home/Hero/Hero";
import Estadisticas from "../components/home/Estadisticas/Estadisticas";
import CategoriasDestacadas from "../components/home/CategoriasDestacadas/CategoriasDestacadas";
import heroImg from "../assets/hero_fashion_concept.png";

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