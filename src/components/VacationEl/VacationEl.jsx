import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVacationAsync } from '../../Store/Slices/fetchVacationSliceAsync';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';
import RatingStars from '../../components/RatingStars/RatingStars';
import { Link } from 'react-router-dom';



function VacationEl({ _id, destination, images, accommodation, duration, price, currency, randomReviews }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDeleteVacation = async (id) => {
        try {
            const deleted = dispatch(deleteVacationAsync(id));
            if (deleted) {
                dispatch(setPopUp("Vacation successfully deleted"));
            }
        } catch (error) {
            console.error("There was an error deleting the Vacation!", error);
        }
    };



    return (
        <li className='bg-gray-100 p-4'>
            <div className='mb-4 bg-white p-6 rounded-lg shadow-lg w-full'>
                <div className="flex justify-between">
                    <div className="w-1/3">
                        <img src={images[0]} alt={destination} className="w-full h-full rounded-lg shadow-md" />
                    </div>
                    <div className="w-2/3 pl-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{destination}</h2>
                            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none">
                                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">{accommodation.address}</p>
                        <p className="text-sm text-gray-900 font-bold">{accommodation.type}</p>
                        <a href="#" className="text-blue-500 hover:underline">View in Map</a>
                        <div className="flex items-center mt-2">

                            <RatingStars vacation={_id} rating={accommodation.rating} />
                            <span className="ml-2 text-gray-500">{randomReviews} Reviews</span>
                        </div>
                        <p className="mt-2">
                            <span className="font-bold">Sat 22 Jun 2024 - {duration}</span> <a href="#" className="text-blue-500 hover:underline">See other dates & prices</a>
                        </p>
                        <p>Twin Room with Balcony or Terrace</p>

                        <div className="bg-lime-500 text-white text-center rounded-md p-2 mt-4">
                            <p>SAVE AN EXTRA £100 ON THIS HOLIDAY USING CODE Q423W4GSC</p>
                        </div>
                        <div className="mt-4 flex items-center">
                            <div className="text-xl font-bold">{price} {currency} (all inclusive)</div>
                            <div className="text-gray-500 ml-2"> per person</div>
                        </div>
                        <p className="text-red-600">Includes £89pp online discount</p>
                        <div className='flex space-x-5 col-span-5'>
                            <Link className='inline-block mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg' to={`/vacations/${_id}`}>Continue</Link>
                             {user?.role === "admin" && (
                                <>
                                    <Link to={`/vacations/vacation-updated/${_id}`} className="inline-block mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg hover:underline">Edit</Link>
                                    <button onClick={() => handleDeleteVacation(_id)} className="inline-block mt-4 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg hover:underline">Delete</button>
                                </>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>
        </li>

    );




}


export default VacationEl;






