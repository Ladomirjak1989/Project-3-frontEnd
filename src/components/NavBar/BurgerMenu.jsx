import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import LanguageChange from '../LanguageChange/LanguageChange';
import { FaTimes } from "react-icons/fa";
import { fetchLogout } from '../../Store/Slices/fetchSessionSliceAsync';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from "../../Store/Slices/sessionSliceReducer";

const BurgerMenu = ({ navBarConfig, currentLang, cartCount, isCartOpen, count, activeLink, t, toggleCart, onClick, token, user, onLogOut }) => {

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-blue-500 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center">
            {/* Закриття меню */}
            <button
                className="absolute top-6 right-6 text-white text-3xl hover:text-yellow-300 transition-all"
                onClick={() => onClick(false)}
            >
                <FaTimes />
            </button>

            {/* Навігаційні посилання */}
            <ul className="flex flex-col gap-6 items-center text-center text-white text-lg sm:text-xl font-semibold">
                {navBarConfig.map(item => (
                    <li
                        key={item.title}
                        className={`transition-all duration-200 ${activeLink === item.link ? "text-yellow-400 underline" : "hover:underline hover:text-yellow-300"
                            }`}
                        onClick={() => {
                            onClick(false);
                            // handleLinkClick(item.link);
                        }}
                    >
                        <Link onClick={() => onClick(false)} to={item.link}>
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Login/Logout Button */}
            <div className="mt-6">
                {token && (
                    <button
                        className="text-gray-900 bg-green-200 hover:bg-green-400 p-3 font-semibold rounded transition-all duration-300 ease-in-out"
                        onClick={() => {
                            onClick(false); // Закриває меню
                            onLogOut();
                        }}
                    >
                        {t("navbar.navLogOut")}
                    </button>
                )
                }
            </div>


            {/* Додаткові функції (Shortlist, Profile, Cart) */}
            <div className="flex flex-col items-center mt-8 space-y-4 w-full max-w-sm">
                {/* Shortlist */}
                <div className="w-full flex items-center justify-center bg-yellow-300 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <Link onClick={() => onClick(false)} to={`/${currentLang}/short-list`} className="flex items-center text-gray-900">
                        <FaHeart className="text-2xl text-red-600" />
                        <span className="ml-2 text-lg">{t("navbar.navShortlist")}({count})</span>
                    </Link>
                </div>

                {/* Profile */}
                {user && token && (
                    <div className="w-full flex items-center justify-center bg-yellow-300 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                        <Link onClick={() => onClick(false)} to={`/${currentLang}/profile`} className="flex items-center text-gray-900">
                            <CgProfile className="text-2xl" />
                            <span className="ml-2 text-lg">{t("navbar.navProfile")}</span>
                        </Link>
                    </div>
                )}

                {/* Cart */}
                <div className="w-full flex items-center justify-center relative bg-yellow-300 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    {/* <Link onClick={(toggleCart) => onClick(false)} to={`/${currentLang}/cart`} className="flex items-center text-gray-900">
                        <div className='bg-yellow-100 p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200'>
                            <FaShoppingCart className="text-2xl" />
                        </div>
                    </Link> */}

                    <Link to={`/${currentLang}/cart`} className="flex items-center text-gray-900" onClick={(e) => {
                        e.preventDefault(); // Запобігаємо навігації, щоб лише відкривався кошик
                        toggleCart();
                    }}>
                        <div className='bg-yellow-100 p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200'>
                            <FaShoppingCart className="text-2xl" />
                        </div>
                    </Link>
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {cartCount}
                        </span>
                    )}
                    {isCartOpen && (
                        <div className="absolute right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-10">
                            {!cartCount && (
                                <p className='font-semibold text-gray-700'><span className='text-2xl'>😔</span>{t('navbar.navCartH')}</p>
                            )}
                            {!!cartCount && (
                                <p className='font-semibold text-gray-700 items-center'>
                                    <span className='text-3xl'>👍</span> {t('navbar.navCartP')} {cartCount} {t('navbar.navCartPP')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* Зміна мови */}
            <div className="mt-6">
                <LanguageChange />
            </div>
        </div>
    );

}

export default BurgerMenu




