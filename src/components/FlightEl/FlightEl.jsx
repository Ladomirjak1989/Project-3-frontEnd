import React, { useState, } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function FlightEl({ flight }) {
    const user = useSelector(state => state.session.user)

    const [editFlight, setEditFlight] = useState(null)
    const [deleteFlight, setDeleteFlight] = useState()


    const handleEditFlight = async (id) => {
        try {
            const response = await axios.put(`/flights/${id}`, editFlight);
            editFlight(flight.map(flight => (flight._id === id ? response.data : flight)));
            setEditFlight(null);
        } catch (error) {
            console.error("There was an error editting the flight!", error);
        }
    };


    const handleDeleteFlight = async (id) => {
        try {
            await axios.delete(`/flights/${id}`, deleteFlight);
            deleteFlight(flight.filter(flight => flight._id !== id));
            setDeleteFlight()
        } catch (error) {
            console.error("There was an error deleting the flight!", error);
        }
    };


    return (
        <li>
           <div>
                    <span>{flight.origin}</span>
                    <span>{flight.destination.toLocaleString()}</span>
                    <span>{flight.departureDate}</span>
                    <span>{flight.returnDate}</span>
                    <span>{flight.price}</span>
                    <span>{flight.flightDates}</span>
                    <span>{flight.flightOffers}</span>
                    <span>{flight.currencies}</span>
                    <span>{flight.duration}</span>
                    <span>{flight.detailedName}</span>
                    <span>{flight.subType}</span>
                    <span>{flight.nonStop}</span>
                    <span>{flight.oneWay}</span>

                    {user?.role === "admin" && (<>
                        <button onClick={() => setEditFlight(flight)}>Edit</button>
                        <button onClick={() => handleDeleteFlight(flight._id)}>Delete</button>
                    </>)}
                    <Link to={`/flights/${flight._id}`}>
                        Show more...
                    </Link>

                </div>
            
        </li>
    )
}

export default FlightEl