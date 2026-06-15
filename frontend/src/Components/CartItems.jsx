import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import toast from 'react-hot-toast';

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const subtotal = getTotalCartAmount();
    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;

    const cartHasItems = all_product.some(i => cartItems[i.id] > 0);

    const handleCheckout = () => {
    if (!localStorage.getItem('auth-token')) {
            toast.error("Please login to proceed to checkout");
            setTimeout(() => navigate('/login'), 1500);
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-8 py-16'>

            {/* Page title */}
            <div className="mb-10 border-b border-gray-200 pb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-2">Your</p>
                <h1 className="font-serif text-4xl sm:text-5xl font-light text-black tracking-tight">Wardrobe</h1>
            </div>

            {!cartHasItems ? (
                <p className="text-sm text-gray-400 font-light tracking-wide py-12 text-center">
                    Your wardrobe is empty.
                </p>
            ) : (
                <>
                    {/* Column headers */}
                    <div className="hidden md:grid grid-cols-6 gap-4 text-xs uppercase tracking-[0.15em] text-gray-400 font-medium pb-4 border-b border-gray-200">
                        <p className="col-span-2">Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p className="text-right">Remove</p>
                    </div>

                    {/* Cart rows */}
                    {all_product.map((i) => {
                        if (cartItems[i.id] > 0) {
                            return (
                                <div key={i.id} className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center py-7 border-b border-gray-100">

                                    {/* Product */}
                                    <div className="flex items-center gap-4 col-span-2">
                                        <img
                                            src={i.image}
                                            alt={i.name}
                                            className='w-16 h-20 object-cover bg-gray-50'
                                        />
                                        <div>
                                            <p className="font-light text-sm text-black leading-snug">{i.name}</p>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{i.category}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <p className="text-sm font-light text-gray-600 hidden md:block">
                                        Rs {i.new_price}
                                    </p>

                                    {/* Quantity */}
                                    <p className="text-sm font-light text-black hidden md:block">
                                        {cartItems[i.id]}
                                    </p>

                                    {/* Total */}
                                    <p className="text-sm font-light text-black hidden md:block">
                                        Rs {(i.new_price * cartItems[i.id]).toFixed(2)}
                                    </p>

                                    {/* Remove */}
                                    <div className="flex md:justify-end justify-end col-span-2 md:col-span-1">
                                        <button
                                            onClick={() => removeFromCart(i.id)}
                                            className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors text-xs"
                                            aria-label="Remove item"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Mobile price row */}
                                    <div className="flex md:hidden justify-between col-span-2 text-sm text-gray-500 font-light">
                                        <span>Rs {i.new_price} × {cartItems[i.id]}</span>
                                        <span className="text-black">Rs {(i.new_price * cartItems[i.id]).toFixed(2)}</span>
                                    </div>

                                </div>
                            );
                        }
                        return null;
                    })}

                    {/* Totals + Promo */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">

                        {/* Promo code */}
                        <div className="flex flex-col gap-4 order-2 lg:order-1">
                            <p className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">Promo Code</p>
                            <div className="flex gap-0">
                                <input
                                    type="text"
                                    placeholder='Enter promo code'
                                    className="flex-1 border border-gray-300 border-r-0 px-5 py-3.5 text-xs tracking-wide focus:outline-none focus:border-black transition-colors font-light"
                                />
                                <button className="bg-black text-white px-7 text-xs uppercase tracking-[0.15em] font-medium border border-black hover:bg-white hover:text-black transition-colors duration-300">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Cart totals */}
                        <div className="order-1 lg:order-2 border border-gray-200 p-8">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">Summary</p>
                            <h2 className="font-serif text-2xl font-light text-black mb-6">Order Total</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-light text-gray-500">
                                    <p>Subtotal</p>
                                    <p>Rs {subtotal.toFixed(2)}</p>
                                </div>
                                <div className="border-t border-gray-100" />
                                <div className="flex justify-between text-sm font-light text-gray-500">
                                    <p>Taxation (10%)</p>
                                    <p>Rs {tax.toFixed(2)}</p>
                                </div>
                                <div className="border-t border-gray-100" />
                                <div className="flex justify-between text-base font-light text-black pt-1">
                                    <p>Total</p>
                                    <p>Rs {grandTotal.toFixed(2)}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full mt-8 bg-black text-white h-14 text-xs uppercase tracking-[0.2em] font-medium border border-black hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};