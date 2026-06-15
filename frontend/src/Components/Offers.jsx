import React from 'react'
import { Link } from 'react-router-dom'

export const Offers = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 md:px-16 py-16'>
      <div className="relative overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
          alt="Exclusive offers"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 px-8 sm:px-16 py-16 sm:py-24 flex flex-col gap-5 max-w-lg">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-300 font-medium">
            Limited Time
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            Exclusive Offers <br />
            <span className="font-medium">For You</span>
          </h1>

          <p className="text-gray-300 text-sm font-light tracking-wide">
            Only on best seller products
          </p>

          <div className="mt-2">
            <Link
              to="/shop"
              className="group relative inline-flex items-center overflow-hidden border border-white px-8 py-3 text-xs uppercase tracking-widest text-white hover:text-black transition-colors duration-500"
            >
              <span className="relative z-10">Check Now</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}