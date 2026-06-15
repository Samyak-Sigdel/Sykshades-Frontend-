import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { ProductGrid } from './ProductGrid'

export const RelatedProduct = ({ category, currentId }) => {
  const { all_product } = useContext(ShopContext);

  const related = all_product
    .filter(item => item.category === category && item.id !== currentId)
    .slice(0, 4);

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-gutter py-16'>
      <div className="mb-10">
        <span className="editorial-label text-luxury-gray-400 mb-2 block">You May Also Like</span>
        <h1 className="font-display text-3xl md:text-4xl text-black tracking-tight font-normal">Related Products</h1>
      </div>
      <ProductGrid products={related} />
    </div>
  )
}