import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

export default function ProductDisplay(props) {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [mainImg, setMainImg] = useState(product.image);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setMainImg(product.image);
        setSize(null);
        setQuantity(1);
    }, [product.id]);

    const handleAddToCart = () => {
        // Call addToCart `quantity` times to match the selected quantity
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        navigate('/cart');
    };

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16'>

            {/* ── Left: Images (unchanged) ── */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
                <div className="flex sm:flex-col gap-3">
                    {[product.image, product.image, product.image, product.image].map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setMainImg(img)}
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-opacity ${mainImg === img ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
                <div className="flex-1 rounded-3xl overflow-hidden bg-gray-100 aspect-square group">
                    <img
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                        src={mainImg}
                        alt={product.name}
                    />
                </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="flex flex-col pt-2">

                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-3">
                    {product.category}
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl font-light text-black leading-tight tracking-tight mb-5">
                    {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-xl font-light text-black">Rs {product.new_price}</span>
                    {product.old_price && (
                        <span className="text-sm text-gray-400 line-through font-light">
                            Rs {product.old_price}
                        </span>
                    )}
                </div>

                <div className="border-t border-gray-200 mb-6" />

                <p className="text-gray-500 text-sm leading-[1.9] font-light mb-8">
                    A thoughtfully constructed piece built for everyday wear. Clean lines, quality fabric,
                    and a relaxed fit make this a versatile staple — designed to complement your wardrobe
                    across seasons without compromise.
                </p>

                <div className="border-t border-gray-200 mb-6" />

                {/* Size */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
                            Size
                        </span>
                        <button className="text-xs uppercase tracking-widest text-gray-400 underline underline-offset-4 hover:text-black transition-colors">
                            Size Guide
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['S', 'M', 'L', 'XL'].map(s => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`h-12 border text-xs uppercase tracking-widest font-light transition-colors duration-200 ${
                                    size === s
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black border-gray-300 hover:border-black'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-6" />

                {/* Quantity + Add to Wardrobe */}
                <div className="flex items-stretch gap-3">
                    <div className="flex items-center border border-gray-300 h-14 min-w-[130px]">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="flex-1 h-full flex items-center justify-center text-black hover:bg-gray-50 transition-colors text-base font-light"
                        >
                            −
                        </button>
                        <span className="w-10 h-full flex items-center justify-center text-sm font-light border-x border-gray-300 select-none">
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="flex-1 h-full flex items-center justify-center text-black hover:bg-gray-50 transition-colors text-base font-light"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-black text-white h-14 text-xs uppercase tracking-[0.2em] font-medium border border-black hover:bg-white hover:text-black transition-colors duration-300"
                    >
                        Add to Wardrobe
                    </button>
                </div>

                <div className="text-xs text-gray-400 space-y-2 pt-6 mt-6 border-t border-gray-200 font-light">
                    <p>
                        <span className="uppercase tracking-widest text-black font-medium mr-2">Category</span>
                        {product.category}
                    </p>
                    <p>
                        <span className="uppercase tracking-widest text-black font-medium mr-2">Tags</span>
                        Modern, Latest
                    </p>
                </div>

            </div>
        </div>
    );
}