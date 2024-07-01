import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';




const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    // const [cardholderName, setCardholderName] = useState('');
    // const [cardNumber, setCardNumber] = useState('');
    // const [expiryDate, setExpiryDate] = useState('');
    // const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState(false);
    const [isProcessing, setProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        setProcessing(true)
        console.log(window.location.origin)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`
            }
        });
        console.log(error);
        console.log(error)
        if (error.type === "card_error" || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage("Unexpected error occured")
        }
        setProcessing(false)
        console.log(isProcessing)

        // what am I buying?

        // buy the item

    };
    return (
        <div className='bg-slate-200'>
            <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
                {/* {message ? (
                    <div className="text-center p-7">
                        <h2 className="text-2xl font-bold mb-4">✅ Payment Successful</h2>
                        <p className="text-gray-700">Thank you for your payment. Your transaction has been completed successfully.</p>
                        <div className='pt-8'>
                            <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" to={`/`}>
                                Go Home
                            </Link>
                        </div>
                    </div>

                ) : (
                    <form className='bg-slate-100' onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex mb-4 space-x-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700 font-bold mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    placeholder="MM/YY"
                                    className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 font-bold mb-2">CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
                                    required
                                />
                            </div>
                        </div>

                        <Button id="submitPayment" />
                    </form>
                )} */}
                <form onSubmit={handleSubmit} id='payment-form'>
                    <h2 className='text-center text-xl font-bold mb-4'>Fill Payment Form</h2>
                    <PaymentElement id='payment-element' />
                    <Button id={(isProcessing || !stripe||!elements)?"isProcessing":"submitPayment"} />
                    {message && <div>
                        {message}
                    </div>
                    }
                </form>
            </div>
        </div>
    );

};

export default PaymentForm;


