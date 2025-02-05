import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuPlaneTakeoff, LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import { setDeparture, setDestination, setDepartureDate, setDuration, setReturnDate, setGuests, setClearSearch } from "../../Store/Slices/citySearchSlice"
import { fetchSearchCityAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import Button from '../Button/Button';


const City = () => {

  const dispatch = useDispatch();
  const citySearch = useSelector((state) => state.citySearch);

  const handelSubmit = (e) => {
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

  const handleClearSearch = () => {
    dispatch(setClearSearch());
  };



  return (
    <div className="p-10 bg-white shadow-lg rounded-lg max-w-full mx-auto">
       <label className="text-2xl font-bold mb-4 block text-center">Find your city</label>
      <form onSubmit={handelSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        {/* Departure */}
        <div className="flex flex-col flex-grow">
          <label className="flex text-indigo-900 gap-2 items-center mb-1 font-semibold">
            <LuPlaneTakeoff /> Departure:
          </label>
          <input
            type="text"
            placeholder="Choose airport"
            name="departure"
            value={citySearch.departure}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col flex-grow">
          <label className="flex text-indigo-900 gap-2 items-center mb-1 font-semibold">
            <LuPlaneLanding /> Destination:
          </label>
          <input
            type="text"
            placeholder="Choose airport"
            name="destination"
            value={citySearch.destination}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Departure Date */}
        <div className="flex flex-col flex-grow">
          <label className="block text-indigo-900 mb-1 font-semibold">Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={citySearch.departureDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col flex-grow">
          <label className="block text-indigo-900 mb-1 font-semibold">Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={citySearch.returnDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col flex-grow">
          <label className="block text-indigo-900 mb-1 font-semibold">Duration:</label>
          <select
            name="duration"
            value={citySearch.duration}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
          >
            <option value="">Select duration</option>
            <option value="3">3 nights</option>
            <option value="5">5 nights</option>
            <option value="7">7 nights</option>
            <option value="10">10 nights</option>
            <option value="14">14 nights</option>
          </select>
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-grow">
          <div className="flex gap-4">
            {/* Adults Input */}
            <div className="w-1/2">
              <label className="flex items-center text-indigo-900 font-semibold mb-1 gap-2">
                <BsPerson />
                <span>Adults:</span>
              </label>
              <input
                type="number"
                name="adults"
                placeholder="Adults"
                min="1"
                value={citySearch.guests.adults}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>


            {/* Children Input */}
            <div className="w-1/2">
              <label className="block text-sm text-indigo-900 font-semibold mb-1">Children:</label>
              <input
                type="number"
                name="children"
                placeholder="Children"
                min="0"
                value={citySearch.guests.children}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>



        {/* Buttons */}
        <div className="flex gap-2 items-center mt-2">
          <Button id="searchButton" />
          <Button onClick={handleClearSearch} id="clear" />
        </div>
      </form>
    </div>
  );




};

export default City;
