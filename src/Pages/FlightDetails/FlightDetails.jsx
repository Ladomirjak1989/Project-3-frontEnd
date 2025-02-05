import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { setCartFlight, setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { fetchUpdateAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import translateChatGPT from '../../utils/helpers';

const config = { date: "Date", depTime: "Departure Time", arrivalTime: "Arrival Time", duration: "Duration", airline: "Airline" }
const FlightDetails = () => {
    const { id, type, idReturn } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const flight = useSelector(state => state.flights.flightApi[id])
    const flightApiReturn = useSelector(state => state.flights.flightApiReturn[idReturn])
    const [text, setText] = useState(config)
    const currentLang = useSelector(state => state.language.language)
    


    useEffect(() => {

        const init = async () => {
            const translated = await translateChatGPT(JSON.stringify(text), currentLang)

            setText(JSON.parse(translated))
        }

        if (currentLang !== "en") {

            init()
        }
        if (currentLang === "en") {
            setText(config)
        }
    }, [currentLang])



    const handleAddToCart = async () => {
        if (!user && user.flights) {
            console.error("User or flights are undefined");
            const storage = JSON.parse(localStorage.getItem("cart")) || [];
            storage.push(flight); // Зберігаємо повний об'єкт рейсу
            localStorage.setItem("cart", JSON.stringify(storage));
            dispatch(setCartFlight(flight.id)); // Оновлюємо Redux
            return;
        }
        try {
            const formData = [

                {
                    userId: user._id, // ID користувача
                    id: flight.id, // ID рейсу
                    flyTo: flight.flyTo,
                    flyFrom: flight.flyFrom,
                    count: 1,
                    departure: flight.itineraries[0]?.segments[0]?.departure?.iataCode || "Unknown",
                    arrival: flight.itineraries[0]?.segments.at(-1)?.arrival?.iataCode || "Unknown",
                    price: flight.price?.total || 0,
                    currency: flight.price?.currency || "EUR",
                    duration: flight.itineraries[0]?.duration?.slice(2) || "Unknown",
                    carrierCode: flight.itineraries[0]?.segments[0]?.carrierCode || "Unknown",
                    date: flight.itineraries[0]?.segments[0]?.departure?.at || "Unknown",
                    type: "flight",
                    specificType: type || "one-way",
                    returnFlight: (type === 'return') ?
                        {
                            userId: user._id,
                            id: flightApiReturn.id,
                            flyTo: flight.flyFrom,
                            flyFrom: flight.flyTo,
                            count: 1,
                            departure: flightApiReturn.itineraries[0]?.segments[0]?.departure?.iataCode || "Unknown",
                            arrival: flightApiReturn.itineraries[0]?.segments.at(-1)?.arrival?.iataCode || "Unknown",
                            price: flightApiReturn.price?.total || 0,
                            currency: flightApiReturn.price?.currency || "EUR",
                            duration: flightApiReturn.itineraries[0]?.duration?.slice(2) || "Unknown",
                            carrierCode: flightApiReturn.itineraries[0]?.segments[0]?.carrierCode || "Unknown",
                            date: flightApiReturn.itineraries[0]?.segments[0]?.departure?.at || "Unknown",
                            type: "flight",
                            specificType: type || "one-way",
                            isReturn: true,

                        }
                        : null,
                    isReturn: type === 'return',

                },

            ]
            console.log("Sending FormData:", formData);

            const { payload } = await dispatch(fetchUpdateAsync({ formData, id: flight.id, userId: user._id, type: 'flight' }));
            if (payload && payload.user) {
                dispatch(setCartFlightWithUser(payload.user.flights || []));
            } else {
                console.error("Invalid payload:", payload);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };



    if (isLoading) {
        return <Loader />;
    }


    if (!flight) {
        return <Navigate to={`/${currentLang}/flights`} />;
    }


    return (
        <div className="space-y-8 px-4 py-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg">
            
            {/* Ensure flight data exists */}
            {flight && flight.itineraries && flight.itineraries[0]?.segments ? (
                <>
                    {/* Flight Information Section */}
                    <div className="space-y-4 p-4 bg-indigo-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-900">Outbound Flight Details</h2>
                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Blacklisted in EU:{" "}
                                <span className="text-indigo-600">
                                    {flight.itineraries[0].segments[0]?.blacklistedInEU ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                From: {flight.flyFrom}{" "}
                                <span className="italic">{flight.itineraries[0]?.segments[0]?.departure.iataCode}</span>
                            </p>
                            <p className="text-gray-800">Departure Date: {flight.itineraries[0]?.segments[0]?.departure.at}</p>
                            <p className="text-gray-800">Terminal: {flight.itineraries[0]?.segments[0]?.departure.terminal || "N/A"}</p>
                            <p className="text-gray-800">Duration: {flight.itineraries[0]?.duration.slice(2)}</p>
                            <p className="text-lg font-semibold">
                                To: {flight.flyTo}{" "}
                                <span className="italic">{flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.iataCode}</span>
                            </p>
                            <p className="text-gray-800">Arrival Date: {flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
                            <p className="text-gray-800">Carrier Code: {flight.itineraries[0]?.segments[0]?.carrierCode || "N/A"}</p>
                            <p className="text-gray-800">Flight Number: {flight.itineraries[0]?.segments[0]?.number || "N/A"}</p>
                        </div>
                    </div>

                    {/* Price and Service Details Section */}
                    <div className="space-y-4 p-4 bg-yellow-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-yellow-800">Price and Service Details</h3>
                        <div className="space-y-2">
                            <p className="text-gray-800">Base Price: {flight.price?.base || "N/A"}</p>
                            <p className="text-gray-800">Currency: {flight.price?.currency || "N/A"}</p>
                            <p className="text-gray-800">Fee Amount: {flight.price?.fees?.[0]?.amount || "N/A"}</p>
                            <p className="text-gray-800">Service Type: {flight.price?.additionalServices?.[0]?.type || "N/A"}</p>
                            <p className="text-gray-800">Total Price: {flight.price?.total || "N/A"}</p>
                        </div>
                    </div>

                    {/* Traveler Pricing Details Section */}
                    {flight.travelerPricings && flight.travelerPricings.length > 0 && (
                        <div className="space-y-4 p-4 bg-green-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-green-800">Traveler Pricing Details</h3>
                            <div className="space-y-2">
                                <p className="text-gray-800">
                                    Included Checked Bags:{" "}
                                    {flight.travelerPricings[0]?.fareDetailsBySegment?.[0]?.includedCheckedBags?.quantity || "N/A"}
                                </p>
                                <p className="text-gray-800">Segment ID: {flight.travelerPricings[0]?.fareDetailsBySegment?.[0]?.segmentId || "N/A"}</p>
                                <p className="text-gray-800">Base Price: {flight.travelerPricings[0]?.price?.base || "N/A"}</p>
                                <p className="text-gray-800">Currency: {flight.travelerPricings[0]?.price?.currency || "N/A"}</p>
                                <p className="text-gray-800">Total Price: {flight.travelerPricings[0]?.price?.total || "N/A"}</p>
                                <p className="text-gray-800">Fare Option: {flight.travelerPricings[0]?.fareOption || "N/A"}</p>
                                <p className="text-gray-800">Traveler ID: {flight.travelerPricings[0]?.travelerId || "N/A"}</p>
                                <p className="text-gray-800">Traveler Type: {flight.travelerPricings[0]?.travelerType || "N/A"}</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-700">No flight details available.</p>
            )}
            {idReturn && flightApiReturn && flightApiReturn && flightApiReturn.itineraries && flightApiReturn.itineraries[0]?.segments &&
                <>
                    {/* Flight Information Section */}
                    <div className="space-y-4 p-4 bg-indigo-100 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-indigo-900">Return Flight Details</h2>
                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Blacklisted in EU:{" "}
                                <span className="text-indigo-600">
                                    {flightApiReturn.itineraries[0].segments[0]?.blacklistedInEU ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                From: {flight.flyTo}{" "}
                                <span className="italic">{flightApiReturn.itineraries[0]?.segments[0]?.departure.iataCode}</span>
                            </p>
                            <p className="text-gray-800">Departure Date: {flightApiReturn.itineraries[0]?.segments[0]?.departure.at}</p>
                            <p className="text-gray-800">Terminal: {flightApiReturn.itineraries[0]?.segments[0]?.departure.terminal || "N/A"}</p>
                            <p className="text-gray-800">Duration: {flightApiReturn.itineraries[0]?.duration.slice(2)}</p>
                            <p className="text-lg font-semibold">
                                To: {flight.flyFrom}{" "}
                                <span className="italic">{flightApiReturn.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.iataCode}</span>
                            </p>
                            <p className="text-gray-800">Arrival Date: {flightApiReturn.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
                            <p className="text-gray-800">Carrier Code: {flightApiReturn.itineraries[0]?.segments[0]?.carrierCode || "N/A"}</p>
                            <p className="text-gray-800">Flight Number: {flightApiReturn.itineraries[0]?.segments[0]?.number || "N/A"}</p>
                        </div>
                    </div>

                    {/* Price and Service Details Section */}
                    <div className="space-y-4 p-4 bg-yellow-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-yellow-800">Price and Service Details</h3>
                        <div className="space-y-2">
                            <p className="text-gray-800">Base Price: {flightApiReturn.price?.base || "N/A"}</p>
                            <p className="text-gray-800">Currency: {flightApiReturn.price?.currency || "N/A"}</p>
                            <p className="text-gray-800">Fee Amount: {flightApiReturn.price?.fees?.[0]?.amount || "N/A"}</p>
                            <p className="text-gray-800">Service Type: {flightApiReturn.price?.additionalServices?.[0]?.type || "N/A"}</p>
                            <p className="text-gray-800">Total Price: {flightApiReturn.price?.total || "N/A"}</p>
                        </div>
                    </div>

                    {/* Traveler Pricing Details Section */}
                    {flightApiReturn.travelerPricings && flightApiReturn.travelerPricings.length > 0 && (
                        <div className="space-y-4 p-4 bg-green-100 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-green-800">Traveler Pricing Details</h3>
                            <div className="space-y-2">
                                <p className="text-gray-800">
                                    Included Checked Bags:{" "}
                                    {flightApiReturn.travelerPricings[0]?.fareDetailsBySegment?.[0]?.includedCheckedBags?.quantity || "N/A"}
                                </p>
                                <p className="text-gray-800">Segment ID: {flightApiReturn.travelerPricings[0]?.fareDetailsBySegment?.[0]?.segmentId || "N/A"}</p>
                                <p className="text-gray-800">Base Price: {flightApiReturn.travelerPricings[0]?.price?.base || "N/A"}</p>
                                <p className="text-gray-800">Currency: {flightApiReturn.travelerPricings[0]?.price?.currency || "N/A"}</p>
                                <p className="text-gray-800">Total Price: {flightApiReturn.travelerPricings[0]?.price?.total || "N/A"}</p>
                                <p className="text-gray-800">Fare Option: {flightApiReturn.travelerPricings[0]?.fareOption || "N/A"}</p>
                                <p className="text-gray-800">Traveler ID: {flightApiReturn.travelerPricings[0]?.travelerId || "N/A"}</p>
                                <p className="text-gray-800">Traveler Type: {flightApiReturn.travelerPricings[0]?.travelerType || "N/A"}</p>
                            </div>
                        </div>
                    )}
                </>

            }
            <div className="flex justify-center mt-8">
                <Button onClick={handleAddToCart} id="book" />
            </div>
        </div>
    );
}

export default FlightDetails;
