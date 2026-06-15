import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { WishlistContext } from '../Context/WishlistContext'
import { Item } from '../Components/Item'
import { Link } from 'react-router-dom'

export const Wishlist = () => {
  const { all_product } = useContext(ShopContext);
  const { wishlistItems } = useContext(WishlistContext);

  const items = all_product.filter(p => wishlistItems[p.id]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

      {/* Header */}
      <div className="mb-10 border-b border-gray-200 pb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
          Your
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight">
          Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-5 py-20">
          <p className="text-sm font-light text-gray-400 tracking-wide">
            Your wishlist is empty.
          </p>
          <Link
            to="/shop"
            className="group relative inline-flex items-center overflow-hidden border border-black px-8 py-3 text-xs uppercase tracking-widest text-black hover:text-white transition-colors duration-500"
          >
            <span className="relative z-10">Browse Collection</span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </Link>
        </div>
      ) : (
        <>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-8">
            {items.length} {items.length === 1 ? 'Item' : 'Items'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {items.map((item, i) => (
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
        </>
      )}

    </div>
  )
}