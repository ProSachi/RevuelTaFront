
export const ofertaDestacada = {
  id: 'oferta-calzado',
  nombre: 'Especial Calzado Urbano',
  descripcionCorta: 'Hasta 20% de descuento en tu próxima rotación de tenis o botas de segunda vida.',
  descuentoTexto: '20%',
  imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
};

export const categoriasOferta = [
  { id: 'cat-of-1', nombre: 'Tenis' },
  { id: 'cat-of-2', nombre: 'Botas' },
  { id: 'cat-of-3', nombre: 'Accesorios' },
];

export const descuentosOferta = [
  { id: 101, categoria: 'Tenis', tipo: 'porcentaje', valor: 20, condicion: 'En tenis urbanos seleccionados', puntos: 400, imagen: '' },
  { id: 102, categoria: 'Botas', tipo: 'porcentaje', valor: 15, condicion: 'En botas de cuero reciclado', puntos: 350, imagen: '' },
  { id: 103, categoria: 'Accesorios', tipo: 'monto', valor: 8000, condicion: 'En medias y plantillas', puntos: 200, imagen: '' },
  { id: 104, categoria: 'Tenis', tipo: 'monto', valor: 12000, condicion: 'En compras desde $60.000', puntos: 450, imagen: '' },
  { id: 105, categoria: 'Botas', tipo: 'porcentaje', valor: 10, condicion: 'En botas impermeables', puntos: 300, imagen: '' },
];
