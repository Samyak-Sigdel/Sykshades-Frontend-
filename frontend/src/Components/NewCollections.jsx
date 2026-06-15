import React, { useEffect, useState } from 'react'
import { Item } from './Item'

export const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
          Just Arrived
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight">
          New Collections
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {new_collections.map((item, i) => (
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