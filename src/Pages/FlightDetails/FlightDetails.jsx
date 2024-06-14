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
    return (
        <div>
            <h3>{flight.origin}</h3>
            <p>{flight.destination}</p>
            <p>{flight.destinationCity}</p>
            <p>{flight.departureDate}</p>
            <p>{flight.city}</p>
            <p>{flight.returnDate}</p>
            <p>{flight.price}</p>
            <p>{flight.flightDates}</p>
            <p>{flight.flightOffers}</p>
            <p>{flight.currencies}</p>
            <p>{flight.duration}</p>
            <p>{flight.detailedName}</p>
            <p>{flight.subType}</p>
            <p>{flight.nonStop}</p>
            <p>{flight.oneWay}</p>

            <Button id="book" />
        </div>
    );
}



export default FlightDetails