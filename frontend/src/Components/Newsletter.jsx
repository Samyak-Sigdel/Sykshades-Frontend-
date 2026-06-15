import React from 'react'

export const Newsletter = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 md:px-16 py-20'>
      <div className="border-t border-gray-200 pt-16 flex flex-col gap-5">

        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
          Stay Updated
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight max-w-lg">
          Get Exclusive Offers <br />
          <span className="font-medium">On Your Email</span>
        </h1>

        <p className="text-gray-500 text-sm font-light tracking-wide">
          Subscribe to our newsletter and stay updated
        </p>

        <div className="flex mt-2">
          <input
            type="email"
            placeholder='Your email address'
            className="flex-1 max-w-sm border border-gray-300 border-r-0 px-5 py-3.5 text-xs tracking-wide focus:outline-none focus:border-black transition-colors font-light"
          />
          <button className="bg-black text-white px-8 text-xs uppercase tracking-[0.2em] font-medium border border-black hover:bg-white hover:text-black transition-colors duration-300">
            Subscribe
          </button>
        </div>

      </div>
    </div>
  )
}