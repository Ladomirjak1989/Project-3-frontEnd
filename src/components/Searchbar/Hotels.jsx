import React, { useState } from 'react';
import { LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
  setClearSearch
} from "../../Store/Slices/hotelSearchSlice";
// import { fetchSearchHotelAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import Button from '../Button/Button';
import { fetchHotelAsyncApi } from '../../Store/Slices/fetchHotelSliceAsync';

const Hotels = () => {
  const dispatch = useDispatch();
  const hotelSearch = useSelector((state) => state.hotelSearch);
  
  const [isHotelRoomsShown, setHotelRoomsShown] = useState(false)
  const [hotelRooms, setHotelRooms] = useState([{ adults: 2, children: 0 }]);
  const [result, setResults] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(fetchSearchHotelAsync(hotelSearch))

    dispatch(fetchHotelAsyncApi({ hotelTo: hotelSearch.destination }))

  }
  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "hotelRoom") {
      const updatedHotelRooms = hotelRooms.map((hotelRoom, i) => i === index ? { ...hotelRoom, [name]: value } : hotelRoom);
      setHotelRooms(updatedHotelRooms);
      dispatch(setGuests(updatedHotelRooms));
    } else {
      switch (name) {
        case 'destination':
          dispatch(setDestination(value));
          break;

        case 'checkInDate':
          dispatch(setCheckInDate(value));
          break;

        case 'checkOutDate':
          dispatch(setCheckOutDate(value));
          break;
        default:
          break;
      }
    }
  };

  const addHotelRoom = () => {
    setHotelRooms([...hotelRooms, { adults: 2, children: 0 }]);
    setHotelRooms(updatedHotelRooms);
    dispatch(setHotelRooms(updatedHotelRooms));
    dispatch(setGuests(updatedHotelRooms));
  };

  const removeHotelRoom = (index) => {
    const updatedHotelRooms = hotelRooms.filter((_, i) => i !== index);
    setHotelRooms(updatedHotelRooms);
    dispatch(setHotelRooms(updatedHotelRooms));
    dispatch(setGuests(updatedHotelRooms));
  };

  const handleClearSearch = () => {
    dispatch(setClearSearch());
  };

  const handleDone = () => {
    // Logic to close the popup or save the state
    setHotelRoomsShown(false)
    console.log('Done button clicked');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <label className="text-2xl font-bold mb-6 block text-center">Find your hotel</label>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex-1">
          <label className="block text-indigo-900 font-semibold mb-2">Destination</label>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <LuPlaneLanding className="text-indigo-900 mr-2" />
            <input
              type="text"
              placeholder="city"
              name="destination"
              value={hotelSearch.destination}
              onChange={(e) => handleInputChange(e, null, "input")}
              className="flex-1 outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-indigo-900 font-semibold mb-2">Check-in - Check-out</label>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaCalendarAlt className="text-indigo-900 mr-2" />
            <input
              type="date"
              name="checkInDate"
              value={hotelSearch.checkInDate}
              onChange={(e) => handleInputChange(e, null, "input")}
              className="outline-none"
            />
            <span className="mx-2">-</span>
            <input
              type="date"
              name="checkOutDate"
              value={hotelSearch.checkOutDate}
              onChange={(e) => handleInputChange(e, null, "input")}
              className="outline-none"
            />
          </div>
        </div>

        <div className="flex-1 relative">
          <label className="block text-indigo-900 font-semibold mb-2">Rooms and Guests</label>
          <div onClick={() => setHotelRoomsShown(prev => !prev)} className="flex items-center border border-gray-300 p-2 rounded cursor-pointer">
            <BsPerson className="text-indigo-900 mr-2" />
            <span className="flex-1">{hotelRooms.length} room(s), {hotelRooms.reduce((sum, hotelRoom) => sum + parseInt(hotelRoom.adults), 0)} adults, {hotelRooms.reduce((sum, hotelRoom) => sum + parseInt(hotelRoom.children), 0)} children</span>
          </div>
          {isHotelRoomsShown && <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 p-4 rounded shadow-lg z-10">

            {hotelRooms.map((hotelRoom, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-900 font-semibold">Room {index + 1}</span>
                  {index > 0 && (
                    <button type="button" onClick={() => removeHotelRoom(index)} className="text-red-500">Remove</button>
                  )}
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-indigo-900">Adults</label>
                    <select
                      name="adults"
                      value={hotelRoom.adults}
                      onChange={(e) => handleInputChange(e, index, "hotelRoom")}
                      className="border border-gray-300 p-2 rounded w-full"
                    >
                      {[...Array(5)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-indigo-900">Children</label>
                    <select
                      name="children"
                      value={hotelRoom.children}
                      onChange={(e) => handleInputChange(e, index, "hotelRoom")}
                      className="border border-gray-300 p-2 rounded w-full"
                    >
                      {[...Array(5)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addHotelRoom} className="text-blue-500">+ Add room</button>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => setHotelRooms([{ adults: 2, children: 0 }])} className="text-blue-500">Clear all</button>
              <button type="button" onClick={handleDone} className="bg-blue-500 text-white py-2 px-4 rounded">Done</button>
            </div>
          </div>}

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
    </div>
  );
};


export default Hotels;
