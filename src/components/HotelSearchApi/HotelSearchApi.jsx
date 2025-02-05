import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../../components/RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import { setFavoriteHotel } from '../../Store/Slices/hotelSearchSlice';
import { LiaGlobeSolid } from "react-icons/lia";
import { RiHotelFill } from "react-icons/ri";
import { FaCity } from "react-icons/fa";
import { fetchHotelAsyncApi } from '../../Store/Slices/fetchHotelSliceAsync';




function HotelSearchApi({ hotelId, isFavorite, rating, randomImg, randomPrice, randomReviews, name, address, iataCode }) {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(name)}`;


    const handleFavorite = () => {
        let storage = JSON.parse(localStorage.getItem("favoriteHotels")) || [];

        const index = storage.findIndex(item => item === hotelId);

        if (index === -1) {
            storage.push(hotelId);
        } else {
            storage = storage.filter(item => item !== hotelId);
        }

        localStorage.setItem("favoriteHotels", JSON.stringify(storage));
        dispatch(setFavoriteHotel(hotelId));
    };

    useEffect(() => {
        dispatch(fetchHotelAsyncApi());
      }, [dispatch]);

    



    return (
        <li className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hotel Image */}
                <div className="md:col-span-1">
                    <img
                        src={randomImg}
                        className="w-full h-48 md:h-full rounded-lg object-cover shadow-md"
                    />
                </div>

                {/* Hotel Details */}
                <div className="md:col-span-2 flex flex-col justify-between">
                    {/* Hotel Info */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2" >
                                <RiHotelFill className="text-xl text-black" />
                                <p className="text-lg font-semibold italic text-indigo-900">{name}</p>
                            </div>
                            <button
                                onClick={handleFavorite}
                                className={`${isFavorite ? "bg-red-500" : "bg-red-200"
                                    } rounded-full p-2 shadow-md hover:bg-red-300 focus:outline-none transition`}
                            >
                                <svg
                                    className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <LiaGlobeSolid className="text-xl text-black" />
                            <p className="text-sm text-gray-900">{address.countryCode}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCity className="text-xl text-black" />
                            <p className="text-sm text-gray-900">{iataCode}</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <RatingStars hotel={hotelId} rating={rating} />
                            <span className="ml-3 text-sm text-gray-500">{randomReviews} Reviews</span>
                        </div>
                    </div>

                    {/* Price & Offer Info */}
                    <div className="mt-4">
                        <p className="text-xl font-bold text-gray-800">
                            €{randomPrice} <span className="text-sm font-medium text-gray-700">/ night</span>
                        </p>
                        <div className="bg-green-500 text-white text-center rounded-md p-2 mt-2">
                            <p>FREE CANCELLATION IF USING OUR APP</p>
                        </div>
                        <p className="text-red-600 mt-2 text-sm">Includes €50pp online discount</p>
                    </div>
                </div>

                {/* Booking link */}
                <div className="md:col-span-1 flex flex-col items-center gap-4">
                    <Link
                        to={bookingUrl}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-center p-2 rounded transition"
                    >
                        BOOK ON BOOKING.COM
                    </Link>
                </div>
            </div>
        </li>
    );

}

export default HotelSearchApi;




















