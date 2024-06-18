import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { API_URL } from '../../utils/variables';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { fetchVacationAsync } from '../../Store/Slices/fetchVacationSliceAsync';


const VacationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [vacations, setVacations] = useState({})
  const dispatch = useDispatch()




  useEffect(() => {


  }, [])

  dispatch(fetchVacationAsync())

  if (isLoading) {
    return <Loader />
  }

  const {
    destination,
    duration,
    price,
    currency,
    description,
    accommodation,
    amenities,
    activities,
    images,
    reviews,
  } = vacations;

  return (

    <div className="container mx-auto p-4">
      <div>
        <h2>Find your best vacation below:</h2>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center">Vacation Package: {destination}</h2>

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

      <Button className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Book</Button>
    </div>
  );

}

export default VacationPage