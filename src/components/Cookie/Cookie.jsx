import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { setCookiePopUp } from '../../Store/Slices/cookieSliceReducer';
import { Link } from 'react-router-dom';

const Cookie = () => {
    const dispatch = useDispatch();
    const currentLang = useSelector((state) => state.language.language);
    const cookiePopUp = useSelector((state) => state.cookie.cookiePopUp);

    const [cookieSettings, setCookieSettings] = useState({
        necessary: true,
        functional: false,
        performance: false,
        advertising: false,
    });

    // Тоглінг для різних типів cookie
    const handleToggle = (key) => {
        setCookieSettings((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const handleRefuseCookie = (e) => {
        e.preventDefault();
        // Зберігаємо згоду в Local Storage
        localStorage.setItem('cookiesAccepted', true);
        // dispatch(resetCookieState(false));
        document.cookie = "cookiesAccepted=true; path=/; max-age=2592000"
        dispatch(setCookiePopUp(false))
    };

    const handleSaveSelectionCookie = (e) => {
        e.preventDefault();
        // Зберігаємо згоду в Local Storage
        localStorage.setItem('cookiesAccepted', true);
        // dispatch(resetCookieState(cookieSettings));
        document.cookie = "cookiesAccepted=true; path=/; max-age=2592000"
        dispatch(setCookiePopUp(false))
    };


    // Функція для збереження згоди на cookie
    const handleAcceptCookie = async (e) => {
        e.preventDefault();
        document.cookie = "cookiesAccepted=true; path=/;  max-age=2592000"; // Зберігаємо згоду на 1 місяц
        dispatch(setCookiePopUp(false))
    }


    // Якщо банер не потрібно показувати, приховуємо компонент
    if (!cookiePopUp) {
        return null;
    }


    // return (
    //     <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] '>
    //         <div className=" max-w-[700px] bg-white p-4 flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ">
    //             <div className="space-y-2">
    //                 <h2 className="text-lg font-semibold">We use cookies</h2>
    //                 <p className="text-sm text-gray-600">
    //                     We use <span className='font-bold'>cookies</span> and other technologies that are necessary for the services and functions of our website.
    //                 </p>
    //                 <p className="text-sm text-gray-600">
    //                     Furthermore, and to the extent that you consent and select <span className='font-bold'>"Accept"</span>, we may place cookies on your device, use other technologies and collect and process personal data [e.g. IP address] about you in order to offer you personalized content on or outside of our website and to carry out measurements and analyses. In this context, a transfer of data to third countries [e.g. the USA] may also be possible, with the knowledge that the level of data protection in Netherlands and the EU may deviate from this and that access by local authorities cannot be excluded.
    //                 </p>
    //                 <p className="text-sm text-gray-600">
    //                     For more information about cookies, please see the <Link className=" text-blue-600 hover:underline" to={`/${currentLang}/cookie`}>Cookies Notice</Link>. If you select <span className='font-bold'>"Refuse"</span> and decline your consent, no individual offer can be made, only the necessary cookies are then active.
    //                 </p>
    //                 <p className="text-sm text-gray-600 font-semibold">
    //                     This site is also protected by <span className='text-blue-600'>Google reCAPTCHA</span>, and the Google <Link className="text-blue-600 hover:underline" to={`/${currentLang}/privacy`}>Privacy Policy</Link> and <Link className="text-blue-600 hover:underline" to={`/${currentLang}/terms`}>Terms and Conditions</Link> apply.
    //                 </p>
    //                 <div className="flex items-center space-x-4">
    //                     <div>
    //                         <label className="flex items-center space-x-2">
    //                             <input type="checkbox" checked={cookieSettings.necessary} readOnly className="form-checkbox" />
    //                             <span>Necessary</span>
    //                         </label>
    //                     </div>
    //                     <div>
    //                         <label className="flex items-center space-x-2">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={cookieSettings.functional}
    //                                 onChange={() => handleToggle('functional')}
    //                                 className="form-checkbox"
    //                             />
    //                             <span>Functional</span>
    //                         </label>
    //                     </div>
    //                     <div>
    //                         <label className="flex items-center space-x-2">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={cookieSettings.performance}
    //                                 onChange={() => handleToggle('performance')}
    //                                 className="form-checkbox"
    //                             />
    //                             <span>Performance</span>
    //                         </label>
    //                     </div>
    //                     <div>
    //                         <label className="flex items-center space-x-2">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={cookieSettings.advertising}
    //                                 onChange={() => handleToggle('advertising')}
    //                                 className="form-checkbox"
    //                             />
    //                             <span>Advertising</span>
    //                         </label>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="space-y-4 md:space-y-0">
    //                 <Button id="accept" onClick={handleAcceptCookie} />
    //                 <Button id="saveSelection" onClick={handleSaveSelectionCookie} />
    //                 <Button id="refuse" onClick={handleRefuseCookie} />

    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] p-4">
            <div className="max-w-[700px] bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 w-full">

                {/* Текстовий блок */}
                <div className="space-y-4 w-full">
                    <h2 className="text-lg font-semibold text-center md:text-left">We use cookies</h2>
                    <p className="text-sm text-gray-600">
                        We use <span className="font-bold">cookies</span> and other technologies that are necessary for the services and functions of our website.
                    </p>
                    <p className="text-sm text-gray-600">
                        Furthermore, and to the extent that you consent and select <span className="font-bold">"Accept"</span>, we may place cookies on your device, use other technologies and collect and process personal data [e.g. IP address] about you to offer you personalized content.
                    </p>
                    <p className="text-sm text-gray-600">
                        For more information, please see the{" "}
                        <Link className="text-blue-600 hover:underline" to={`/${currentLang}/cookie`}>
                            Cookies Notice
                        </Link>. If you select <span className="font-bold">"Refuse"</span>, only necessary cookies will be active.
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                        This site is also protected by <span className="text-blue-600">Google reCAPTCHA</span>, and the{" "}
                        <Link className="text-blue-600 hover:underline" to={`/${currentLang}/privacy`}>
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link className="text-blue-600 hover:underline" to={`/${currentLang}/terms`}>
                            Terms and Conditions
                        </Link>{" "}
                        apply.
                    </p>

                    {/* Налаштування кукі */}
                    <div className="grid grid-cols-2 md:flex md:items-center gap-4 text-sm text-gray-700">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={cookieSettings.necessary} readOnly className="form-checkbox" />
                            <span>Necessary</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={cookieSettings.functional} onChange={() => handleToggle('functional')} className="form-checkbox" />
                            <span>Functional</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={cookieSettings.performance} onChange={() => handleToggle('performance')} className="form-checkbox" />
                            <span>Performance</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={cookieSettings.advertising} onChange={() => handleToggle('advertising')} className="form-checkbox" />
                            <span>Advertising</span>
                        </label>
                    </div>
                </div>

                {/* Блок кнопок */}
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
                    <button onClick={handleAcceptCookie} className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Accept
                    </button>
                    <button onClick={handleSaveSelectionCookie} className="w-full md:w-auto bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                        Save Selection
                    </button>
                    <button onClick={handleRefuseCookie} className="w-full md:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        Refuse
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Cookie;




