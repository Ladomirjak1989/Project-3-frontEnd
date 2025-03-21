import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuPlaneTakeoff, LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from "react-icons/bs";
import { setDeparture, setDestination, setDepartureDate, setDuration, setReturnDate, setGuests, setClearSearch } from "../../Store/Slices/vacationSearchSlice"
import { fetchSearchVacationAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import Button from '../Button/Button';


const Vacationsbar = () => {

  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  const vacationSearch = useSelector((state) => state.vacationSearch);

  const handelSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchSearchVacationAsync(vacationSearch))

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
        dispatch(setGuests({ ...vacationSearch.guests, [name]: value }));
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
    <div className="mx-auto p-6 bg-white shadow-md rounded-md">
      <label className="text-2xl font-bold mb-6 block text-center">Find your vacation</label>
      <form onSubmit={handelSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
        <div className="flex flex-col">
          <label className="flex text-indigo-900 gap-2 items-center mb-2 font-semibold">
            <LuPlaneTakeoff /> Departure:
          </label>
          <input
            type="text"
            placeholder="Choose airports"
            name="departure"
            value={vacationSearch.departure}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="flex text-indigo-900 gap-2 items-center mb-2 font-semibold">
            <LuPlaneLanding /> Destination:
          </label>
          <input
            type="text"
            placeholder="Choose airports"
            name="destination"
            value={vacationSearch.destination}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900 mb-2 font-semibold">Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={vacationSearch.departureDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900 mb-2 font-semibold">Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={vacationSearch.returnDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-indigo-900 mb-2 font-semibold">Duration:</label>
          <select
            name="duration"
            value={vacationSearch.duration}
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

          <div className="flex space-x-2">
            <div className="flex-1">
              <label  className=" text-indigo-900 mb-2 flex items-center space-x-2 font-semibold"> <BsPerson className="text-indigo-900 text-xl" />Adults:</label>
              <input
                type="number"
                name="adults"
                value={vacationSearch.guests.adults}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-indigo-900 mb-2 font-semibold">Children:</label>
              <input
                type="number"
                name="children"
                value={vacationSearch.guests.children}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-2 p-4">
          <Button id="searchButton" />
          <Button onClick={handleClearSearch} id="clear" />
        </div>
      </form>
      <div className="mt-6">
        {!!result.length && result.map((result) => (
          <div
            onClick={() => handleResultClick(result)}
            key={result.origin}
            className="p-4 mb-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vacationsbar;
