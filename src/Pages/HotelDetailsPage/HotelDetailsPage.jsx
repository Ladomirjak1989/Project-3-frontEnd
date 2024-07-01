import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchHotelByIdAsync } from '../../Store/Slices/fetchHotelSliceAsync'
import Loader from '../../components/Loader/Loader'
import RatingStars from '../../components/RatingStars/RatingStars'
import Button from '../../components/Button/Button'
import { setCartHotel } from '../../Store/Slices/hotelSliceReducer';

const HotelDetailsPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.hotels.loading)
    const hotel = useSelector(state => state.hotels.hotel)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchHotelByIdAsync(id))
    }, [dispatch, id])

    if (loading) {
        return <Loader />
    }

    if (!hotel) {
        return <div>No hotel details available.</div>
    }

    const {
        images = [],
        name,
        location = {},
        rating,
        description,
        amenities = [],
        popularFilters = [],
        board,
        cancellationPolicy,
        rooms = [],
        reviews = [],
        contact = {},
    } = hotel

    const bookHotel = ()=>{
        if(!user){
          dispatch(setCartHotel(id))
        }
          }

    return (
        <>
            <div className='mx-auto mt-7 my-0 max-w-5xl'>
                <div className="border border-dashed border-blue-400 p-4 rounded-lg text-center">
                    <p className="text-blue-500 font-bold">
                        USE OUR APP <span className="text-black">DreamVoyage</span> TO SAVE AN EXTRA <span className="text-black">€70</span> ON HOTEL
                    </p>
                </div>

                <h2 className='text-xl font-semibold mb-2 p-3 underline'>Here is your detailed information about your selected hotel! 😃</h2>
                <div className="p-4 bg-gray-100 px-10 items-center rounded-md shadow-md w-full">
                    {images.length > 0 && (
                        <div className="flex space-x-4 mb-4">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-1/3 rounded-lg shadow-md" />
                            ))}
                        </div>
                    )}
                    <div className="mb-4">
                        <p><strong className='italic'>Name:</strong> {name}</p>
                        <p><strong className='italic'>Country:</strong> {location.country}</p>
                        <p><strong className='italic'>City:</strong> {location.city}</p>
                        <p><strong className='italic'>Address:</strong> {location.address}</p>
                        <p><strong className='italic'>Rating:</strong> <RatingStars rating={rating} /></p>
                        <p><strong className='italic'>Description:</strong> {description}</p>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='md:col-span-1 flex flex-col'>
                            {amenities.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-cyan-600">Amenities</h3>
                                    <ul className="list-disc list-inside">
                                        {amenities.map(item => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {popularFilters.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-cyan-600">Popular Filters</h3>
                                    <ul className="list-disc list-inside">
                                        {popularFilters.map((filter, index) => (
                                            <li key={index}>{filter}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='md:col-span-1 flex flex-col '>
                            <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.878277691667!2d20.8640847!3d37.81632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1367465d9b05532b%3A0x385cf70201d5585e!2sAZURE%20RESORT%20%26%20SPA!5e0!3m2!1sru!2snl!4v1719297763890!5m2!1sru!2snl"} width="500" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <p><strong className='italic'>Board:</strong> {board}</p>
                    <p><strong className='italic'>Cancellation Policy:</strong> {cancellationPolicy}</p>

                    {rooms.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-cyan-600">Rooms</h3>
                            {rooms.map((room, index) => (
                                <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                                    <p><strong>{room.type}</strong> - <span className="font-semibold">{room.description}</span></p>
                                    <p>{room.pricePerNight}</p>
                                    <p>{room.availability}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {reviews.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-cyan-600">Reviews</h3>
                            {reviews.map((review, index) => (
                                <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                                    <p><strong>{review.username}</strong> - <span className="font-semibold">{review.rating} stars</span></p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='border-t'>
                        <p><strong className='text-xl font-semibold text-cyan-600'>Contacts:</strong></p>
                        <p><strong className='italic'>Phone:</strong> {contact.phone}</p>
                        <p><strong className='italic'>Email:</strong> {contact.email}</p>
                        <p><strong className='italic'>Website:</strong> {contact.website}</p>
                    </div>
                    <div className='flex justify-end'>
                        <Button onClick={bookHotel} id="book" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelDetailsPage
