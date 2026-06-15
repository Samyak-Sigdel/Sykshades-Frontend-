import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

export const Checkout = () => {
    const { getTotalCartAmount, cartItems, all_product } = useContext(ShopContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const totalAmount = getTotalCartAmount()
    const cartProducts = all_product.filter(p => cartItems[p.id] > 0)

    const handleEsewaPayment = async () => {
        setLoading(true)
        setError(null)

        try {
            const orderId = `ORD-${Date.now()}`

            const res = await fetch('http://localhost:4000/esewa/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalAmount,
                    orderId,
                    customerName: 'Customer',
                }),
            })

            const data = await res.json()
            console.log('eSewa response:', data)

            if (data.success && data.deeplink) {
                localStorage.setItem('esewa_booking_id', data.booking_id)
                localStorage.setItem('esewa_correlation_id', data.correlation_id)

                // Navigate to our custom payment form page
                navigate('/esewa-pay', {
                    state: {
                        deeplink: data.deeplink,
                        booking_id: data.booking_id,
                        correlation_id: data.correlation_id,
                        amount: totalAmount,
                    }
                })
            } else {
                setError(data.message || 'Booking failed. Please try again.')
            }
        } catch (err) {
            setError('Could not connect to server. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-24">
            <div className="max-w-2xl mx-auto px-4">

                <h1 className="text-3xl font-bold text-gray-950 tracking-tight mb-8">Checkout</h1>

                {/* Order summary */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                        {cartProducts.map(product => (
                            <div key={product.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 rounded-xl object-cover bg-gray-100"
                                    />
                                    <div>
                                        <p className="text-gray-900 text-sm font-semibold">{product.name}</p>
                                        <p className="text-gray-400 text-xs mt-0.5">Qty: {cartItems[product.id]}</p>
                                    </div>
                                </div>
                                <p className="text-gray-900 text-sm font-bold">
                                    Rs {product.new_price * cartItems[product.id]}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                        <p className="text-gray-500 text-sm font-medium">Total</p>
                        <p className="text-gray-950 text-2xl font-bold">Rs {totalAmount}</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4">
                        <p className="text-red-700 text-sm font-semibold">{error}</p>
                    </div>
                )}

                <button
                    onClick={handleEsewaPayment}
                    disabled={loading || totalAmount === 0}
                    className="w-full bg-[#60BB46] hover:bg-[#4ea336] disabled:bg-gray-300 text-white font-bold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Connecting to eSewa…
                        </>
                    ) : (
                        <>
                            <span className="text-xl font-black">e</span>
                            Pay with eSewa — Rs {totalAmount}
                        </>
                    )}
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">
                    You will be redirected to eSewa to complete your payment securely.
                </p>
            </div>
        </div>
    )
}