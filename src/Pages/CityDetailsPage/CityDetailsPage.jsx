import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchCityByIdAsync } from '../../Store/Slices/fetchCitySliceReducer'
import Loader from '../../components/Loader/Loader'




const CityDetailsPage = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.city.loading)
  const city = useSelector(state =>state.city.city)

  useEffect(() => {
   
    dispatch(fetchCityByIdAsync(id))
  }, [id])
  if (loading) {
    return <Loader />
  }

  const {
    imgUrl,
    name,
    latitude,
    longitude,
    country,
    population,
    description
  } = city
  

  return (
    <div className="bg-gray-100 min-h-screen pb-12">

      <div className="container mx-auto pt-5">
        <div className="max-w-lg mx-auto flex flex-col items-center bg-gray-200 p-5 rounded-md gap-5">
          <img src={imgUrl} alt={name} className="max-w-full w-full" />
          <p><strong className="italic">Name:</strong> {name}</p>
          <p><strong className="italic">Latitude:</strong> {latitude}</p>
          <p><strong className="italic">Longitude:</strong> {longitude}</p>
          <p><strong className="italic">Country:</strong> {country}</p>
          <p><strong className="italic">Population:</strong> {population}</p>
          <p><strong className="italic">Description:</strong> {description}</p>
          <div className="flex justify-center gap-5 mt-5">
            <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" to={`/cities/${city.name}/flights`}>
              Show flights
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

   

}

export default CityDetailsPage