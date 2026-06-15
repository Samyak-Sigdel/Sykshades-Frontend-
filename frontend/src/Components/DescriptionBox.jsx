import React, { useState } from 'react'

export const DescriptionBox = () => {
  const [tab, setTab] = useState('description');

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-8 mt-12'>
        <div className="flex border border-gray-200 rounded-t-2xl overflow-hidden">
            <button 
                onClick={() => setTab('description')}
                className={`px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${tab === 'description' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
            >
                Description
            </button>
            <button 
                onClick={() => setTab('reviews')}
                className={`px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${tab === 'reviews' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
            >
                Reviews (122)
            </button>
        </div>

        <div className="border border-t-0 border-gray-200 rounded-b-2xl p-6 sm:p-10 space-y-5 text-sm leading-relaxed text-gray-600">
            <p>An engaging e-commerce website beckons with its seamless user experience, a digital marketplace where convenience meets variety.
                 Its virtual aisles showcase an array of products, meticulously categorized and accompanied by vivid imagery and concise
                  descriptions. Navigation is intuitive, guiding visitors effortlessly from browsing to checkout. Secure payment gateways 
                  instill trust, ensuring transactions are safe and swift. Customer reviews and ratings provide valuable insights, fostering
                   confidence in purchasing decisions.</p>
            <p>Browse through our extensive catalog of products, ranging from electronics to fashion, home goods to fitness equipment. With intuitive 
            navigation and user-friendly design, finding what you need is effortless. Secure payment options and reliable shipping ensure peace of
             mind with every purchase. Whether you're searching for the latest trends or everyday essentials, our e-commerce platform is your go-to
              destination for all your shopping needs.</p>
        </div>
    </div>
  )
}