import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContactBanner from '../../components/ContactBanner/ContactBanner';
import Button from '../../components/Button/Button';
import {API_URL} from '../../utils/variables'

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/email/contact-us`, {
                email, message, name
            });
            setSubmittedMessage(true);
            setName('');
            setEmail('');
            setMessage('');
            setErrorMessage("");
        } catch (error) {
            console.error("Error submitting email:", error);
            if (error.response && error.response.status === 409) {
                // Якщо сервер повертає 409 Conflict
                setErrorMessage("⚠️ This email is already subscribed.");
            } else {
                setErrorMessage("❌ Failed to submit your message. Please try again.");
            }
            setSubmittedMessage(false);

        }
    };

    useEffect(() => {
        if (submittedMessage) {
            const timer = setTimeout(() => {
                setSubmittedMessage(false);
                setName(''); // Clear name field
                setEmail(''); // Clear email field
                setMessage(''); // Clear message field
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submittedMessage]);

    // Add effect for clearing errorMessage
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
                setName(''); // Clear name field
                setEmail(''); // Clear email field
                setMessage(''); // Clear message field
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div>
            <ContactBanner />
            <div className="bg-white mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-400">
                    <h3 className="text-xl font-bold mb-4">HOLIDAYS AND FLIGHTS</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Holidays and Flights: <span className="font-bold">+(31) 618234567</span>
                    </p>
                    <h4 className="text-lg font-semibold mb-2">Opening times:</h4>
                    <table className="w-full text-left text-gray-700">
                        <tbody className="border-t border-gray-400">
                            <tr>
                                <td className="py-1">Monday to Friday</td>
                                <td className="py-1 text-right">9am to 6pm</td>
                            </tr>
                            <tr>
                                <td className="py-1">Saturday</td>
                                <td className="py-1 text-right">9am to 3pm</td>
                            </tr>
                            <tr>
                                <td className="py-1">Sunday</td>
                                <td className="py-1 text-right text-red-600">Close</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-lg  border border-gray-400">
                    <h3 className="text-xl font-bold mb-4">OUR CONTACTS</h3>
                    <p className="text-gray-700 mb-2">
                        <strong>Address:</strong> 1234 BL, 18 Vlinder Street, Amsterdam
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Phone:</strong> +(31) 618234567
                    </p>
                    <p className="text-gray-700">
                        <strong>Email:</strong> dreamvoyaged@gmail.com
                    </p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-400">
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
                        <Button id="sendMessage" />
                    </form>
                    {submittedMessage && <p className="text-green-600 mt-2">✅ Thank you! Your message has been submitted.</p>}
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
