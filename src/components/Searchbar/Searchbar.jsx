import React, { useEffect } from 'react'
import { useState } from "react";
import { Attractions } from './Attractions';
import City from './City';
import Cruises from './Cruises';
import Vacationsbar from './Vacationsbar';
import Hotels from './Hotels';
import Flightbar from './Flightbar';
import { TbSunset2 } from "react-icons/tb";
import { TbPlaneInflight } from "react-icons/tb";
import { FaHotel } from "react-icons/fa";
import { GiCruiser } from "react-icons/gi";
import { MdAttractions } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Searchbar = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()


  const [tab, setTab] = useState("flights")

  useEffect(() => {
    const location = pathname.split("/")
   
    setTab((prev) => {
      return location[1] || prev
    })
  }, [pathname])

  return (
    <div className="p-6 bg-cyan-50 rounded-lg shadow-lg">
      <ul className="flex justify-between border-b-2 border-gray-300 font-bold ">
        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'flights' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/flights")
            setTab("flights")
          }}

        >
          <TbPlaneInflight className="mr-2 size-8" /> Flight
        </li>

        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'vacations' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/vacations")
            setTab("vacations")
          }}
        >
          <TbSunset2 className="mr-2 size-8" /> Vacation
        </li>

        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'hotels' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/hotels")
            setTab("hotels")
          }}
        >
          <FaHotel className="mr-2 size-8" /> Hotel
        </li>

        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'cruises' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/cruises")
            setTab("cruises")
          }}
        >
          <GiCruiser className="mr-2 size-8" /> Cruise
        </li>

        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'attractions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/attractions")
            setTab("attractions")
          }}
        >
          <MdAttractions className="mr-2 size-8" /> Attraction
        </li>

        <li
          className={`p-2 cursor-pointer flex items-center ${tab === 'cities' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
          onClick={() => {
            navigate("/cities")
            setTab("city")
          }}
        >
          <GiModernCity className="mr-2 size-8" /> City
        </li>
      </ul>
      {tab === "flights" && <Flightbar />}
      {tab === "vacations" && <Vacationsbar />}
      {tab === "hotels" && <Hotels />}
      {tab === "cruises" && <Cruises />}
      {tab === "attractions" && <Attractions />}
      {tab === "cities" && <City />}
    </div>
  );
}

export default Searchbar







