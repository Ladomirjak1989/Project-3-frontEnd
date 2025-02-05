import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuPlaneLanding } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { setFlyFrom, setFlyTo, setDeparting, setReturning, setPassengers, setTripType, setClearSearch } from '../../Store/Slices/flightSearchSlice';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { fetchFlightAsyncApi } from '../../Store/Slices/fetchFlightSliceAsync'


const Flightbar = () => {

  const [result, setResults] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const flightSearch = useSelector((state) => state.flightSearch);


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Dispatch the fetchFlightAsyncApi action with the current flight search data
      const flightResults = await dispatch(fetchFlightAsyncApi({ flyFrom: flightSearch.flyFrom, flyTo: flightSearch.flyTo, departing: flightSearch.departing, passengers: flightSearch.passengers, returning: flightSearch.returning, tripType: flightSearch.tripType })).unwrap();
      setResults(flightResults); // Update results in local state
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
    // dispatch(fetchSearchFlightAsync(flightSearch))
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
      <label className="text-2xl font-bold mb-6 block text-center">{t('searchbar.searchTitle')}</label>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center mb-2 font-semibold"><LuPlaneTakeoff />{t('searchbar.searchFlyFrom')}</label>
          <input
            type="text"
            placeholder={t('searchbar.searchFlyFromPlaceHolder')}
            name="flyFrom"
            value={flightSearch.flyFrom}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="flex text-indigo-900 gap-2 items-center mb-2 font-semibold"><LuPlaneLanding />{t('searchbar.searchFlyTo')}</label>
          <input
            type="text"
            placeholder={t('searchbar.searchFlyToPlaceHolder')}
            name="flyTo"
            value={flightSearch.flyTo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900 mb-2 font-semibold">{t('searchbar.searchDeparting')}</label>
          <input
            type="date"
            name="departing"
            value={flightSearch.departing}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-indigo-900 mb-2 font-semibold">{t('searchbar.searchReturning')}</label>
          <input
            type="date"
            name="returning"
            value={flightSearch.returning}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className=" text-indigo-900 mb-2 flex items-center space-x-2 font-semibold">
                <BsPerson className="text-indigo-900 text-xl" />
                <span>{t('searchbar.searchAdults')}</span>
              </label>
              <input
                type="number"
                min={1}
                max={9}
                name="adults"
                value={flightSearch.passengers.adults}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-indigo-900 mb-2 font-semibold">{t('searchbar.searchChildren')}</label>
              <input
                type="number"
                min={0}
                max={9}
                name="children"
                value={flightSearch.passengers.children}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-indigo-900 mb-2 font-semibold">{t('searchbar.searchTripType')}</label>
          <select
            name="tripType"
            value={flightSearch.tripType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="return">{t('searchbar.searchReturn')}</option>
            <option value="one-way">{t('searchbar.searchOneWay')}</option>
          </select>
        </div>
        <div className="flex space-x-2 items-end p-4">
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