import React from 'react'
import { HiCheckBadge } from 'react-icons/hi2';
import { HiXCircle } from 'react-icons/hi2';

const Verified = ({ isVerified }) => {

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm font-medium text-gray-700">
            {isVerified ? (
                <>
                    <HiCheckBadge className="text-green-500 text-lg" />
                    <span>Vendedor verificado</span>
                </>
            ) : (
                <>
                    <HiXCircle className="text-red-500 text-lg" />
                    <span>Vendedor no verificado</span>
                </>
            )}
        </div>
    )
}

export default Verified