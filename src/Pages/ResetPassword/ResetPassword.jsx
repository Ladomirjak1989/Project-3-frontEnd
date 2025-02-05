import axios from 'axios';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from '../../utils/variables';
import { FaLockOpen, FaLock } from "react-icons/fa";
import resetPasswordImg from '../../assets/flags/resetPassword.jpg';
import ReCAPTCHA from "react-google-recaptcha";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordConfirmShow, setPasswordConfirmShow] = useState(false);
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [inputError, setInputError] = useState({});
    const [captchaToken, setCaptchaToken] = useState("");
    const currentLang = useSelector(state => state.language.language);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валідація паролів
        if (newPassword.length < 6) {
            setInputError({ password: "Password must be at least 6 characters long." });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setInputError({ confirmNewPassword: "Passwords do not match." });
            return;
        }

        if (!captchaToken) {
            console.log("reCAPTCHA token is missing:", captchaToken);
            setErrorMessage("Please verify the reCAPTCHA.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/email/reset-password/${token}`, { newPassword, recaptchaToken: captchaToken });
            setNewPassword('');
            setConfirmNewPassword('');
            setInputError({});
            setSuccessMessage("✅ Password successfully reset! Redirecting to login...");

            setTimeout(() => {
                navigate(`/${currentLang}/login`);
            }, 5000);

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "An error occurred while resetting the password.");
            } else if (error.request) {
                setErrorMessage("Unable to connect to the server. Please try again later.");
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
            console.error("Error during password reset:", error);
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
                    <img src={resetPasswordImg} alt="Reset Password" className="w-96 h-52 object-cover" />
                </div>

                {/* Повідомлення про успішне скидання пароля */}
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

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Reset Password
                    </h1>

                    {/* Форма */}
                    <form onSubmit={handleSubmit} className="space-y-4 border-2 border-yellow-400 p-6 rounded-lg shadow-md">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Your password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={isPasswordShow ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {!isPasswordShow ? (
                                <FaLock
                                    className="absolute right-4 top-1/2 text-gray-700 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordShow(true)}
                                />
                            ) : (
                                <FaLockOpen
                                    className="absolute right-4 top-1/2 text-gray-700 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordShow(false)}
                                />
                            )}
                            {inputError.password && <p className="text-red-500 text-sm">{inputError.password}</p>}
                        </div>

                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm your password
                        </label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={isPasswordConfirmShow ? "text" : "password"}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Confirm your new password"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                            {!isPasswordConfirmShow ? (
                                <FaLock
                                    className="absolute right-4 top-1/2 text-gray-700 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordConfirmShow(true)}
                                />
                            ) : (
                                <FaLockOpen
                                    className="absolute right-4 top-1/2 text-gray-700 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordConfirmShow(false)}
                                />
                            )}
                            {inputError.confirmNewPassword && <p className="text-red-500 text-sm">{inputError.confirmNewPassword}</p>}
                        </div>

                        {/* Google reCAPTCHA */}
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={(token) => {
                                    console.log("reCAPTCHA Token:", token);
                                    setCaptchaToken(token);
                                }}
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            Reset Password
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
            </div>
        </div>
    );
}

export default ResetPassword;
