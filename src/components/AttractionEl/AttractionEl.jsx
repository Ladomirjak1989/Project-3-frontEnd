import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../../components/RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { setFavoriteAttraction } from '../../Store/Slices/attractionSliceReducer';


const languages = ["En", "Es", "De", "Fr", "It", "Pt", "Uk", "Ja", "Zh", "Ar"];



function getRandomLanguages(num) {
    const shuffled = languages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num).join(", ");
}


function AttractionEl({ id, bookingLink, description, minimumDuration, name, pictures, price, randomReviews, rating, isFavorite, kindOfAttractions }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // Стан для показу повного або скороченого опису
    const [isExpanded, setIsExpanded] = useState(false);
    const [availableLanguages, setAvailableLanguages] = useState("");
   
    useEffect(() => {
        setAvailableLanguages(getRandomLanguages(5));
    }, []);

    const handleFavorite = () => {
        let storage = JSON.parse(localStorage.getItem("favoriteAttractions"));

        const index = storage.findIndex(item => item === id);

        if (index === -1) {
            storage.push(id);
            
        } else {
            storage = storage.filter(item => item !== id);
        }

        localStorage.setItem("favoriteAttractions", JSON.stringify(storage));
        dispatch(setFavoriteAttraction(id));
    };

    const truncateDescription = (text) => {
        // Check if text is defined and call .replace() only if it is not undefined or null
        const firstSentence = text ? text.split('.')[0] : "";
        return isExpanded ? text : `${firstSentence}.`;
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <li className=' bg-gray-100 rounded-lg shadow-lg overflow-hidden p-2 '>

            {/* Swiper для зображень */}
            <div className='flex justify-between flex-col h-[100%]'>
                <div>
                    <Swiper
                        spaceBetween={10}
                        navigation
                        pagination={{ clickable: true }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {pictures.map((picture) => (
                            <SwiperSlide key={picture}>
                                <img src={picture} alt={name} className="w-full h-64 object-cover rounded-lg" />
                                <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-lg shadow-md">
                                   {kindOfAttractions}

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Інформація про екскурсію */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-md font-bold text-gray-800">{name}</h2>

                        <button
                            onClick={handleFavorite}
                            className={`${isFavorite ? "bg-red-500" : "bg-red-200"} rounded-full p-2 shadow-md hover:bg-red-300 focus:outline-none`}
                        >
                            <svg className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"} `} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-gray-700 mb-4">
                        
                        <p className="text-gray-600 mt-2">
                            {/* Check if description exists and is a string before calling replace */}
                            {truncateDescription(description ? description.replace(/<\/?[^>]+(>|$)/g, "") : "")}
                            {!isExpanded && description && description.split('.').length > 1 && (
                                <span onClick={handleToggleExpand} className="text-blue-500 cursor-pointer"> Show more...</span>
                            )}
                            {isExpanded && (
                                <span onClick={handleToggleExpand} className="text-blue-500 cursor-pointer"> Show less</span>
                            )}
                        </p>



                    </div>
                </div>

                
                <div className='flex justify-between flex-col '>
                    <p className="text-sm mt-2 font-bold h-[40px]">Duration of activity: <span className='italic underline'>{minimumDuration}</span></p>
                    <p className="text-sm mt-2 font-bold h-[30px]"> Available in: <span className='italic font-medium' >{availableLanguages}</span> </p>
                    <div className="flex items-center mt-2 ">

                        <RatingStars attraction={id} rating={rating} />
                        <span className="ml-2 text-gray-500">{randomReviews} Reviews</span>
                    </div>


                    <div className="flex items-center justify-between mt-4">
                        <div className="bg-lime-500 text-white text-center rounded-md px-4 py-1 text-sm">
                            FREE CANCELLATION IF USING OUR APP
                        </div>
                    </div>

                    
                    <div className="mt-2 flex items-center justify-between">
                        <div className="text-sm font-bold text-indigo-900">{price?.amount} {price.currencyCode} pp</div>
                    </div>

                   
                    <div className="mt-4 flex items-center">
                        <Link to={bookingLink} className="bg-blue-600 text-white text-center py-2 px-2 rounded-lg shadow-md hover:bg-blue-700">BOOKING LINK</Link>
                    
                        
                    </div>
                </div>
            </div>
        </li>
    );


}

export default AttractionEl;





