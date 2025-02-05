import axios from 'axios';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {API_URL} from '../../utils/variables'
import forgotPasswordImg from '../../assets/flags/forgotPassword.jpg'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const currentLang = useSelector(state => state.language.language)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/email/forgot-password`, {
                email,
            });
            setEmail('');
            setIsEmailSent('');
            setSuccessMessage("Email successfully sent! Check your inbox.");
      
            setTimeout(() => {
                setIsEmailSent(false);
                setSuccessMessage("");
            }, 5000);
      
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "An error occurred while sending the email.");
            } else if (error.request) {
                setErrorMessage("Unable to connect to the server. Please try again later.");
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
            console.error("Error during forgot password request:", error); // Лог для діагностики
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-blue-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full border-8 border-yellow-400">
                <div className="text-blue-900 text-4xl font-bold mb-6 text-center">
                    Dream Voyage
                </div>

                {/* Зображення */}
                <div className="flex justify-center mb-4">
                    <img src={forgotPasswordImg} alt="Forgot Password" className="w-96 h-52 object-cover" />
                </div>

                {/* Повідомлення про успішне надсилання email */}
                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg text-green-800 mb-4 text-center transition-opacity duration-500">
                        {successMessage}
                    </div>
                )}

                {/* Повідомлення про помилку */}
                {errorMessage && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg text-red-800 mb-4 text-center">
                        {errorMessage}
                    </div>
                )}

                {/* Якщо email надіслано */}
                {isEmailSent ? (
                    <div className="border-4 border-yellow-400 p-4 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Forgot your password?
                        </h1>
                        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg mb-6">
                            <p className="text-gray-900 font-medium">
                                We have sent you an email with a personal link. You can use this
                                link to set a new password.
                            </p>
                            <p className="text-gray-700 mt-2">
                                You will receive the email within a few minutes. Or check your
                                spam inbox.
                            </p>
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline mt-2 inline-block font-medium"
                            >
                                Back to login
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Якщо email ще не надіслано
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            Forgot your password?
                        </h1>
                        <p className="text-gray-600 mb-6 text-center">
                            To forget is human. What is your email address? We will send you a
                            link to set a new password within a few minutes.
                        </p>

                        {/* Форма */}
                        <form onSubmit={handleSubmit} className="space-y-4 border-2 border-yellow-400 p-6 rounded-lg shadow-md">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                Send
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 text-center">
                            <Link
                                to={`/${currentLang}/login`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Back to login
                            </Link>
                        </div>

                        {/* Privacy and Cookies */}
                        <div className="mt-6 text-sm text-gray-800 text-center space-x-4">
                            <Link to={`/${currentLang}/privacy`} className="hover:underline">
                                Privacy
                            </Link>
                            <Link to={`/${currentLang}/cookie`} className="hover:underline">
                                Cookies
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
