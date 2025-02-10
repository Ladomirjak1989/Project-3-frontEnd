import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUpAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { getUserSchema } from './signupSchema';
import googleIcon from '../../assets/flags/search.png';
import facebookIcon from '../../assets/flags/icons8-facebook-50.png';
import welkomImg from '../../assets/flags/welkom.jpg'
import { IoPersonCircle } from "react-icons/io5";
import welkomImage from '../../assets/flags/welkom2.avif'


function Signup() {

    const dispatch = useDispatch()
    const error = useSelector(state => state.session.error)
    const navigate = useNavigate();
    const currentLang = useSelector(state => state.language.language)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordConfirmShow, setPasswordConfirmShow] = useState("");
    const [user, setUser] = useState("");
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [inputError, setInputError] = useState("");
    const [isTermsChecked, setIsTermsChecked] = useState(false); // Track the checkbox state
    const [termsError, setTermsError] = useState(""); // Track terms and conditions error





    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Check if terms and conditions are accepted
        if (!isTermsChecked) {
            setTermsError("You must agree to the Terms and Conditions.");
            return;
        }

        const schema = getUserSchema(currentLang);
        try {
            // Дані для валідації
            const requestBody = { email, password, confirmPassword, name: user };
            const validData = await schema.validate(requestBody, { abortEarly: false });
            console.log('Valid:', validData);
            const token = await dispatch(fetchSignUpAsync(requestBody))

            if (token.payload.authToken) {

                navigate(`/${currentLang}/`);
            }
        } catch (error) {
            console.log('Validation Errors:', error.errors);
            // Перетворюємо масив помилок у об'єкт
            const errorObj = error.inner.reduce((acc, currError) => {
                acc[currError.path] = currError.message; // Додаємо помилку у вигляді ключ-значення
                return acc;
            }, {});
            setInputError(errorObj);
            return;

        }

        useEffect(() => {
            if (user) {
                navigate(`/${currentLang}/`)
            }

        }, [user, navigate, currentLang])


    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden bg-white">

                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-blue-500 text-white w-1/2 p-4 rounded-l-lg shadow-lg">
                    {/* Welcome Image */}
                    <img
                        src={welkomImg}
                        alt="Welcome Img"
                        className="w-[200px] h-[200px] object-contain" // Increased the width and height
                    />

                    {/* Welcome Text */}
                    <p className="text-center text-lg italic leading-relaxed max-w-[400px]">
                        <span className="text-3xl text-yellow-400 font-semibold animate-pulse">
                            DREAM VOYAGE
                        </span>
                        <br />
                        Discover the beauty of the world with our travel agency. Your perfect journey starts here.
                        Join us and embark on your dream journey today.
                        <span className="inline-block text-2xl text-black font-bold ml-2 animate-bounce">
                            →
                        </span>
                    </p>

                    {/* Secondary Image */}
                    <div>
                        <img
                            src={welkomImage}
                            alt="Welkom Image"
                            className="mt-3 w-[350px] h-[350px] object-cover rounded-md" // Increased size and added styling
                        />
                    </div>
                </div>




                {/* Right Side */}
                <div className="w-full lg:w-1/2 p-8">
                    <div className="flex flex-col items-center mb-6">
                        <IoPersonCircle className="text-black text-6xl mb-4 animate-pulse" />
                        <h1 className="text-2xl font-bold text-black mb-2 text-center leading-tight">
                            Sign Up
                        </h1>
                    </div>


                    <form className="flex flex-col gap-4" onSubmit={handleSignupSubmit}>
                        {/* Username Input */}
                        <div className="relative">
                            <input
                                name="name"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                id="name"
                                placeholder="Username"
                                className="w-full border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                            <FaUser className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2" />
                            {inputError.name && <p className="text-red-500 text-sm">{inputError.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                            <MdEmail className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2" />
                            {inputError.email && <p className="text-red-500 text-sm">{inputError.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isPasswordShow ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                            {!isPasswordShow ? (
                                <FaLock
                                    className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordShow(true)}
                                />
                            ) : (
                                <FaLockOpen
                                    className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordShow(false)}
                                />
                            )}
                            {inputError.password && <p className="text-red-500 text-sm">{inputError.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <input
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={isPasswordConfirmShow ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                            {!isPasswordConfirmShow ? (
                                <FaLock
                                    className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordConfirmShow(true)}
                                />
                            ) : (
                                <FaLockOpen
                                    className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordConfirmShow(false)}
                                />
                            )}
                            {inputError.confirmPassword && <p className="text-red-500 text-sm">{inputError.confirmPassword}</p>}
                        </div>


                        {/* Terms & Conditions */}
                        <div className="flex items-center gap-3 text-gray-700 text-sm">
                            <input
                                type="checkbox"
                                className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                                checked={isTermsChecked}
                                onChange={() => {
                                    setIsTermsChecked(!isTermsChecked);
                                    setTermsError(""); // Clear error when checkbox changes
                                }}
                            />
                            <label className="flex items-center">
                                <span className="text-gray-600">I agree to the{" "}</span>
                                <Link
                                    to={`/${currentLang}/terms`}
                                    className="underline text-blue-600 hover:text-blue-800 font-semibold ml-1"
                                >
                                    Terms & Conditions
                                </Link>
                            </label>
                        </div>
                        {termsError && <p className="text-red-500 text-sm">{termsError}</p>}



                        {/* Sign Up Button */}
                        <button
                            className="w-full py-3 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
                            type="submit"
                        >
                            Sign Up
                        </button>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {/* Divider */}
                        <div className="flex items-center justify-center my-4">
                            <div className="flex-grow h-[1px] bg-gray-400"></div>
                            <span className="mx-4 text-gray-700 font-bold">or continue with</span>
                            <div className="flex-grow h-[1px] bg-gray-400"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex flex-row justify-between items-center gap-4">
                            <a
                                // href="http://localhost:4010/auth/google"
                                href={`${import.meta.env.VITE_URL}/auth/google`}
                                className="flex items-center gap-3 w-full py-2 px-4 bg-gray-300 border border-gray-400 text-gray-700 text-center rounded-full font-bold shadow-sm hover:bg-gray-400 transition-transform duration-300 hover:scale-105"
                            >
                                <img src={googleIcon}
                                    alt="Gmail Icon"
                                    className="h-6 w-6"
                                />
                                Google
                            </a>
                            <a
                                // href="http://localhost:4010/auth/facebook"
                                href={`${import.meta.env.VITE_URL}/auth/facebook`}

                                className="flex items-center gap-3 w-full py-2 px-4 bg-red-500 border border-gray-500 text-white text-center rounded-full font-bold shadow-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={facebookIcon}
                                    alt="Facebook Icon"
                                    className="h-6 w-6"
                                />
                                Facebook
                            </a>
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-gray-700 font-medium mt-4">
                            Already have an account?{" "}
                            <Link
                                className="text-blue-500 hover:underline"
                                to={`/${currentLang}/login`}
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default Signup
