import React, { useEffect, useState } from 'react'
import { Item } from './Item'

export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-8 py-16'>

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
          Trending Now
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight">
          Popular in Women
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

    </div>
  )
}