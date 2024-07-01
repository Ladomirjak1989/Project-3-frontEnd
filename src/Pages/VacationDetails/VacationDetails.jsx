import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchVacationByIdAsync } from '../../Store/Slices/fetchVacationSliceAsync'
import Loader from '../../components/Loader/Loader'
import RatingStars from '../../components/RatingStars/RatingStars'
import Button from '../../components/Button/Button'
import { setCartVacation } from '../../Store/Slices/vacationSliceReducer';



const VacationDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.vacations.loading)
    const vacation = useSelector(state => state.vacations.vacation)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchVacationByIdAsync(id))
    }, [id])
    if (loading) {
        return <Loader />
    }

    const {
        duration,
        destination,
        price,
        currency,
        description,
        accommodation,
        activities,
        images,
        reviews,

    } = vacation

    const bookVacation = () => {
        if (!user) {
            const storage = JSON.parse(localStorage.getItem("cart"))
            storage.push(id)
            localStorage.setItem("cart", JSON.stringify(storage))
            dispatch(setCartVacation(id))
            return;
        }
    }

    return (
        <>
            <div className='mx-auto mt-7 my-0 max-w-5xl'>

                <div className="border border-dashed border-blue-400 p-4 rounded-lg text-center">
                    <p className="text-blue-500 font-bold">
                        USE CODE <span className="text-black">Q423W4GSC</span> TO SAVE AN EXTRA <span className="text-black">€100</span> ON THIS HOLIDAY.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        APPLICABLE ON SELECTED PACKAGES & MIN SPEND <span className="font-bold">€200</span>.
                    </p>
                </div>

                <h2 className='text-xl font-semibold mb-2 p-3 underline'>Here is your detailed information about your selected holiday! 😃</h2>
                <div className="p-4 bg-gray-100 px-10 items-center rounded-md shadow-md w-full">
                    {images && images.length > 0 && (
                        <div className="flex space-x-4 mb-4">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-1/3 rounded-lg shadow-md" />
                            ))}
                        </div>
                    )}
                    <div className="mb-4">
                        <p><strong className='italic'>Destination:</strong> {destination}</p>
                        <p><strong className='italic'>Duration:</strong> {duration}</p>
                        <p><strong className='italic'>Price:</strong> {price} {currency}</p>
                        <p><strong className='italic'>Description:</strong> {description}</p>
                    </div>

                    {accommodation && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-cyan-600">Accommodation</h3>
                            <p><strong className='italic'>Name:</strong> {accommodation.name}</p>
                            <p><strong className='italic'>Type:</strong> {accommodation.type}</p>
                            <p><strong className='italic'>Rating:</strong><RatingStars rating={accommodation.rating} /></p>
                            <p><strong className='italic'>Address:</strong> {accommodation.address}</p>
                            <p><strong className='italic text-fuchsia-700'>Amenities:</strong></p>
                            <ul className="list-disc list-inside">
                                {accommodation.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activities && activities.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-cyan-600">Activities</h3>
                            <ul className="list-disc list-inside">
                                {activities.map((activity, index) => (
                                    <li key={index}>{activity}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {reviews && reviews.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-cyan-600">Reviews</h3>
                            {reviews.map((review, index) => (
                                <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                                    <p><strong>{review.user}</strong> - <span className="font-semibold">{review.rating} stars</span></p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                            <div className='flex justify-end'>
                                <Button onClick={bookVacation} id="book" />
                            </div>
                        </div>


                    )}
                </div>



                <div className="bg-gray-200 p-4 mt-4 rounded-lg text-center ">
                    <span className="text-sm text-gray-700">
                        <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold underline">
                            TRAVEL AWARE
                        </a> -
                        <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold underline">
                            STAYING SAFE AND HEALTHY ABROAD
                        </a>
                        (<a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                            foreign travel advice
                        </a>)
                        <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m-7-7l9 9M5 12l-1 2m0 0l-1 2m2-2h11m4 0h1m0 0v7m-1 0h-7m0 0v-7m7 7l-9 9" />
                            </svg>
                        </a>
                    </span>
                </div>

            </div>
        </>

    )

}

export default VacationDetails