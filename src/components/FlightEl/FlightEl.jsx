import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFlightAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';


function FlightEl({ flight }) {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch()

    const handleDeleteFlight = async (id) => {
        try {
            const deleted = dispatch(deleteFlightAsync(id))
            if(deleted){
                dispatch(setPopUp("Flight succesfully deleted"))
            }
           
        } catch (error) {
            console.error("There was an error deleting the flight!", error);
        }
    };

    return (
        <div>
            
            <li className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p>
                        <span className="block text-gray-800 font-semibold"> Departure City:</span> {flight.city}
                    </p>
                    <p>
                        <span className="block text-gray-800 font-semibold"> Destination City:</span>{flight.destinationCity}
                    </p>
                    <p>
                        <span className="block text-gray-800 font-semibold"> Flight Dates:</span>{flight.flightDates}
                    </p>
                    <p>
                        <span className="block text-gray-800 font-semibold">Price:</span> ${flight.price}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Link to={`/flights/${flight._id}`} className="text-blue-500 hover:underline">Show more...</Link>
                    {user?.role === "admin" && (
                        <>
                            <Link to={`/flights/flight-updated/${flight._id}`} className="text-blue-500 hover:underline">Edit</Link>
                            <button onClick={() => handleDeleteFlight(flight._id)} className="text-red-500 hover:underline">Delete</button>
                        </>
                    )}
                </div>
            </li>
        </div>
    );
}

export default FlightEl;





