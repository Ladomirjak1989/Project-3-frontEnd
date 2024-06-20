import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchVacationByIdAsync } from '../../Store/Slices/fetchVacationSliceAsync'

const VacationDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchVacationByIdAsync(id))
    }, [id])
    return (


        <div className='mx-auto my-0 max-w-5xl'>
            <div className="p-4 bg-gray-100 px-10 items-center rounded-md shadow-md w-full">
                {/* <h2 className="text-3xl font-bold mb-4 text-center">Vacation Package: {destination}</h2> */}

                {images && images.length > 0 && (
                    <div className="flex space-x-4 mb-4">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} className="w-1/3 rounded-lg shadow-md" />
                        ))}
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Details</h3>
                    <p><strong>Duration:</strong> {duration}</p>
                    <p><strong>Price:</strong> {price} {currency}</p>
                    <p><strong>Description:</strong> {description}</p>
                </div>

                {accommodation && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Accommodation</h3>
                        <p><strong>Name:</strong> {accommodation.name}</p>
                        <p><strong>Type:</strong> {accommodation.type}</p>
                        <p><strong>Rating:</strong> {accommodation.rating}</p>
                        <p><strong>Address:</strong> {accommodation.address}</p>
                        <p><strong>Amenities:</strong></p>
                        <ul className="list-disc list-inside">
                            {accommodation.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {activities && activities.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Activities</h3>
                        <ul className="list-disc list-inside">
                            {activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {reviews && reviews.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Reviews</h3>
                        {reviews.map((review, index) => (
                            <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                                <p><strong>{review.user}</strong> - <span className="font-semibold">{review.rating} stars</span></p>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default VacationDetails