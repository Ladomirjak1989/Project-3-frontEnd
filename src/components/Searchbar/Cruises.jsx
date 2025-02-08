import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchCruiseAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import { setCruiseType, setDeparture, setDestination, setDepartureTime, setGuests, setCruiseDuration, setClearSearch } from '../../Store/Slices/cruiseSearchSlice';
import Button from '../Button/Button';



const CruiseSearchForm = () => {
    const dispatch = useDispatch();
    const cruiseSearch = useSelector((state) => state.cruiseSearch);
    const [isCruiseDurationShown, setCruiseDurationShown] = useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cruiseType':
                dispatch(setCruiseType(value));
                break;
            case 'departure':
                dispatch(setDeparture(value));
                break;
            case 'destination':
                dispatch(setDestination(value));
                break;
            case 'departureTime':
                dispatch(setDepartureTime(value));
                break;
            case 'duration':
                dispatch(setCruiseDuration(value));
                break;
            case 'guests':
                dispatch(setGuests(value));
                break;

            default:
                break;
        }
    };

    const handleClearSearch = () => {
        dispatch(setClearSearch());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(fetchSearchCruiseAsync(cruiseSearch));
    };

    const handleDurationChange = (e) => {
        dispatch(setCruiseDuration(e.target.value));
        setCruiseDurationShown(false);
    };


    return (
        <div className="mx-auto p-4 bg-blue-50 rounded-lg shadow-lg">
            <label className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 block text-center">
                Find your cruises
            </label>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Trip Type (Flex on larger screens, Stack on mobile) */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 items-start sm:items-center">
                    <label className="block text-indigo-900 font-semibold mb-2 sm:mb-0">Trip type</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="cruiseType"
                            value="Marella Cruise"
                            checked={cruiseSearch.cruiseType === 'Marella Cruise'}
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <label>Marella Cruise</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="cruiseType"
                            value="River Cruise"
                            checked={cruiseSearch.cruiseType === 'River Cruise'}
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <label>River Cruise</label>
                    </div>
                </div>

                {/* Input Fields - Full width on mobile, Grid on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-indigo-900 font-semibold">Where from?</label>
                        <input
                            type="text"
                            name="departure"
                            value={cruiseSearch.departure}
                            onChange={handleChange}
                            placeholder="Any airport/port"
                            className="form-input w-full p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-indigo-900 font-semibold">Where to?</label>
                        <input
                            type="text"
                            name="destination"
                            value={cruiseSearch.destination}
                            onChange={handleChange}
                            placeholder="Cruise destination"
                            className="form-input w-full p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-indigo-900 font-semibold">When?</label>
                        <input
                            type="month"
                            name="departureTime"
                            value={cruiseSearch.departureTime}
                            onChange={handleChange}
                            className="form-input w-full p-2 rounded-lg"
                        />
                    </div>
                </div>

                {/* Duration and Guests - Everything in One Row */}
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 items-end">

                    {/* Cruise Duration */}
                    <div className="w-full sm:w-auto relative">
                        <label className="block text-indigo-900 font-semibold">How long?</label>
                        <button
                            type="button"
                            onClick={() => setCruiseDurationShown(!isCruiseDurationShown)}
                            className="form-input w-full p-2 rounded-lg text-left flex justify-between items-center"
                        >
                            <span>&#x25BC;</span>
                            {cruiseSearch.duration}
                        </button>
                        {isCruiseDurationShown && (
                            <div className="absolute z-20 w-full sm:w-[300px] mt-2 bg-white border rounded-lg shadow-lg">
                                <div className="p-4">
                                    {[
                                        "Up to 7 nights cruise, no hotel stay",
                                        "10 nights cruise, no hotel stay",
                                        "8 to 14 nights cruise, no hotel stay",
                                        "15+ nights cruise, no hotel stay",
                                    ].map((option) => (
                                        <div key={option} className="flex items-center space-x-2 mb-4">
                                            <input
                                                type="radio"
                                                name="cruiseDuration"
                                                value={option}
                                                checked={cruiseSearch.duration === option}
                                                onChange={handleDurationChange}
                                                className="form-radio"
                                            />
                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Who's Going + Buttons */}
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-end sm:space-x-4">
                        <div className="w-full sm:max-w-[250px]">
                            <label className="block text-indigo-900 font-semibold">Who's going?</label>
                            <input
                                type="text"
                                name="guests"
                                value={cruiseSearch.guests.adults}
                                onChange={handleChange}
                                placeholder="2 Adults 0 Children"
                                className="form-input w-full p-2 rounded-lg"
                            />
                        </div>

                        {/* Buttons - Same Size as Input */}
                        <div className="flex w-full sm:w-auto space-x-2 mt-4 sm:mt-0">
                            <Button id="searchButton" />
                            <Button id="clear" onClick={handleClearSearch} />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );


};

export default CruiseSearchForm;

