import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartFlightWithUser, setRemoveFlightFromCart } from '../../Store/Slices/flightSliceReducer';
import { fetchRemoveElementFromCartAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import Button from '../Button/Button';
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuPlaneLanding } from "react-icons/lu";



function FlightElCart({ flight }) {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleRemoveFromCart = async () => {
        if (!user) {
            const storage = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedStorage = storage.filter((item) => item.id !== flight.id);
            localStorage.setItem("cart", JSON.stringify(updatedStorage));
            dispatch(setRemoveFlightFromCart(flight.id));
            return;
        }
        try {
            const { payload } = await dispatch(fetchRemoveElementFromCartAsync({
                userId: user._id,
                type: "flight",
                id: flight.id
            }));
            if (payload?.user) {
                const storage = JSON.parse(localStorage.getItem("user")) || {}; // Додаємо перевірку
                const filtered = storage[`${flight.type}s`] ? storage[`${flight.type}s`].filter(item => item.id !== flight.id) : [];
                localStorage.setItem("user", JSON.stringify({ ...storage, [`${flight.type}s`]: filtered }));

                dispatch(setCartFlightWithUser(payload.user.flights || []));
            }
        } catch (error) {
            console.error("Error removing flight from cart:", error);
        }
    };


    return (
        <div className="space-y-8">
            {/* Outbound Flight Card */}
            <li className="mb-6 p-6 sm:p-8 bg-gradient-to-br from-indigo-100 via-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-start">
                    <div className="col-span-full text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 uppercase tracking-wider border-b-4 border-indigo-300 pb-2">
                            Outbound Flight
                        </h3>
                    </div>

                    {/* Виліт */}
                    <div className="col-span-2 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-gray-800 flex justify-center sm:justify-start items-center">
                            <LuPlaneTakeoff className="text-2xl sm:text-3xl text-sky-700 mr-2" />
                            {flight.flyFrom || "N/A"}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold text-indigo-700">Carrier Code:</span> {flight.carrierCode || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-indigo-700">Departure:</span> {flight.departure || "N/A"}
                        </p>
                    </div>

                    {/* Тривалість */}
                    <div className="col-span-2 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-gray-800">Duration</h4>
                        <p className="text-sm text-gray-600 mt-2">{flight.duration || "N/A"}</p>
                        <h4 className="text-lg font-bold text-gray-800 mt-4">Type</h4>
                        <p className="text-sm text-gray-600">{flight.specificType || "N/A"}</p>
                    </div>

                    {/* Приземлення */}
                    <div className="col-span-2 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-gray-800 flex justify-center sm:justify-start items-center">
                            <LuPlaneLanding className="text-2xl sm:text-3xl text-sky-700 mr-2" />
                            {flight.flyTo || "N/A"}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold text-indigo-700">Arrival:</span> {flight.arrival || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Додаткові деталі */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-indigo-700">{flight.price || "N/A"} {flight.currency}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Date</p>
                        <p className="text-lg font-bold text-indigo-700">{flight.date || "N/A"}</p>
                    </div>
                </div>
            </li>

            <hr className="my-4 border-t border-gray-300" />

            {/* Return Flight Card */}
            {flight.returnFlight && (
                <li className="mb-6 p-6 sm:p-8 bg-gradient-to-br from-gray-100 via-white to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-start">
                        <div className="col-span-full text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 uppercase tracking-wider border-b-4 border-indigo-300 pb-2">
                                Return Flight
                            </h3>
                        </div>

                        {/* Виліт */}
                        <div className="col-span-2 text-center sm:text-left">
                            <h4 className="text-lg font-bold text-gray-800 flex justify-center sm:justify-start items-center">
                                <LuPlaneTakeoff className="text-2xl sm:text-3xl text-sky-700 mr-2" />
                                {flight.returnFlight.flyTo || "N/A"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-semibold text-indigo-700">Carrier Code:</span> {flight.returnFlight.carrierCode || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-indigo-700">Departure:</span> {flight.returnFlight.departure || "N/A"}
                            </p>
                        </div>

                        {/* Тривалість */}
                        <div className="col-span-2 text-center sm:text-left">
                            <h4 className="text-lg font-bold text-gray-800">Duration</h4>
                            <p className="text-sm text-gray-600 mt-2">{flight.returnFlight.duration || "N/A"}</p>
                            <h4 className="text-lg font-bold text-gray-800 mt-4">Type</h4>
                            <p className="text-sm text-gray-600">{flight.returnFlight.specificType || "N/A"}</p>
                        </div>

                        {/* Приземлення */}
                        <div className="col-span-2 text-center sm:text-left">
                            <h4 className="text-lg font-bold text-gray-800 flex justify-center sm:justify-start items-center">
                                <LuPlaneLanding className="text-2xl sm:text-3xl text-sky-700 mr-2" />
                                {flight.returnFlight.flyFrom || "N/A"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-semibold text-indigo-700">Arrival:</span> {flight.returnFlight.arrival || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Додаткові деталі */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Price</p>
                            <p className="text-2xl font-bold text-indigo-700">{flight.returnFlight.price || "N/A"} {flight.returnFlight.currency}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Date</p>
                            <p className="text-lg font-bold text-indigo-700">{flight.returnFlight.date || "N/A"}</p>
                        </div>
                    </div>
                </li>
            )}

            {/* Remove Button */}
            <div className="mt-2 flex justify-center sm:justify-end">
                <Button onClick={handleRemoveFromCart} id="remove" className="w-full sm:w-auto" />
            </div>
        </div>
    );

}

export default FlightElCart;


















