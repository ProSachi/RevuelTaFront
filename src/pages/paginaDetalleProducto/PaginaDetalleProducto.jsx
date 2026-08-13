import { useState, useEffect } from 'react';
import InformacionProducto from '../../components/paginaDetalleProductos/InformacionProducto';
import SeccionesProducto from '../../components/paginaDetalleProductos/SeccionesProducto';
import ProductosRelacionados from '../../components/paginaDetalleProductos/ProductosRelacionados';
import GaleriaProducto from '../../components/paginaDetalleProductos/GaleriaProducto';
import { fetchProductById, fetchProducts } from '../../services/productService';

const PaginaDetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducto = async (id) => {
    try {
      setLoading(true);
      const p = await fetchProductById(id);
      const relacionados = await fetchProducts(4);
      p.relacionados = relacionados.filter(r => r.id !== p.id).slice(0, 4);
      setProducto(p);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      const path = window.location.pathname || '';
      const match = path.match(/\/producto\/(\d+)/);
      if (match) {
        const id = Number(match[1]);
        await loadProducto(id);
        return;
      }

      // Si no hay id en la URL, se intenta obtener el primer producto disponible
      try {
        const lista = await fetchProducts(1);
        const first = Array.isArray(lista) && lista.length > 0 ? lista[0] : null;
        const id = first ? first.id : null;
        if (id) await loadProducto(id);
        else setError('No hay productos disponibles para mostrar');
      } catch (e) {
        console.error(e);
        setError('No se pudo cargar el producto');
      }
    };

    loadInitial();

    const onPop = () => {
      const m = window.location.pathname.match(/\/producto\/(\d+)/);
      const i = m ? Number(m[1]) : null;
      if (i) (async () => { await loadProducto(i); })();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleAgregarCarrito = (prod, talla, cantidad) => {
    console.log('Agregado al carrito:', { prod, talla, cantidad });
  };

  const handleProponerTrueque = () => {
    const usuarioAutenticado = true;
    if (usuarioAutenticado) alert('Abriendo modal de trueque del producto...');
    else alert('Abriendo modal de identificación (Login)...');
  };

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="detalle-producto-container">
      <div className="detalle-grid">
        <GaleriaProducto key={producto.id} imagenes={producto.imagenes} />
        <InformacionProducto
          producto={producto}
          onAgregarCarrito={handleAgregarCarrito}
          onProponerTrueque={handleProponerTrueque}
        />
      </div>

      <SeccionesProducto infoSecciones={producto.secciones} producto={producto} />

      <ProductosRelacionados
        productos={producto.relacionados}
        onSeleccionarProducto={(id) => {
          window.history.pushState({ productoId: id }, '', `/producto/${id}`);
          loadProducto(id);
        }}
      />
    </div>
  );
};

export default PaginaDetalleProducto;
