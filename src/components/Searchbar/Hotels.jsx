import React, { useState } from 'react';
import { LuPlaneLanding } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setRooms,
  setaddRoom,
  setremoveRoom,
  setGuests,
  setclearAll
} from "../../Store/Slices/hotelSearchSlice";

const Hotels = () => {
  const dispatch = useDispatch();
  const vacationSearch = useSelector((state) => state.vacationSearch);
  const [hotelRooms, setHotelRooms] = useState([{ adults: 2, children: 0 }]);
  const [result, setResults] = useState("");
  const [input, setInput] = useState("");

  const navigate = useNavigate()

  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "room") {
      const updatedHotelRooms = hotelRooms.map((hotelRoom, i) => i === index ? { ...hotelRoom, [name]: value } : hotelRoom);
      setRooms(updatedHotelRooms);
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

        case 'rooms':
          dispatch(setRooms(value));
          break;

        case 'addRoom':
          dispatch(setaddRoom(value));
          break;

        case 'removeRoom':
          dispatch(setremoveRoom(value));
          break;

        case 'clearAll':
          dispatch(setclearAll(value));
          break;


        default:
          break;
      }
    }
  };

  const addRoom = () => {
    setRooms([...hotelRooms, { adults: 2, children: 0 }]);
  };

  const removeRoom = (index) => {
    const updatedHotelRooms = hotelRooms.filter((_, i) => i !== index);
    setRooms(updatedHotelRooms);
    dispatch(setGuests(updatedHotelRooms));
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <form className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <label className="block text-indigo-900 font-semibold mb-2">Destination</label>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <LuPlaneLanding className="text-indigo-900 mr-2" />
            <input
              type="text"
              placeholder="city"
              name="destination"
              value={vacationSearch.destination}
              onChange={handleInputChange}
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
              name="departureDate"
              value={vacationSearch.departureDate}
              onChange={handleInputChange}
              className="outline-none"
            />
            <span className="mx-2">-</span>
            <input
              type="date"
              name="returnDate"
              value={vacationSearch.returnDate}
              onChange={handleInputChange}
              className="outline-none"
            />
          </div>
        </div>
        <div className="flex-1 relative">
          <label className="block text-indigo-900 font-semibold mb-2">Rooms and Guests</label>
          <div className="flex items-center border border-gray-300 p-2 rounded cursor-pointer">
            <BsPerson className="text-indigo-900 mr-2" />
            <span className="flex-1">{hotelRooms.length} room(s), {hotelRooms.reduce((sum, hotelRoom) => sum + parseInt(hotelRoom.adults), 0)} adults, {hotelRooms.reduce((sum, hotelRoom) => sum + parseInt(hotelRoom.children), 0)} children</span>
          </div>
          <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 p-4 rounded shadow-lg z-10">
            {hotelRooms.map((hotelRoom, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-indigo-900 font-semibold">Room {index + 1}</span>
                  {index > 0 && (
                    <button type="button" onClick={() => removeRoom(index)} className="text-red-500">Remove</button>
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
            <button type="button" onClick={addRoom} className="text-blue-500">+ Add room</button>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => setRooms([{ adults: 2, children: 0 }])} className="text-blue-500">Clear all</button>
              <button type="button" onClick={() => {/* Close the popup logic here */ }} className="bg-blue-500 text-white py-2 px-4 rounded">Done</button>
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hotels;
