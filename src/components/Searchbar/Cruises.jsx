import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchCruiseAsync } from '../../Store/Slices/fetchSearchSliceAsync';
import { setCruiseType, setDeparture, setDestination, setDepartureTime, setGuests, setCruiseDuration, setClearSearch } from "../../Store/Slices/cruiseSearchSlice"


const Cruises = () => {
    const dispatch = useDispatch();
    const [isCruiseDurationShown, setCruiseDurationShown] = useState(false)
    const cruiseSearch = useSelector((state) => state.cruiseSearch);
    const [cruiseTypeForm, setCruiseTypeForm] = useState()


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
                dispatch(setDuration(value));
                break;
            case 'passengers':
                dispatch(setGuests(value));
                break;
            case 'cruiseDuration':
                dispatch(setCruiseDuration(value));
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
        dispatch(setCruiseType());
        dispatch(fetchSearchCruiseAsync( cruiseSearch, cruiseTypeForm ));
        dispatch(setClearSearch());
    };

    const handleCruiseTypeChange = (e) => {
        setCruiseType(e.target.value);
        setCruiseTypeForm()
    };

    const handleDone = () => {
        // Logic to close the popup or save the state
        setCruiseDurationShown(false)
        console.log('Done button clicked');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
                <div>
                    <input
                        type="radio"
                        id="marella"
                        name="cruiseType"
                        value="Marella Cruise"
                        checked={cruiseSearch.cruiseTypeForm === 'Marella Cruise'}
                        onChange={handleCruiseTypeChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="marella"
                        className={`cursor-pointer px-4 py-2 rounded-lg ${cruiseSearch === 'Marella Cruise' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
                    >
                        Marella Cruise
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="river"
                        name="cruiseType"
                        value="River Cruise"
                        checked={cruiseSearch.cruiseTypeForm === 'River Cruise'}
                        onChange={handleCruiseTypeChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="river"
                        className={`cursor-pointer px-4 py-2 rounded-lg ${cruiseSearch === 'River Cruise' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
                    >
                        River Cruise
                    </label>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                    <label className="block text-blue-900 font-semibold mb-2">Where from?</label>
                    <input
                        type="text"
                        name="departure"
                        value={cruiseSearch.departure}
                        onChange={handleChange}
                        placeholder="Any city/port"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-2">Where to?</label>
                    <input
                        type="text"
                        name="destination"
                        value={cruiseSearch.destination}
                        onChange={handleChange}
                        placeholder="Any"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-2">When?</label>
                    <div className="relative">
                        <input
                            type="month"
                            name="departureTime"
                            value={cruiseSearch.departureTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-2">How long?</label>
                    <input
                        type="text"
                        name="duration"
                        value={cruiseSearch.duration}
                        onChange={handleChange}
                        placeholder="Up to 7 nights cruise"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div>
                    <label className="block text-blue-900 font-semibold mb-2">Who's going?</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="passengers"
                            value={cruiseSearch.passengers}
                            onChange={handleChange}
                            placeholder="2 Adults 0 Children"
                            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-5 flex justify-end mt-4">
                    <button className="bg-blue-900 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit">
                        Search
                    </button>
                    <button type="button" onClick={handleClearSearch} className="bg-gray-700 text-white py-2 px-4 rounded">
                        Clear
                    </button>
                </div>
            </form>
            {isCruiseDurationShown && (
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                    <h2 className="text-lg font-semibold mb-4">Cruise & hotel stay durations</h2>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="upTo7Nights"
                                    name="cruiseDuration"
                                    value="Up to 7 nights cruise, with"
                                    checked={cruiseSearch.cruiseDuration === 'Up to 7 nights cruise, with'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-600"
                                />
                                <label htmlFor="upTo7Nights" className="ml-2 text-blue-900">Up to 7 nights cruise, with</label>
                            </div>
                            {cruiseSearch.cruiseDuration === 'Up to 7 nights cruise, with' && (
                                <select
                                    name="hotelStay"
                                    value={cruiseSearch.hotelStay}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="no hotel stay">no hotel stay</option>
                                    <option value="1 night hotel stay">1 night hotel stay</option>
                                    <option value="2 nights hotel stay">2 nights hotel stay</option>
                                    <option value="3 nights hotel stay">3 nights hotel stay</option>
                                    <option value="4 nights hotel stay">4 nights hotel stay</option>
                                    <option value="5 nights hotel stay">5 nights hotel stay</option>
                                    <option value="6 nights hotel stay">6 nights hotel stay</option>
                                    <option value="7 nights hotel stay">7 nights hotel stay</option>
                                </select>
                            )}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="8to14Nights"
                                name="cruiseDuration"
                                value="8 to 14 nights cruise, no hotel stay"
                                checked={cruiseSearch.cruiseDuration === '8 to 14 nights cruise, no hotel stay'}
                                onChange={handleChange}
                                className="form-radio text-blue-600"
                            />
                            <label htmlFor="8to14Nights" className="ml-2 text-blue-900">8 to 14 nights cruise, no hotel stay</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="15PlusNights"
                                name="cruiseDuration"
                                value="15+ nights cruise, no hotel stay"
                                checked={cruiseSearch.cruiseDuration === '15+ nights cruise, no hotel stay'}
                                onChange={handleChange}
                                className="form-radio text-blue-600"
                                disabled
                            />
                            <label htmlFor="15PlusNights" className="ml-2 text-gray-400">15+ nights cruise, no hotel stay</label>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button type="button" onClick={() => setCruiseDuration()} className="text-blue-600 hover:underline">Clear All</button>
                            <button type="button" onClick={handleDone} className="bg-blue-500 text-white py-2 px-4 rounded">Done</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cruises;
