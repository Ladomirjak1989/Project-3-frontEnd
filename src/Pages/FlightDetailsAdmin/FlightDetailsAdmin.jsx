import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../../utils/variables';


const FlightDetailsAdmin = () => {
    const { id } = useParams();
    const [flight, setFlights] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            console.error("ID is undefined");
            setIsLoading(false);
            return;
        }

        (async function () {
            try {
                const response = await axios.get(`${API_URL}/flights/${id}`);
                setFlights(response.data);
            } catch (error) {
                console.error("There was an error fetching the flight!", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!flight || Object.keys(flight).length === 0) {
        return <div>No flight details available for this ID.</div>;
    }

    const {

        origin,
        city,
        destination,
        destinationCity,
        departureDate,
        returnDate,
        time,
        returnTime,
        flightDates,
        flightOffers,
        currencies,
        duration,
        detailedName,
        capacities,
        subType,
        nonStop,
        oneWay,
        summary
    } = flight;

    return (
        <>
            <div className='mx-auto mt-5 my-0 max-w-5xl'>
                <h2 className='text-xl font-semibold mb-2 p-3 underline'>Here is your detailed information about your selected flight! 😃</h2>
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <div className="mr-4">
                                <h3 className="text-2xl font-bold text-blue-600 mb-2">{detailedName}</h3>
                                <p className="text-lg"><strong>From:</strong> {origin} <span className="text-gray-500">({city})</span></p>
                                <p className="text-lg"><strong>To:</strong> {destination} <span className="text-gray-500">({destinationCity})</span></p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">{currencies} {summary?.totalPrice}</p>
                            <p className="text-sm text-gray-500">Includes taxes & charges</p>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p><strong className='italic'>Flight Dates:</strong> {flightDates}</p>
                            <p><strong className='italic'>Capacities:</strong> {capacities}</p>
                            <p><strong className='italic'>SubType:</strong> {subType}</p>
                            <p><strong className='italic'>Non-Stop:</strong> {nonStop ? 'Yes' : 'No'}</p>
                            <p><strong className='italic'>One Way:</strong> {oneWay ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-xl font-semibold mb-2 text-cyan-600">Outbound</h4>
                            <p><strong className='italic'>Date:</strong> {departureDate}</p>
                            <p><strong className='italic'>Departure Time:</strong> {time?.depart}</p>
                            <p><strong className='italic'>Arrival Time:</strong> {time?.arrive}</p>
                            <p><strong className='italic'>Duration:</strong> {duration}</p>
                            <p><strong className='italic'>Airline:</strong> {flightOffers}</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-xl font-semibold mb-2 text-cyan-600">Return</h4>
                            <p><strong className='italic'>Date:</strong> {returnDate}</p>
                            <p><strong className='italic'>Departure Time:</strong> {returnTime?.depart}</p>
                            <p><strong className='italic'>Arrival Time:</strong> {returnTime?.arrive}</p>
                            <p><strong className='italic'>Duration:</strong> {duration}</p>
                            <p><strong className='italic'>Airline:</strong> {flightOffers}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t">
                        <div>
                            <p className="text-md text-amber-900"><strong>Nights:</strong> {summary?.nights}</p>
                            <p className="text-md text-amber-900"><strong>Price Per Person:</strong> {currencies} {summary?.pricePerPerson}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default FlightDetailsAdmin;