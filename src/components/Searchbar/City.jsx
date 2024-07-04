import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuPlaneTakeoff, LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import { setDeparture, setDestination, setDepartureDate, setDuration, setReturnDate, setGuests, setClearSearch } from "../../Store/Slices/citySearchSlice"
import { fetchSearchCityAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import Button from '../Button/Button';


const City = () => {


  const [city, setCity] = useState([]);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  const citySearch = useSelector((state) => state.citySearch);

  const handelSubmit=(e) =>{
    e.preventDefault()
    dispatch(fetchSearchCityAsync(citySearch))
   
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'departure':
        dispatch(setDeparture(value));
        break;

      case 'destination':
        dispatch(setDestination(value));
        break;

      case 'departureDate':
        dispatch(setDepartureDate(value));
        break;

      case 'returnDate':
        dispatch(setReturnDate(value));
        break;

      case 'duration':
        dispatch(setDuration(value));
        break;

      case 'adults':
      case 'children':
        dispatch(setGuests({ ...citySearch.guests, [name]: value }));
        break;

      default:
        break;
    }

  };

const handleResultClick = (result) => {
    
  };

  const handleClearSearch = () => {
    dispatch(setClearSearch());
  };


  return (
    <>
    
      <form onSubmit={handelSubmit} className="flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col">
          <label className="flex text-indigo-900 gap-2 items-center">
            <LuPlaneTakeoff /> Departure:
          </label>
          <input
            type="text"
            placeholder="choose airports"
            name="departure"
            value={citySearch.departure}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="flex text-indigo-900 gap-2 items-center">
            <LuPlaneLanding /> Destination:
          </label>
          <input
            type="text"
            placeholder="choose airports"
            name="destination"
            value={citySearch.destination}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900">Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={citySearch.departureDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900">Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={citySearch.returnDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900">Duration:</label>
          <select
            name="duration"
            value={citySearch.duration}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Select duration</option>
            <option value="3">3 nights</option>
            <option value="5">5 nights</option>
            <option value="7">7 nights</option>
            <option value="10">10 nights</option>
            <option value="14">14 nights</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="flex text-indigo-900 gap-2 items-center">
            <BsPerson /> Guests:
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="adults"
              value={citySearch.guests.adults}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              name="children"
              value={citySearch.guests.children}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
        <div className="flex space-x-2">
        <Button id="searchButton" />
        <Button onClick={handleClearSearch} id="clear" />
        </div>
      </form>
      {/* Render the result content here */}
      <div>
        {!!result.length && result.map((result) => (
          <div
            onClick={() => handleResultClick(result)}
            key={result.origin}
          >
            {/* Render result content here */}
          </div>
        ))}
      </div>
    </>
  );
};

export default City;
