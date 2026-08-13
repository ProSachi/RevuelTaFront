import React from 'react'
import { Link } from 'react-router-dom'

const ButtonProfileNavigation = ({direction, icons, name}) => {
  const IconComponent = icons;

  return (
    <div>
      <Link 
        to={direction} 
        className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md shadow-sm hover:bg-gray-50 active:scale-95 active:translate-y-0.5 active:shadow-none transition-all duration-150 ease-in-out select-none"
      >
        <div>{IconComponent && <IconComponent className="w-4 h-4" />}</div>
        <span>{name}</span>
      </Link>
    </div>
  )
}

export default ButtonProfileNavigation