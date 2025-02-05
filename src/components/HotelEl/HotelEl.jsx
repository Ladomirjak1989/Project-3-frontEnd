import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RatingStars from '../../components/RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';


function HotelEl({ _id, name, images, location, rooms, rating, board, randomReviews, isFavorite, isCart, type }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const currentLang = useSelector(state => state.language.language)



    // return (
    //     <li className='bg-gray-100 p-6 rounded-lg shadow-md mb-6'>
    //         <div className='bg-white p-6 rounded-lg shadow-lg w-full grid grid-cols-1 md:grid-cols-3 gap-4'>

    //             <div className="md:col-span-1">
    //                 <img src={images[0]} alt={name} className="w-full h-48 md:h-full rounded-lg object-cover shadow-md" />
    //             </div>

    //             <div className="md:col-span-2 ">
    //                 <div className="flex justify-between items-center mb-2">
    //                     <h2 className="text-2xl font-bold text-gray-800">{location.country}, {location.city}</h2>
    //                     <button onClick={handleFavorite} className={`${isFavorite ? "bg-red-500" : "bg-red-200"} rounded-full p-2 shadow-md hover:bg-red-300 focus:outline-none`}>
    //                         <svg className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"} `} fill="currentColor" viewBox="0 0 24 24">
    //                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    //                         </svg>
    //                     </button>
    //                 </div>
    //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //                     <div className="md:col-span-2 ">
    //                         <p className="text-sm text-gray-900 mb-2 italic">{name}</p>
    //                         <p className="text-sm text-gray-500 mb-2">{location.address}</p>
    //                         <p className="text-sm text-gray-900 font-bold mb-2">{rooms[0]?.type}</p>
    //                         <p className="text-sm text-gray-900 font-bold mb-2">{board}</p>
    //                         <div className="flex items-center mt-2">
    //                             <RatingStars hotel={_id} rating={rating} />
    //                             <span className="ml-2 text-gray-500">{randomReviews} Reviews</span>
    //                         </div>
    //                         <div className="bg-lime-500 text-white text-center rounded-md p-2 mt-4">
    //                             <p>FREE CANCELLATION IF USING OUR APP</p>
    //                         </div>
    //                         <div className="mt-4 flex items-center">
    //                             <div className="text-xl font-bold">{rooms[0]?.pricePerNight}€</div>
    //                             <div className="text-gray-500 ml-2"> per person</div>
    //                         </div>
    //                         <p className="text-red-600 mt-2">Includes €50pp online discount</p>
    //                         <div className='flex space-x-5 mt-4'>
    //                             <Link className='bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 m-4 rounded' to={`/${currentLang}/hotels/${_id}`}>CONTINUE</Link>
    //                             {user?.role === "admin" && (
    //                                 <>
    //                                     <Link to={`/${currentLang}/vacations/vacation-updated/${_id}`} className="inline-block text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded-lg">EDIT</Link>
    //                                     <button onClick={() => handleDeleteHotel(_id)} className="inline-block text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg">DELETE</button>
    //                                 </>
    //                             )}
    //                              {isCart && <Button onClick={handelRemoveFromCart} id="remove" />}
    //                         </div>
    //                     </div>
    //                     <div className="md:col-span-1 flex flex-col justify-start items-center">
    //                         <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.878277691667!2d20.8640847!3d37.81632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1367465d9b05532b%3A0x385cf70201d5585e!2sAZURE%20RESORT%20%26%20SPA!5e0!3m2!1sru!2snl!4v1719297763890!5m2!1sru!2snl"} width="200" height="150" className="border-0 rounded-lg shadow-md" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    //                         <a href="#" className="text-blue-500 hover:underline block mt-2">View in Map</a>
    //                     </div>
    //                 </div>

    //             </div>
    //         </div>

    //     </li>
    // );
}

export default HotelEl;





