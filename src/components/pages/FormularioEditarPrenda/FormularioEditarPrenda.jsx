import { forwardRef, useImperativeHandle, useState } from "react";
import estilos from "./FormularioEditarPrenda.module.css";

const CAMPOS = ["nombrePrenda","marca","talla","categoria","precio","estadoPrenda","cantidadDisponible"];

const normalizar = (datos) => ({
  ...datos,
  nombrePrenda: datos.nombrePrenda.trim(),
  marca: datos.marca.trim(),
  precio: Number(datos.precio),
  cantidadDisponible: Number(datos.cantidadDisponible),
});

const sonIguales = (a,b) => CAMPOS.every((campo) => String(a[campo]) === String(b[campo]));

const FormularioEditarPrenda = forwardRef(function FormularioEditarPrenda({ prendaOriginal, onChange }, ref) {
  const [datos, setDatos] = useState({ ...prendaOriginal });
  const [errores, setErrores] = useState({});

  function cambiar(campo, valor) {
    const siguientes = { ...datos, [campo]: valor };
    setDatos(siguientes);
    onChange?.(siguientes);
  }

  function validarYObtenerDatos() {
    const e = {};
    ["nombrePrenda","marca","talla","categoria","estadoPrenda"].forEach((campo) => {
      if (String(datos[campo] ?? "").trim() === "") e[campo] = "Este campo es obligatorio.";
    });
    if (datos.precio === "" || Number(datos.precio) <= 0) e.precio = "Ingresa un precio válido mayor que 0.";
    if (datos.cantidadDisponible === "" || !Number.isInteger(Number(datos.cantidadDisponible)) || Number(datos.cantidadDisponible) < 0) {
      e.cantidadDisponible = "Ingresa una cantidad entera igual o mayor que 0.";
    }
    setErrores(e);
    if (Object.keys(e).length) return { esValido:false };
    return { esValido:true, datos:normalizar(datos) };
  }

  useImperativeHandle(ref, () => ({ validarYObtenerDatos, hayCambiosReales: !sonIguales(normalizar(datos), normalizar(prendaOriginal)) }));

  return (
    <div className={estilos.formulario}>
      <Campo label="Nombre de la prenda" valor={datos.nombrePrenda} error={errores.nombrePrenda} onChange={(v)=>cambiar("nombrePrenda",v)} />
      <Campo label="Marca" valor={datos.marca} error={errores.marca} onChange={(v)=>cambiar("marca",v)} />
      <SelectCampo label="Talla" valor={datos.talla} error={errores.talla} opciones={["XS","S","M","L","XL","XXL"]} onChange={(v)=>cambiar("talla",v)} />
      <SelectCampo label="Categoría" valor={datos.categoria} error={errores.categoria} opciones={["Camisetas","Pantalones","Chaquetas","Vestidos","Zapatos","Accesorios"]} onChange={(v)=>cambiar("categoria",v)} />
      <Campo label="Precio" tipo="number" min="1" valor={datos.precio} error={errores.precio} onChange={(v)=>cambiar("precio",v)} />
      <SelectCampo label="Estado de la prenda" valor={datos.estadoPrenda} error={errores.estadoPrenda} opciones={["Nuevo","Como nuevo","Buen estado","Usado"]} onChange={(v)=>cambiar("estadoPrenda",v)} />
      <Campo label="Cantidad disponible" tipo="number" min="0" valor={datos.cantidadDisponible} error={errores.cantidadDisponible} onChange={(v)=>cambiar("cantidadDisponible",v)} />
    </div>
  );
});

function Campo({label,tipo="text",min,valor,error,onChange}) {
  return <label className={estilos.campo}><span>{label} *</span><input type={tipo} min={min} value={valor} onChange={(e)=>onChange(e.target.value)} />{error&&<small>{error}</small>}</label>;
}
function SelectCampo({label,valor,error,opciones,onChange}) {
  return <label className={estilos.campo}><span>{label} *</span><select value={valor} onChange={(e)=>onChange(e.target.value)}><option value="">Selecciona una opción</option>{opciones.map(o=><option key={o} value={o}>{o}</option>)}</select>{error&&<small>{error}</small>}</label>;
}
export default FormularioEditarPrenda;
