import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuPlaneTakeoff, LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { setDeparture, setDestination, setDepartureDate, setReturnDate, setGuests } from "../../Store/Slices/vacationSearchSlice"


const Vacationsbar = () => {


  const [vacations, setVacations] = useState([]);
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const vacationSearch = useSelector((state) => state.vacationSearch);

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
    navigate('/vacation');
  };




  const handleResultClick = (result) => {
    // Handle the result click (e.g., navigate to a detailed vacation page)
  };


return (
  <>
    <label className="text-xl font-bold mb-4">Find your Vacation</label>
    <form className="flex flex-wrap gap-4 justify-between">
      <div className="flex flex-col">
        <label className="flex text-indigo-900 gap-2 items-center">
          <LuPlaneTakeoff /> Departure:
        </label>
        <input
          type="text"
          placeholder="choose airports"
          name="departure"
          value={vacationSearch.departure}
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
          value={vacationSearch.destination}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-indigo-900">Departure Date:</label>
        <input
          type="date"
          name="departureDate"
          value={vacationSearch.departureDate}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-indigo-900">Return Date:</label>
        <input
          type="date"
          name="returnDate"
          value={vacationSearch.returnDate}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-indigo-900">Duration:</label>
        <select
          name="duration"
          value={vacationSearch.duration}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select duration</option>
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
          <option value="10">10 days</option>
          <option value="14">14 days</option>
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
            value={vacationSearch.guests.adults}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="children"
            value={vacationSearch.guests.children}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-3 px-6 m-4 rounded">
        Search
      </button>
    </form>
    {/* Render the result content here */}
    <div>
      {!!result.length &&
        result.map((result) => (
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

export default Vacationsbar;
