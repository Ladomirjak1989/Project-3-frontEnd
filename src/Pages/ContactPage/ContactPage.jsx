import React, { useEffect, useState } from 'react';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import Button from '../../components/Button/Button';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your email submission logic here
        setSubmittedMessage(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    useEffect(() => {
        if (submittedMessage) {
            const timer = setTimeout(() => {
                setSubmittedMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submittedMessage]);

    return (
        <div>
            <ContactBanner />
            <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">HOLIDAYS AND FLIGHTS</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Holidays and Flights: <span className="font-bold">+(31) 618234567</span>
                    </p>
                    <h4 className="text-lg font-semibold mb-2">Opening times:</h4>
                    <table className="w-full text-left text-gray-700">
                        <tbody className="border-t">
                            <tr>
                                <td className="py-1">Monday to Friday</td>
                                <td className="py-1 text-right">9am to 7pm</td>
                            </tr>
                            <tr>
                                <td className="py-1">Saturday</td>
                                <td className="py-1 text-right">9am to 5pm</td>
                            </tr>
                            <tr>
                                <td className="py-1">Sunday</td>
                                <td className="py-1 text-right text-red-600">Close</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">OUR CONTACTS</h3>
                    <p className="text-gray-700 mb-2">
                        <strong>Address:</strong> 1234 BL, 18 Vlinder Street, Amsterdam
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Phone:</strong> +(31) 618234567
                    </p>
                    <p className="text-gray-700">
                        <strong>Email:</strong> dreamvoyage@gmail.com
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">ANY QUESTIONS?</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="p-3 border border-gray-300 rounded"
                            required
                        />
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="p-3 border border-gray-300 rounded"
                            required
                        />
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                            className="p-3 border border-gray-300 rounded h-32"
                            required
                        ></textarea>
                        <Button id="sendMessage"/>
                    </form>
                    {submittedMessage && <p className="text-green-600 mt-2">✅ Thank you! Your message has been submitted.</p>}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
