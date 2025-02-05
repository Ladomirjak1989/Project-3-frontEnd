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
        <div className="container mx-auto my-6 p-4 border rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">YOUR SHORTLIST</h2>
                <div className="flex items-center space-x-2">
                    <FaHeart className="text-yellow-500" />

                </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">SAVE YOUR SHORTLIST</h3>
                    <p>Save your shortlist to your account to view and update it any time, from any device.</p>
                </div>
                <div className="flex space-x-2">

                    <Link className="px-4 py-2 bg-yellow-500 text-white rounded" to={`/${currentLang}/profile`}>
                        GO TO PROFILE
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold"> SHORTLISTED PACKAGE HOLIDAYS</h3>
                <ul>
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

