import React from 'react'

export const Breadcrum = (props) => {
    const { product } = props;
    return (
        <div className='flex items-center gap-2 text-sm text-gray-500 px-4 sm:px-8 py-6 max-w-7xl mx-auto'>
            <span className="hover:text-black cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="hover:text-black cursor-pointer transition-colors">Shop</span>
            <span>/</span>
            <span className="hover:text-black cursor-pointer transition-colors">{product.category}</span>
            <span>/</span>
            <span className="text-black font-medium">{product.name}</span>
        </div>
    )
}