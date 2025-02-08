import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import VacationEl from '../../components/VacationEl/VacationEl';
import HotelEl from '../../components/HotelEl/HotelEl';
import CruiseEl from "../../components/CruiseEl/CruiseEl"
import HotelSearchApi from '../../components/HotelSearchApi/HotelSearchApi';
import AttractionEl from '../../components/AttractionEl/AttractionEl';



const ShortListPage = () => {

    const favorite = useSelector(state => state.vacations.favoriteVacation)
    const favoriteHotel = useSelector(state => state.hotelSearch.favoriteHotel)
    const favoriteCruise = useSelector(state => state.cruise.favoriteCruise)
    const favoriteAttraction = useSelector(state => state.attraction.favoriteAttraction)
    const currentLang = useSelector(state => state.language.language)


    return (
        <div className="container mx-auto my-6 p-4 border rounded shadow-lg bg-white">
            {/* Заголовок */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">YOUR SHORTLIST</h2>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                    <FaHeart className="text-red-500 text-2xl" />
                </div>
            </div>

            {/* Save Shortlist Section */}
            <div className="p-4 bg-gray-100 rounded-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <div className="mb-3 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-semibold">SAVE YOUR SHORTLIST</h3>
                    <p className="text-sm sm:text-base">Save your shortlist to your account to view and update it any time, from any device.</p>
                </div>
                <div className="w-full sm:w-auto">
                    <Link className="block sm:inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg w-full sm:w-auto text-center"
                        to={`/${currentLang}/profile`}>
                        GO TO PROFILE
                    </Link>
                </div>
            </div>

            {/* Shortlisted Items */}
            <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-center sm:text-left">SHORTLISTED PACKAGE HOLIDAYS</h3>
                <ul className="space-y-4">
                    {favorite.map(item => (
                        <VacationEl key={item._id} {...item} />
                    ))}
                    {favoriteHotel.map(item => (
                        <HotelSearchApi key={item.hotelId} {...item} />
                    ))}
                    {favoriteCruise.map(item => (
                        <CruiseEl key={item._id} {...item} />
                    ))}
                    {favoriteAttraction.map(item => (
                        <AttractionEl key={item.id} {...item} />
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default ShortListPage;

