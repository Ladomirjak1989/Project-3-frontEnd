import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuPlaneLanding } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { setFlyFrom, setFlyTo, setDeparting, setReturning, setPassengers, setTripType, setClearSearch } from '../../Store/Slices/flightSearchSlice';
import { fetchSearchFlightAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import Button from '../Button/Button';


const Flightbar = () => {

  const [result, setResults] = useState("");


  const dispatch = useDispatch();
  const flightSearch = useSelector((state) => state.flightSearch);

  const handelSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchSearchFlightAsync(flightSearch))

  }


  const handleInputChange = (e) => {

    const { name, value } = e.target;
    switch (name) {
      case 'flyFrom':
        dispatch(setFlyFrom(value));
        break;

      case 'flyTo':
        dispatch(setFlyTo(value));
        break;

      case 'departing':
        dispatch(setDeparting(value));
        break;

      case 'returning':
        dispatch(setReturning(value));
        break;

      case 'adults':
      case 'children':
        dispatch(setPassengers({ ...flightSearch.passengers, [name]: value }));
        break;

      case 'tripType':
        dispatch(setTripType(value));
        break;

      default:
        break;
    }
  };

  const handleClearSearch = () => {
    dispatch(setClearSearch());
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-md">
      <label className="text-2xl font-bold mb-6 block text-center">Find your Flight</label>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onSubmit={handelSubmit}>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center mb-2"><LuPlaneTakeoff /> Fly from:</label>
          <input
            type="text"
            placeholder="choose airports"
            name="flyFrom"
            value={flightSearch.flyFrom}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center mb-2"><LuPlaneLanding /> Fly to:</label>
          <input
            type="text"
            placeholder="choose airports"
            name="flyTo"
            value={flightSearch.flyTo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900 mb-2">Departing:</label>
          <input
            type="date"
            name="departing"
            value={flightSearch.departing}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900 mb-2">Returning:</label>
          <input
            type="date"
            name="returning"
            value={flightSearch.returning}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center mb-2"><BsPerson /> Passengers:</label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-indigo-900 mb-2">Adults:</label>
              <input
                type="number"
                name="adults"
                value={flightSearch.passengers.adults}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-indigo-900 mb-2">Children:</label>
              <input
                type="number"
                name="children"
                value={flightSearch.passengers.children}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-indigo-900 mb-2">Trip type:</label>
          <select
            name="tripType"
            value={flightSearch.tripType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="return">Return</option>
            <option value="one-way">One way</option>
          </select>
        </div>
        <div className="flex space-x-2 items-end">
          <Button id="searchButton" />
          <Button onClick={handleClearSearch} id="clear" />
        </div>
      </form>
      <div className="mt-6">
        {!!result.length && result.map((res) => (
          <div
            onClick={() => handleResultClick(res)}
            key={res.origin}
            className="p-4 mb-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
          >
            {res.origin} - {res.destination}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flightbar