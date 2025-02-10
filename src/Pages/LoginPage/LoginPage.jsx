import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { MdEmail } from 'react-icons/md';
import { setCartHotelWithUser } from '../../Store/Slices/hotelSliceReducer';
import { setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from '../../Store/Slices/vacationSliceReducer';
import { setCartCruiseWithUser } from '../../Store/Slices/cruiseSliceReducer';
import googleIcon from '../../assets/flags/search.png';
import facebookIcon from '../../assets/flags/icons8-facebook-50.png';
import welkomImg from '../../assets/flags/welkom.jpg'
import { IoPersonCircle } from "react-icons/io5";
import welkomImage from '../../assets/flags/welkom2.avif'
import CryptoJS from "crypto-js";


const SECRET_KEY = import.meta.env.VITE_LOGIN_SECRET_KEY;


const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector(state => state.session.error)
    const user = useSelector(state => state.session.user)
    const currentLang = useSelector(state => state.language.language)

    const [isPasswordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const encryptedPassword = localStorage.getItem("rememberedPassword");
        if (!SECRET_KEY) {
            console.error("❌ SECRET_KEY is undefined! Please check your .env or import.");
            return;
        }

        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        if (encryptedPassword) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
                const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

                if (decryptedPassword) {
                    setPassword(decryptedPassword);
                } else {
                    console.error("❌ Decryption failed! Possibly incorrect SECRET_KEY or corrupted data.");
                }
            } catch (error) {
                console.error("❌ Decryption error:", error);
            }
        }
    }, []);





    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
        if (!e.target.checked) {
            localStorage.removeItem('rememberedEmail');
        }
    };

    const handleDemoUser = () => {
        setEmail("demouser@gmail.com")
        setPassword("Demouser12345")
    }

    const handleDemoAdmin = () => {
        setEmail("demoadmin@dreamvoyage.com")
        setPassword("Demoadmin12345")
    }

    useEffect(() => {
        if (user) {
            navigate(`/${currentLang}/`)
        }

    }, [user, navigate, currentLang])



    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!SECRET_KEY) {
            console.error("❌ SECRET_KEY is undefined! Cannot encrypt password.");
            return;
        }

        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
            localStorage.setItem("rememberedPassword", encryptedPassword);
        } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
        }

        const requestBody = { email, password };
        const { payload } = await dispatch(fetchSessionAsync(requestBody));

        if (payload.authToken) {
            dispatch(setCartHotelWithUser(payload.user.hotels))
            dispatch(setCartFlightWithUser(payload.user.flights))
            dispatch(setCartVacationWithUser(payload.user.vacations))
            dispatch(setCartCruiseWithUser(payload.user.cruises))
            navigate(`/${currentLang}/`);
        }
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
                        className="w-[200px] h-[200px] object-contain" 
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
                            Login
                        </h1>
                    </div>


                    <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                        {/* Email Input */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            />
                            <MdEmail className="absolute right-4 top-1/2 text-gray-800 transform -translate-y-1/2" />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                type={isPasswordShow ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex justify-between items-center text-gray-700">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                Remember me
                            </label>
                            <Link
                                className="text-blue-500 hover:underline"
                                to={`/${currentLang}/forgot-password`}
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            className="w-full py-3 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
                            type="submit"
                        >
                            Login
                        </button>

                        {/* Demo User/Admin Buttons */}
                        <div className="flex flex-col gap-2">
                            <button
                                className="w-full py-2 bg-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-400 transition-transform duration-300 hover:scale-105"
                                onClick={handleDemoUser}
                                type="button"
                            >
                                Login as Demo User
                            </button>
                            <button
                                className="w-full py-2 bg-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-400 transition-transform duration-300 hover:scale-105"
                                onClick={handleDemoAdmin}
                                type="button"
                            >
                                Login as Demo Admin
                            </button>
                        </div>

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
                                href={`${process.env.BACKEND_URL}/auth/google`}
                                className="flex items-center gap-3 w-full py-2 px-4 bg-gray-300 border border-gray-400 text-gray-700 text-center rounded-full font-bold shadow-sm hover:bg-gray-400 transition-transform duration-300 hover:scale-105"
                            >
                                <img src={googleIcon} alt="Gmail Icon" className="h-6 w-6" />
                                Google
                            </a>
                            {/* <button onClick={handleGmail} > </button> */}
                            <a
                                // href="http://localhost:4010/auth/facebook"
                                href={`${process.env.BACKEND_URL}/auth/facebook`}
                                className="flex items-center gap-3 w-full py-2 px-4 bg-red-500 border border-gray-500 text-white text-center rounded-full font-bold shadow-md hover:bg-red-700 transition-transform duration-300 hover:scale-105"
                            >
                                <img src={facebookIcon} alt="Facebook Icon" className="h-6 w-6" />
                                Facebook
                            </a>
                            {/* <button onClick={handleFacebook} > </button> */}
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center text-gray-700 font-medium mt-4">
                            Don't have an account?{" "}
                            <Link
                                className="text-blue-500 hover:underline"
                                to={`/${currentLang}/signup`}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


};

export default LoginPage;