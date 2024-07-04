import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteFlightAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';
import Button from '../Button/Button';
import { setCartFlightWithUser, setRemoveFlightFromCart } from '../../Store/Slices/flightSliceReducer';
import { fetchRemoveElementFromCartAsync } from '../../Store/Slices/fetchSessionSliceAsync';

function FlightEl({ flight, isCart }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDeleteFlight = async (id) => {
        try {
            const deleted = dispatch(deleteFlightAsync(id));
            if (deleted) {
                dispatch(setPopUp("Flight successfully deleted"));
            }
        } catch (error) {
            console.error("There was an error deleting the flight!", error);
        }
    };

    const handleRemoveFromCart = async () => {
        if (!user) {
            const storage = JSON.parse(localStorage.getItem("cart"));
            const newStorage = storage.filter(item => item !== flight._id);
            localStorage.setItem("cart", JSON.stringify(newStorage));
            dispatch(setRemoveFlightFromCart(flight._id));
            return
        }

        const { payload } = await dispatch(fetchRemoveElementFromCartAsync({ userId: user._id, type: flight.type, id: flight._id }))
        if (payload.user) {
            const storage = JSON.parse(localStorage.getItem("user"));
            const filtered = storage[`${flight.type}s`].filter(item=>item._id!== flight._id)
            localStorage.setItem("user",  JSON.stringify({...storage, [storage[`${flight.type}s`]]: filtered}))
            dispatch(setCartFlightWithUser(payload.user.flights))
        }
        
    };

    return (
        <li className='mb-4 p-6 bg-white rounded-lg shadow-lg w-full'>
            <div className="p-4 bg-gray-100 rounded-md shadow-md w-full">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <div>
                        <p className="text-gray-800 font-semibold">Departure City:</p>
                        <p>{flight.city}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold">Destination City:</p>
                        <p>{flight.destinationCity}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold">Flight Dates:</p>
                        <p>{flight.flightDates}</p>
                    </div>
                    <div>
                        <p className="text-gray-800 font-semibold">Price:</p>
                        <p>€{flight.price}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center">
                    <Link to={`/flights/${flight._id}`} className="text-blue-500 hover:underline">SHOW MORE...</Link>
                    <div className="flex space-x-5 mt-2 md:mt-0">
                        {user?.role === "admin" && (
                            <>
                                <Link to={`/flights/flight-updated/${flight._id}`} className="text-blue-500 hover:underline">EDIT</Link>
                                <button onClick={() => handleDeleteFlight(flight._id)} className="text-red-500 hover:underline">DELETE</button>
                            </>
                        )}
                        {isCart && <Button onClick={handleRemoveFromCart} id="remove" />}
                    </div>
                </div>
            </div>
        </li>
    );
}

export default FlightEl;
