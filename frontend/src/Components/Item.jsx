import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import { WishlistContext } from '../Context/WishlistContext'

export const Item = (props) => {
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = !!wishlistItems[props.id];

  return (
    <div
      className="group relative flex flex-col bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-50 rounded-2xl"
      >
        <img
          src={props.image}
          alt={props.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
        />

        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(props.id); }}
          className={`absolute left-4 top-4 z-20 w-8 h-8 bg-white/90 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm ${
            isHovered || wishlisted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          } hover:bg-black hover:text-white`}
          aria-label="Toggle wishlist"
        >
          <Heart size={13} strokeWidth={1.5} className={wishlisted ? 'fill-black text-black' : ''} />
        </button>

        <div
          className={`absolute right-4 bottom-4 z-20 w-10 h-10 bg-white flex items-center justify-center shadow-sm rounded-full transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Plus size={16} strokeWidth={1.5} />
        </div>
      </Link>

      <div className="pt-4 pb-2 flex flex-col items-start">
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo(0, 0)}
          className="font-sans font-normal text-sm text-black tracking-wide hover:text-gray-500 transition-colors duration-300 mb-1 truncate w-full"
        >
          {props.name}
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-sans text-sm text-black font-medium">Rs {props.new_price}</span>
          <span className="font-sans text-xs text-gray-400 line-through font-light">Rs {props.old_price}</span>
        </div>
      </div>
    </div>
  )
}