import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { API_URL } from '../../utils/variables';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';


const FlightDetails = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [flight, setFlights] = useState({})

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            try {
                const response = await axios.get(`${API_URL}/flights/${id}`)

                setFlights(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error("There was an error editting the flight!", error);
            }
        })()

    }, [id])

    if (isLoading) {
        return <Loader />
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
        <div className='mx-auto my-0 max-w-5xl'>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div className="mr-4">
                        <h3 className="text-3xl font-bold text-blue-600 mb-2">{detailedName}</h3>
                        <p className="text-lg"><strong>From:</strong> {origin} <span className="text-gray-500">({city})</span></p>
                        <p className="text-lg"><strong>To:</strong> {destination} <span className="text-gray-500">({destinationCity})</span></p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-bold text-blue-600">{currencies} {summary?.totalPrice}</p>
                    <p className="text-sm text-gray-500">Includes taxes & charges</p>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-xl font-semibold mb-2">Flight Details</h4>
                    <p><strong>Flight Dates:</strong> {flightDates}</p>
                    <p><strong>Capacities:</strong> {capacities}</p>
                    <p><strong>SubType:</strong> {subType}</p>
                    <p><strong>Non-Stop:</strong> {nonStop ? 'Yes' : 'No'}</p>
                    <p><strong>One Way:</strong> {oneWay ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-xl font-semibold mb-2">Outbound</h4>
                    <p><strong>Date:</strong> {departureDate}</p>
                    <p><strong>Departure Time:</strong> {time?.depart}</p>
                    <p><strong>Arrival Time:</strong> {time?.arrive}</p>
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Airline:</strong> {flightOffers}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-xl font-semibold mb-2">Return</h4>
                    <p><strong>Date:</strong> {returnDate}</p>
                    <p><strong>Departure Time:</strong> {returnTime?.depart}</p>
                    <p><strong>Arrival Time:</strong> {returnTime?.arrive}</p>
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Airline:</strong> {flightOffers}</p>
                </div>
            </div>
           
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-lg"><strong>Nights:</strong> {summary?.nights}</p>
                    <p className="text-lg"><strong>Price Per Person:</strong> {currencies} {summary?.pricePerPerson}</p>
                </div>
                <Button _id="book" />
            </div>
        </div>
        </div>
    );
}



export default FlightDetails