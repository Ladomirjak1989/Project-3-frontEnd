import React from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import { useSelector } from 'react-redux'
import Loader from "../../components/Loader/Loader"
import { Link } from 'react-router-dom'
// import City from '../../components/Searchbar/City'


const CityPage = () => {

  const isLoading = useSelector(state => state.vacations.loading)
  const user = useSelector(state => state.session.user)
  const cities = useSelector(state => Object.values(state.city.cities))
  if (isLoading) {
    return <Loader />
  }


  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      {/* <City/> */}
      <div className='mx-auto my-0 max-w-5xl'>
        <div className="container mx-auto p-4">
          <div>
            <h2 className="flex justify-center text-4xl italic underline mb-12 mt-5">Top 10 best cities in the world: </h2>
            <ul className='grid grid-cols-3 gap-10 w-full mx-auto'>
              {cities.map((city) => (
                <li key={city.id} className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-5 rounded-md">
                  <img src={city.imgUrl} alt={city.name} className="max-w-[350px] max-h-[300px] w-full h-4/5 pt-2" />
                  <h4 className="text-xl">{city.name}</h4>
                  <p>{city.country}</p>
                  <div>
                    <Link className='px-3 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-700 inline-block' to={`/city-details${city.id}`}>
                      Show more...
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )

}

export default CityPage