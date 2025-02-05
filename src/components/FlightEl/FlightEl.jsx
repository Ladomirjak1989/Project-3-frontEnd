import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartFlightWithUser, setRemoveFlightFromCart } from '../../Store/Slices/flightSliceReducer';
import { fetchRemoveElementFromCartAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import Button from '../Button/Button';
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuPlaneLanding } from "react-icons/lu";


function FlightEl({ flight, isCart, flightApiReturn }) {


    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const currentLang = useSelector(state => state.language.language);

    
    const flightSearch = useSelector((state) => state.flightSearch);
    const [isStopShown, setStopShown] = useState(false);

    const handleRemoveFromCart = async () => {
        if (!user) {
            const storage = JSON.parse(localStorage.getItem("cart"));
            const newStorage = storage.filter(item => item !== flight._id);
            localStorage.setItem("cart", JSON.stringify(newStorage));
            dispatch(setRemoveFlightFromCart(flight._id));
            return;
        }

        const { payload } = await dispatch(fetchRemoveElementFromCartAsync({ userId: user._id, type: flight.type, id: flight._id }));
        if (payload.user) {
            const storage = JSON.parse(localStorage.getItem("user"));
            const filtered = storage[`${flight.type}s`].filter(item => item._id !== flight._id);
            localStorage.setItem("user", JSON.stringify({ ...storage, [`${flight.type}s`]: filtered }));
            dispatch(setCartFlightWithUser(payload?.user?.flights));
        }
    };

    const toggleHandleStop = () => {
        setStopShown(prev => !prev);
    }


    return (
        <div className="space-y-6">
            {/* Use tripType from flightSearch to determine the trip type */}
            <li className="mb-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* OUTBOUND SECTION */}
                        <div className="col-span-full">
                            <h3 className="text-lg font-semibold text-indigo-800">OUTBOUND</h3>
                        </div>
                        <div className='font-semibold'>
                            <p className="text-sm text-gray-900">
                                Aircraft | {flight.itineraries?.[0]?.segments?.[0]?.aircraft?.code || "Not Available"}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-md font-semibold text-indigo-800"><LuPlaneTakeoff className="text-3xl text-sky-700 mr-2" />{flight.flyFrom}</p>
                            <p className="text-black">
                                <span className="font-semibold italic text-gray-900">
                                    Airport Code:
                                </span>
                                <span className="text-indigo-900 font-semibold">
                                    {flight.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || "N/A"}
                                </span>
                            </p>
                            <p className="text-gray-800 font-semibold">{flight.itineraries?.[0]?.segments?.[0]?.departure?.at}</p>
                            <p className="text-gray-900"><span className='font-semibold italic'>Terminal:</span> {flight.itineraries?.[0].segments?.[0]?.departure?.terminal}</p>
                        </div>

                        <div className="space-y-4">
                            <p onClick={() => toggleHandleStop(flight.id)} className="text-blue-600 font-semibold cursor-pointer hover:text-blue-800 underline decoration-dotted">
                                Stops: {flight.itineraries?.[0]?.segments.length - 1}
                                <span className="text-blue-600 underline decoration-dotted italic">{isStopShown ? ' (Show Less)' : ' (Show More)'}</span>
                            </p>
                            <p className='text-black'>{flight.itineraries?.[0]?.duration.slice(2)}</p>
                            {isStopShown && (
                                <ul className="mt-4 space-y-2 bg-blue-50 rounded-sm shadow-sm w-[230px]">
                                    {flight.itineraries[0]?.segments.map((stops, index) => (
                                        <li key={index}>
                                            <div className="flex flex-col items-start space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="w-2.5 h-2.5 bg-indigo-900 rounded-full"></span>
                                                    <p>
                                                        <span className='text-black'>{stops.departure.at}</span> <span className="text-indigo-900 underline italic font-semibold"> {stops.departure.iataCode}</span>
                                                    </p>
                                                </div>
                                                <p className="text-gray-900 font-semibold ml-4 before-icon relative">
                                                    <span className="text-blue-600">🕒</span> {stops.duration.slice(2)}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <span className="w-2.5 h-2.5 bg-indigo-900 rounded-full"></span>
                                                    <p>
                                                        <span className='text-black'>{stops.arrival.at}</span> <span className="text-indigo-900 underline italic font-semibold"> {stops.arrival.iataCode}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <div className="bg-slate-200 p-2 rounded-lg flex items-center space-x-3">
                                        <p className="text-xl text-black">
                                            <MdAirlineSeatReclineNormal />
                                        </p>
                                        <span className="text-sm font-medium text-gray-800">
                                            {flight.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "Not Available"}
                                        </span>
                                    </div>
                                </ul>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-semibold text-indigo-800"><LuPlaneLanding className="text-3xl text-sky-700 mr-2" />{flight.flyTo}</p>
                            <p className="text-black">
                                <span className="font-semibold italic text-gray-900">Airport Code:</span> <span className="text-indigo-900 font-semibold"> {flight.itineraries?.[0]?.segments?.[flight.itineraries[0]?.segments.length - 1]?.arrival?.iataCode}</span>
                            </p>
                            <p className="text-gray-800 font-semibold">{flight.itineraries?.[0]?.segments?.[flight.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
                            <p className="text-gray-900"> <span className='font-semibold italic'>Terminal:</span> {flight.itineraries?.[0]?.segments?.[flight.itineraries[0]?.segments.length - 1]?.arrival.terminal}</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-700 font-semibold italic">Price: <span className="text-md font-bold text-indigo-900">{flight.price?.total} {flight.price?.currency}</span></p>
                        </div>
                    </div>

                    {flightSearch.tripType === "return" && flightApiReturn && (
                        <>
                            <hr className="my-4 border-t border-gray-800" />

                            {/* RETURN SECTION */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="col-span-full">
                                    <h3 className="text-lg font-semibold text-indigo-800">RETURN</h3>
                                </div>
                                <div className='font-semibold'>
                                    <p className="text-sm text-gray-900">
                                        Aircraft | {flightApiReturn.itineraries?.[0]?.segments?.[0]?.aircraft?.code || "Not Available"}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-md font-semibold text-indigo-800"><LuPlaneTakeoff className="text-3xl text-sky-700 mr-2" />{flight.flyTo}</p>
                                    <p className="text-black">
                                        <span className="font-semibold italic text-gray-900">
                                            Airport Code:
                                        </span>
                                        <span className="text-indigo-900 font-semibold">
                                            {flightApiReturn.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || "N/A"}
                                        </span>
                                    </p>
                                    <p className="text-gray-800 font-semibold">{flightApiReturn.itineraries?.[0]?.segments?.[0]?.departure?.at}</p>
                                    <p className="text-gray-900"><span className='font-semibold italic'>Terminal:</span> {flightApiReturn.itineraries?.[0].segments?.[0]?.departure?.terminal}</p>
                                </div>

                                <div className="space-y-4">
                                    <p onClick={() => toggleHandleStop(flightApiReturn.id)} className="text-blue-600 font-semibold cursor-pointer hover:text-blue-800 underline decoration-dotted">
                                        Stops: {flightApiReturn.itineraries?.[0]?.segments.length - 1}
                                        <span className="text-blue-600 underline decoration-dotted italic">{isStopShown ? ' (Show Less)' : ' (Show More)'}</span>
                                    </p>
                                    <p className='text-black'>{flightApiReturn.itineraries?.[0]?.duration.slice(2)}</p>
                                    {isStopShown && (
                                        <ul className="mt-4 space-y-2 bg-blue-50 rounded-sm shadow-sm w-[230px]">
                                            {flightApiReturn.itineraries[0]?.segments.map((stops, index) => (
                                                <li key={index}>
                                                    <div className="flex flex-col items-start space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="w-2.5 h-2.5 bg-indigo-900 rounded-full"></span>
                                                            <p>
                                                                <span className='text-black'>{stops.departure.at}</span> <span className="text-indigo-900 underline italic font-semibold"> {stops.departure.iataCode}</span>
                                                            </p>
                                                        </div>
                                                        <p className="text-gray-900 font-semibold ml-4 before-icon relative">
                                                            <span className="text-blue-600">🕒</span> {stops.duration.slice(2)}
                                                        </p>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="w-2.5 h-2.5 bg-indigo-900 rounded-full"></span>
                                                            <p>
                                                                <span className='text-black'>{stops.arrival.at}</span> <span className="text-indigo-900 underline italic font-semibold"> {stops.arrival.iataCode}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                            <div className="bg-slate-200 p-2 rounded-lg flex items-center space-x-3">
                                                <p className="text-xl text-black">
                                                    <MdAirlineSeatReclineNormal />
                                                </p>
                                                <span className="text-sm font-medium text-gray-800">
                                                    {flightApiReturn.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || "Not Available"}
                                                </span>
                                            </div>
                                        </ul>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-semibold text-indigo-800"><LuPlaneLanding className="text-3xl text-sky-700 mr-2" />{flight.flyFrom}</p>
                                    <p className="text-black">
                                        <span className="font-semibold italic text-gray-900">Airport Code:</span> <span className="text-indigo-900 font-semibold"> {flightApiReturn.itineraries?.[0]?.segments?.[flightApiReturn.itineraries[0]?.segments.length - 1]?.arrival?.iataCode}</span>
                                    </p>
                                    <p className="text-gray-800 font-semibold">{flightApiReturn.itineraries?.[0]?.segments?.[flightApiReturn.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
                                    <p className="text-gray-900"> <span className='font-semibold italic'>Terminal:</span> {flightApiReturn.itineraries?.[0]?.segments?.[flightApiReturn.itineraries[0]?.segments.length - 1]?.arrival.terminal}</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-700 font-semibold italic">Price: <span className="text-md font-bold text-indigo-900">{flightApiReturn.price?.total} {flightApiReturn.price?.currency}</span></p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Flight Action Links */}
                    <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center">
                        <Link
                            to={`/${currentLang}/flights/${flightSearch.tripType === "one-way"
                                    ? `one-way/${flight.id || ""}`
                                    : `return/${flight.id || ""}/${flightApiReturn?.id || ""}`
                                }`}
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            SEE DETAILS...
                        </Link>


                        <div className="flex space-x-4 mt-2 md:mt-0">
                            {user?.role === "admin" && (
                                <>

                                </>
                            )}
                            {isCart && <Button onClick={handleRemoveFromCart} id="remove" />}
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );








}

export default FlightEl;















