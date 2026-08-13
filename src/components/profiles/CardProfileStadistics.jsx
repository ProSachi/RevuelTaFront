import React from 'react'

const CardProfileStadistics = ({ icons, nameStatistic, valueStatistic }) => {
  const IconComponent = icons;

  return (
    <div className="w-48 h-48 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
      
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-900">
        {IconComponent && <IconComponent className="w-6 h-6" />}
      </div>

      <span className="text-3xl font-bold text-gray-900 leading-tight">
        {valueStatistic}
      </span>

      <span className="text-xs font-medium text-gray-500 text-center">
        {nameStatistic}
      </span>
      
    </div>
  )
}

export default CardProfileStadistics