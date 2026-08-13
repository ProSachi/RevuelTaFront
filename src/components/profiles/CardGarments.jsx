import React from 'react'
import ButtonProfileNavigation from './ButtonProfileNavigation'
import { HiPencil } from 'react-icons/hi2';

const CardGarments = ({ image, title, price, size, id }) => {

    

    return (
        <div className="w-52 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm flex flex-col gap-3">

            <div className="relative aspect-square w-full bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">

                {/* Botón Editar flotante en la esquina superior derecha */}

                
                <div className="absolute top-2 right-2 z-10">
                    <ButtonProfileNavigation
                        name="Editar"
                        direction={`/prendas/editar/${id}`}
                        icons={HiPencil}
                    />
                </div>

                {/* Imagen del producto */}
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    /* Placeholder de icono si la imagen está vacía */
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}
            </div>

            {/* Información del Producto */}
            <div className="flex flex-col items-center text-center">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {title || "Nombre de producto"}
                </h3>

                {/* Prop opcional para la Talla (como en la imagen de referencia) */}
                <span className="text-xs text-gray-400 font-medium mt-0.5">
                    {size || "Talla"}
                </span>

                <span className="font-bold text-gray-900 text-sm mt-0.5">
                    {price || "Precio..."}
                </span>
            </div>

        </div>
    )
}

export default CardGarments