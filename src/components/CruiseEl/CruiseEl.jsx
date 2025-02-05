import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCruiseAsync } from '../../Store/Slices/fetchCruiseSliceAsync';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';
import { Link } from 'react-router-dom';
import { setCartCruiseWithUser, setFavorite, setRemoveCruiseFromCart } from '../../Store/Slices/cruiseSliceReducer';
import Button from '../Button/Button';
import { fetchRemoveElementFromCartAsync } from '../../Store/Slices/fetchSessionSliceAsync';


function CruiseEl({ _id, images, name, cruiseType, destination, duration, month, visitingCities, pricePerPerson, totalPrice, randomReviews, isFavorite, isCart, type }) {
  
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const currentLang = useSelector(state => state.language.language)

  const handleDeleteCruise = async (id) => {
    try {
      const deleted = await dispatch(deleteCruiseAsync(id)).unwrap();
      if (deleted) {
        dispatch(setPopUp("Cruise successfully deleted"));
      }
    } catch (error) {
      console.error("There was an error deleting the Cruise!", error);
    }
  };

  const handleFavorite = () => {
    let storage = JSON.parse(localStorage.getItem("favorite")) || [];

    const index = storage.findIndex(item => item === _id);

    if (index === -1) {
      storage.push(_id);
    } else {
      storage = storage.filter(item => item !== _id);
    }

    localStorage.setItem("favorite", JSON.stringify(storage));
    dispatch(setFavorite(_id));
  };

  const handleRemoveFromCart = async () => {
    if (!user) {
        const storage = JSON.parse(localStorage.getItem("cart"))
        const newStorage = storage.filter(item => item !== _id)
        localStorage.setItem("cart", JSON.stringify(newStorage))
        dispatch(setRemoveCruiseFromCart(_id))
    }

    const { payload } = await dispatch(fetchRemoveElementFromCartAsync({ userId: user._id, type: type, id:_id }))
        if (payload.user) {
            const storage = JSON.parse(localStorage.getItem("user"));
            const filtered = storage[`${type}s`].filter(item=>item._id!== _id)
            localStorage.setItem("user",  JSON.stringify({...storage, [storage[`${type}s`]]: filtered}))
            dispatch(setCartCruiseWithUser(payload.user.cruises))
        }

}


return (
  <div className="container mx-auto mt-7 max-w-5xl p-4">
    <li className='bg-gray-100 p-4 mb-4'>
      <div className='bg-white p-6 rounded-md shadow-lg w-full hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className='flex flex-col gap-4'>
              <img src={images[0]} alt={destination} className="w-full h-48 rounded-lg shadow-md object-cover" />
              <div className="flex space-x-2 mt-2">
                {images.slice(1).map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index + 1}`} className="w-1/3 h-20 rounded-lg shadow-md object-cover" />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-xl">☾ {duration}</p>
              <a href="#" className="text-blue-500 hover:underline">See other dates & prices</a>
            </div>
            <div className="mt-2">
              <p className="mb-4">
                <span className="font-bold">Available - </span>
                <a href="#" className="text-blue-500 hover:underline">Cruise and Stay options</a>
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <button onClick={handleFavorite} className={`${isFavorite ? "bg-red-500" : "bg-gray-200"} rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none`}>
                <svg className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-900 mb-2">{cruiseType}</p>
            <p className="text-md text-gray-900 font-bold mb-4">📅 {month}</p>

            {visitingCities && visitingCities.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-cyan-600">🛳 Visiting</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {visitingCities.map((visiting, index) => (
                    <li key={index}>{visiting}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end items-start mb-4">
              <div className="text-right">
                <div className="text-xl font-bold">€{pricePerPerson} pp</div>
                <div className="text-xl font-bold italic">Total: €{totalPrice}</div>
                <p className="text-red-600 mt-2">Includes €146 discount</p>
              </div>
            </div>

            <div className="bg-lime-500 text-white text-center rounded-md p-2 mb-4">
              <p>Pay only €250pp deposit today</p>
            </div>
            <div className='flex justify-end space-x-5 mt-4'>
              <Link className='bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 m-4 rounded' to={`/${currentLang}/cruises/${_id}`}>CONTINUE</Link>
              {user?.role === "admin" && (
                <>
                  <Link to={`/${currentLang}/cruises/cruise-updated/${_id}`} className="inline-block text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 ease-in-out">EDIT</Link>
                  <button onClick={() => handleDeleteCruise(_id)} className="inline-block text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300 ease-in-out">DELETE</button>
                </>
              )}
              {isCart && <Button onClick={handleRemoveFromCart} id="remove" />}
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
);
}

export default CruiseEl;











