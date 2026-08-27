
const IconoPrenda = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 4 6l1.5 2.5L7 7.5V20h10V7.5l1.5 1L20 6l-4-3-2 1.5h-4z" />
  </svg>
);

const IconoTrueque = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h13l-3-3" />
    <path d="M20 16H7l3 3" />
  </svg>
);

const IconoResena = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" stroke="none">
    <path d="M12 2l2.9 6.26L21.8 9l-5 4.87L18.2 21 12 17.27 5.8 21l1.4-7.13L2.2 9l6.9-.74z" />
  </svg>
);

const IconoAmigo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 4.3c1.2.5 2 1.7 2 3.1 0 1.4-.8 2.6-2 3.1" />
    <path d="M21 20c0-2.6-1.8-4.8-4.2-5.6" />
  </svg>
);

const iconosPorTipo = {
  prenda: IconoPrenda,
  trueque: IconoTrueque,
  resena: IconoResena,
  amigo: IconoAmigo,
};

export const IconoMovimiento = ({ tipo }) => {
  const Icono = iconosPorTipo[tipo] || IconoResena;
  return (
    <span className="icono-movimiento">
      <Icono />
    </span>
  );
};
