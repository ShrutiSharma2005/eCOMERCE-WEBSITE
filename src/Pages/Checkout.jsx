import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import authService from '../services/api';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51QO8K2F4Xg0qR4qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX8qX'); // Replace with your actual publishable key

const CheckoutForm = ({ totalAmount, cartItems }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            try {
                const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', {
                    amount: totalAmount * 100, // Amount in cents
                    currency: 'usd',
                });

                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

                if (confirmError) {
                    setError(confirmError.message);
                    setProcessing(false);
                } else {
                    if (paymentIntent.status === 'succeeded') {
                        // Create Order
                        try {
                            await authService.createOrder({
                                items: cartItems,
                                amount: totalAmount,
                                address: { // Placeholder address, you should get this from a form
                                    street: "123 Main St",
                                    city: "Anytown",
                                    state: "CA",
                                    zip: "12345",
                                    country: "USA"
                                }
                            });
                            toast.success('Payment Successful!');
                            navigate('/profile'); // Redirect to profile/orders page
                        } catch (orderError) {
                            console.error("Order creation failed:", orderError);
                            toast.error('Order creation failed, but payment succeeded.');
                        }
                    }
                }
            } catch (err) {
                setError(err.message);
                setProcessing(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-center mb-6 text-green-600">
                <ShieldCheck className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Secure Checkout</h2>
            <p className="text-gray-500 text-center mb-8 text-sm">Your payment is encrypted and secure.</p>

            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">${totalAmount}</span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> 256-bit SSL Encrypted
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                <div className="p-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 bg-white">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                        hidePostalCode: true
                    }} />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 mb-4 bg-red-50 p-3 rounded-md text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                {processing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                        <Lock className="w-4 h-4" /> Pay ${totalAmount}
                    </>
                )}
            </button>

            <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale">
                {/* Simple CSS placeholders for card icons if images aren't available */}
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    // Filter cart items that have quantity > 0
    const orderItems = all_product.filter(product => cartItems[product.id] > 0).map(product => ({
        ...product,
        qty: cartItems[product.id],
        product: product.id
    }));

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <Elements stripe={stripePromise}>
                <CheckoutForm totalAmount={totalAmount} cartItems={orderItems} />
            </Elements>
        </div>
    );
};

export default Checkout;
