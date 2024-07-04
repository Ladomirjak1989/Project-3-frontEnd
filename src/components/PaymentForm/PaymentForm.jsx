import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setProcessing] = useState(false);
    const totalPrice = useSelector(state => state.session.totalPrice);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Unexpected error occurred");
        }

        setProcessing(false);
    };


    return (
        <div className='bg-slate-200 min-h-screen flex items-center justify-center'>
            <div className="max-w-lg w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} id='payment-form'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-lg md:text-xl font-semibold text-gray-900'>Fill Payment Form</h2>
                        <p className="text-md font-medium text-blue-600">
                            Total: €{totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <PaymentElement id='payment-element' className="mb-4" />

                    <Button id={(isProcessing || !stripe || !elements) ? "isProcessing" : "submitPayment"} />
                    {message && <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {message}
                    </div>}
                </form>
            </div>
        </div>
    );

};

export default PaymentForm;

