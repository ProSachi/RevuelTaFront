const MESES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];


export function formatearFechaCompleta(fecha) {
  const date = fecha instanceof Date ? fecha : new Date(fecha);

  if (Number.isNaN(date.getTime())) return '';

  const dia = date.getDate();
  const mes = MESES[date.getMonth()];
  const anio = date.getFullYear();

  let horas = date.getHours();
  const minutos = String(date.getMinutes()).padStart(2, '0');
  const periodo = horas >= 12 ? 'p.m.' : 'a.m.';

  horas = horas % 12;
  if (horas === 0) horas = 12;

  return `${dia} ${mes} ${anio}, ${horas}:${minutos} ${periodo}`;
}
