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
            if (deleted) {
                dispatch(setPopUp("Flight succesfully deleted"))
            }

        } catch (error) {
            console.error("There was an error deleting the flight!", error);
        }
    };

    return (
        <li className='mb-4 bg-white p-6 rounded-lg shadow-lg w-full'> 
            <div className="p-4 bg-gray-100 px-10 items-center rounded-md shadow-md w-full">
                <div className='grid grid-cols-7 w-full gap-5'>
                    <div className='col-span-2'>
                        <p className=" text-gray-800 font-semibold">Departure City:</p> <p>{flight.city}</p>
                    </div>
                    <div className='col-span-2'>
                        <p className="block text-gray-800 font-semibold">Destination City:</p> <p>{flight.destinationCity}</p>
                    </div>
                    <div className='col-span-2'>
                        <p className="block text-gray-800 font-semibold">Flight Dates:</p> <p>{flight.flightDates}</p>

                    </div>
                    <div>
                        <p className="block text-gray-800 font-semibold">Price:</p> <p>€{flight.price}</p></div>
                </div>
                <div className="mt-2 flex space-x-5 col-span-5">
                    <Link to={`/flights/${flight._id}`} className="text-blue-500 hover:underline">Show more...</Link>
                    {user?.role === "admin" && (
                        <>
                            <Link to={`/flights/flight-updated/${flight._id}`} className="text-blue-500 hover:underline">Edit</Link>
                            <button onClick={() => handleDeleteFlight(flight._id)} className="text-red-500 hover:underline">Delete</button>
                        </>
                    )}
                </div>

            </div>
        </li>
    );
}

export default FlightEl;





