import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import bgImg from "../../assets/attraction/bg2.jpg"
import bottleImg from "../../assets/attraction/bottle1.jpg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineEuroCircle } from "react-icons/ai";
import { BsAirplane } from "react-icons/bs";
import { LuPalmtree } from "react-icons/lu";
import { BsEnvelopePaper } from "react-icons/bs";
import { API_URL } from '../../utils/variables'


const HolidayOffersPage = () => {

    const currentLang = useSelector(state => state.language.language)

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const month = ["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]


    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        isTermsAgreed: false,
        isGiveawayAgreed: false,
    });

    const clearForm = () => {
        setFormData({
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            isTermsAgreed: false,
            isGiveawayAgreed: false,
        });
    };


    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    // Countdown timer state
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Function to get the last day of the current month at 23:59:59
    const getEndOfMonth = () => {
        const now = new Date();
        // Set target date to the last day of the current month
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        return endOfMonth;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        try {
            const response = await axios.post(`${API_URL}/email/giveaway`, formData);
            setShowSuccessMessage(true);
            setErrorMessage("")

            clearForm()

            // Hide the success message after 5 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response) {
                // Handle errors from the server
                setErrorMessage(error.response.data.message || "An error occurred while submitting your entry. Please try again later.");
            } else {
                // Handle other errors
                setErrorMessage("Network error. Please check your internet connection and try again.");
            };
        }
    };

    // Countdown logic
    useEffect(() => {
        const targetDate = getEndOfMonth();

        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                // Reset countdown when the target date is reached
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Update countdown every second
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="flex flex-col items-center py-10"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between p-4 w-full max-w-6xl mx-auto text-center lg:text-left">
                <h1 className="underline text-2xl sm:text-3xl font-bold text-blue-800"><span className='text-yellow-500 underline'>Dream Voyage</span> Monthly Giveaway</h1>

                <div className="flex flex-col items-center lg:items-end space-y-2 mt-4 lg:mt-0">
                    <div className="flex items-center space-x-2">
                        <FcAlarmClock className="text-blue-900 text-3xl sm:text-4xl" />
                        <span className="text-xs font-semibold text-blue-900">Countdown to draw</span>
                    </div>

                    <div className="flex space-x-2 sm:space-x-4 mt-2">
                        {Object.entries(timeRemaining).map(([unit, value], index) => (
                            <div key={index}
                                className="flex flex-col items-center bg-gray-300 p-2 sm:p-4 rounded-lg shadow-sm">
                                <span className="text-xs font-medium text-gray-500">{unit.toUpperCase()}</span>
                                <span className="text-3xl font-semibold text-blue-800">{value.toString().padStart(2, '0')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-7xl mt-8">
                {/* Left Side: Form Content */}
                <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2">Sign up to our emails</h2>
                    <p className="text-gray-600 mb-6">
                        ...to be in with a chance of winning €500* off your next <span className='text-yellow-600'>Dream Voyage</span> holiday. Plus, you’ll be the first to know about our exclusive offers and holiday information.
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                        *Winners are selected by random drawing on the last day of the month.
                        <p className="text-xs text-gray-500 mb-4">**{month[new Date().getMonth()]}’s draw runs from 1st {month[new Date().getMonth()]} – {new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0).getDate()}st {month[new Date().getMonth()]} {new Date().getFullYear()}.</p>
                    </p>

                    {/* Form Fields */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm">Title</label>
                            <select id="title" name="title" value={formData.title} onChange={handleChange} className="block w-full border-gray-300 rounded-md mt-1">
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                                <option>Dr.</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="firstName" className="text-gray-700 text-sm">First name *</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="text-gray-700 text-sm">Last name *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border-gray-300 rounded-md mt-1" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-700 text-sm">Email *</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-gray-300 rounded-md mt-1" />
                        </div>

                        <p className="text-gray-700 font-semibold mt-4">Using your information</p>
                        <p className="text-xs text-gray-500 mb-4">
                            Your contact details submitted will only be used for the purpose of contacting the monthly draw winner and for the purpose of DV Limited contacting you from time to time by email with holiday offers, competitions, and information about our products and services. But don’t worry we will not be bombarding you and you can opt out at any time via any holiday offer email we send you.
                        </p>
                        <p className='text-xs text-gray-500 mb-4'>Details will be held by DV Limited and used in accordance with our <Link to={`/${currentLang}/terms`} className="text-blue-500 hover:underline"> Terms and Conditions</Link>. </p>

                        <div className="flex items-start mb-2">
                            <input type="checkbox" id="terms" name="isTermsAgreed" checked={formData.isTermsAgreed} onChange={handleChange} className="mt-1" required />
                            <label htmlFor="terms" className="ml-2 text-gray-700 text-sm">
                                I agree to the Terms & Conditions
                            </label>
                        </div>
                        <div className="flex items-start mb-6">
                            <input type="checkbox" id="giveawayTerms" name='isGiveawayAgreed' checked={formData.isGiveawayAgreed} onChange={handleChange} className="mt-1" required />
                            <label htmlFor="giveawayTerms" className="ml-2 text-gray-700 text-sm">
                                I agree to the Monthly Giveaway Terms & Conditions
                            </label>
                        </div>

                        <div className="flex flex-col items-center space-y-4 p-4">
                            <button
                                type="submit"
                                className={`bg-blue-600 text-white font-semibold rounded-3xl px-4 py-2 hover:bg-blue-700 w-full sm:w-auto ${!formData.isTermsAgreed || !formData.isGiveawayAgreed ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={!formData.isTermsAgreed || !formData.isGiveawayAgreed}
                            >
                                Enter giveaway draw
                            </button>
                        </div>
                    </form>

                    {/* Success message */}
                    {showSuccessMessage && (
                        <div className="mt-6 p-4 border-2 border-green-400 rounded-lg bg-white flex items-center">
                            <span className="text-green-500 text-2xl mr-3">✔️</span>
                            <div>
                                <p className="text-blue-900 font-semibold">
                                    You’ve successfully entered the newsletter monthly giveaway
                                </p>
                                <p className="text-gray-500 text-sm">
                                    If you win, we’ll contact you by email.
                                </p>
                            </div>
                        </div>

                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mt-6 p-4 border-2 border-red-400 rounded-lg bg-white flex items-center">
                            <span className="text-red-500 text-2xl mr-3">❌</span>
                            <div>
                                <p className="text-red-700 font-semibold">{errorMessage}</p>
                            </div>
                        </div>
                    )}
                </div>
               
                <div className="flex justify-center">
                    <img
                        src={bottleImg}
                        alt="Beautiful nature destination with people kayaking"
                        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:w-[600px] lg:h-[600px] rounded-2xl shadow-lg"
                    />
                </div>

            </div>


            <div className="flex flex-col items-center py-6">
                {/* Section Container */}
                <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl p-8">
                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
                        Why sign up to the <span className='text-yellow-500'>Dream Voyage</span> Newsletter?
                    </h2>

                    {/* Icon Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        {/* Benefit 1 */}
                        <div className="flex flex-col items-center">
                            <BsAirplane className="text-4xl text-blue-900 mb-4" />
                            <p className="text-gray-700">
                                Be the first to know about our latest deals, hotels, and destinations
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col items-center">
                            <LuPalmtree className="text-4xl text-blue-900 mb-4" />
                            <p className="text-gray-700">
                                Get expert holiday inspiration delivered straight to your inbox
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col items-center">
                            < AiOutlineEuroCircle className="text-4xl text-blue-900 mb-4" />
                            <p className="text-gray-700">
                                Be in with a chance of winning money off your next holiday
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white py-10 px-4 lg:px-20 rounded-lg shadow-md max-w-7xl mx-auto">
                <div className="flex items-center mb-6">
                    {/* Icon and Title */}
                    <BsEnvelopePaper className="text-blue-900 text-2xl mr-2" />
                    <h2 className="text-2xl font-bold text-blue-900">
                        Newsletter Sign up Monthly Draw – Terms and Conditions
                    </h2>
                </div>

                <p className="text-sm text-black font-semibold mb-4">
                    ***Please read these Terms and Conditions carefully. By entering you indicate that you are opting into receiving communications from DV, accepting these terms and conditions, and you agree to be bound by them.
                </p>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Promoter’s Details:</h3>
                    <p className="text-sm text-gray-700">
                        DV is a trading name of DV Limited (the “Promoter”). Registered in Netherlands.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Eligibility:</h3>
                    <p className="text-sm text-gray-700">
                        This competition is open to anyone resident in the world who is eighteen (18) years of age or older. Employees and immediate family (defined as parents, children, siblings, spouse and life partners) of the Promoter or its affiliates, subsidiaries, advertising or promotion agencies are not eligible to enter this competition.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">How to Enter:</h3>
                    <p className="text-sm text-gray-700">
                        Internet access is required to participate. To enter you will need to provide your name, surname, and email address to the Promoter by completing the online form. <span className="font-bold">Only one entry is allowed per person.</span> DV reserves the right in its absolute discretion to exclude blatant attempts to breach the terms of the competition or circumvent the single entry rule.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Use of Data:</h3>
                    <p className="text-sm text-gray-700">
                        All details provided by you will be held by the Promoter and used in accordance with these terms and conditions and the Promoter’s Privacy Notice available at <Link to={`/${currentLang}/terms`} className="text-blue-500 hover:underline"> Terms and Conditions</Link>.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Dates:</h3>
                    <p className="text-sm text-gray-700">
                        The competition commences 1st October and closes 31st October 2024. All entries must be received by 11:59 pm on 31st October 2024.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Prize:</h3>
                    <p className="text-sm text-gray-700">
                        Entries received between 00:00 on 1st October 2024 to 11:59 on 31st October 2024 will be eligible for the prize draw. There will be one winner who will receive a one-time use DV Holiday Discount Code with a value of €500 with a minimum spend of €500.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Selection of Winners:</h3>
                    <p className="text-sm text-gray-700">
                        The winner will be chosen at random from all eligible entries and notified within 28 days after the closing date.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Notification:</h3>
                    <p className="text-sm text-gray-700">
                        The winner will be notified by email within 28 days of the closing date with instructions on how to claim their prize. If a winner cannot be contacted or is unable to accept their prize, the Promoter reserves the right to choose another winner from eligible entries received.
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900">Winner Details:</h3>
                    <p className="text-sm text-gray-700">
                        Details of the winner, name and country of residence, will be obtainable by writing to DV Limited, enclosing a self-addressed envelope.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-blue-900">General:</h3>
                    <p className="text-sm text-gray-700">
                        The Promoter reserves the right to amend the competition in exceptional circumstances. All entrants agree to abide by these terms and conditions and the Promoter reserves the right to exclude entrants for any breach of these terms and conditions.
                    </p>
                </section>
            </div>

        </div>
    );

};

export default HolidayOffersPage;
