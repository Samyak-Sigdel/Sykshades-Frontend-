import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2, ArrowRight, RotateCcw } from 'lucide-react'

export const PaymentSuccess = () => {
    const [status, setStatus] = useState('verifying') // verifying | success | failed
    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const booking_id = localStorage.getItem('esewa_booking_id')
            const correlation_id = localStorage.getItem('esewa_correlation_id')

            if (!booking_id || !correlation_id) {
                setStatus('failed')
                return
            }

            try {
                const res = await fetch('https://sykshades-backend.onrender.com/esewa/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ booking_id, correlation_id }),
                })

                const data = await res.json()

                if (data?.data?.status === 'SUCCESS') {
                    setStatus('success')
                    localStorage.removeItem('esewa_booking_id')
                    localStorage.removeItem('esewa_correlation_id')
                } else {
                    setStatus('failed')
                }
            } catch {
                setStatus('failed')
            }
        }

        verify()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200/70 shadow-xl shadow-gray-200/50 rounded-2xl p-10 max-w-md w-full text-center">

                {status === 'verifying' && (
                    <>
                        <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-5">
                            <Loader2 size={28} className="text-gray-400 animate-spin" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Verifying payment</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Please wait while we confirm your payment with eSewa…
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]" />
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment successful</h1>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Your order has been placed successfully. Thank you for shopping with Sykshades.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-950 hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Continue shopping
                            <ArrowRight size={16} />
                        </button>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
                            <XCircle size={32} className="text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment failed</h1>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Something went wrong or the payment was cancelled. Please try again.
                        </p>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-gray-950 hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={16} />
                            Try again
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}