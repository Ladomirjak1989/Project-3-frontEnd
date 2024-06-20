import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuPlaneLanding } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { setFlyFrom, setFlyTo, setDeparting, setReturning, setPassengers, setTripType, setClearSearch } from '../../Store/Slices/flightSearchSlice';
import { fetchSearchFlightAsync } from '../../Store/Slices/fetchSearchSliceAsync';


const Flightbar = () => {
   
    const [result, setResults] = useState("");
   
 
    const dispatch = useDispatch();
    const flightSearch = useSelector((state) => state.flightSearch);

    const handelSubmit=(e) =>{
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
    <>
      <label className="text-xl font-bold mb-4">Find your Flight</label>
      
      <form className="flex justify-between" onSubmit={handelSubmit}>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center"><LuPlaneTakeoff />Fly from:</label>
          <input
            type="text"
            placeholder='choose airports'
            name="flyFrom"
            value={flightSearch.flyFrom}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center"><LuPlaneLanding />Fly to:</label>
          <input
            type="text"
            placeholder='choose airports'
            name="flyTo"
            value={flightSearch.flyTo}
            onChange={handleInputChange}
            className=" border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900">Departing:</label>
          <input
            type="date"
            name="departing"
            value={flightSearch.departing}
            onChange={handleInputChange}
            className=" border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900">Returning:</label>
          <input
            type="date"
            name="returning"
            value={flightSearch.returning}
            onChange={handleInputChange}
            className=" border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center"><BsPerson />Passengers:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="adults"
              value={flightSearch.passengers.adults}
              onChange={handleInputChange}
              className=" border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              name="children"
              value={flightSearch.passengers.children}
              onChange={handleInputChange}
              className=" border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-indigo-900">Trip type:</label>
          <select
            name="tripType"
            value={flightSearch.tripType}
            onChange={handleInputChange}
            className=" border border-gray-300 p-2 rounded"
          >
            <option value="return">Return</option>
            <option value="one-way">One way</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className=" bg-blue-500 text-white p-3 px-6 m-4 rounded">Search</button>
          <button type="button" onClick={handleClearSearch} className=" bg-gray-700 text-white p-3 px-6 m-4 rounded">Clear</button>
        </div>
      </form>

      <div>
        {!!result.length && result.map((result) => (
          <div onClick={() => handleResultClick(result)} key={result.origin}>
          </div>
        ))}
      </div>
    </>
  );
};

export default Flightbar