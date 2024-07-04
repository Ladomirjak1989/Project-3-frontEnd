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
        <div className="container mx-auto p-4 bg-blue-100 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4 items-center">
                    <label className="block text-indigo-900 font-semibold">Trip type</label>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <div className='flex justify-between'>
                    <div>
                        <label className="block text-indigo-900 font-semibold">How long?</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setCruiseDurationShown(!isCruiseDurationShown)}
                                className="form-input w-full p-2 rounded-lg text-left flex justify-between items-center"
                            >
                                <span>&#x25BC;</span>
                                {cruiseSearch.duration}

                            </button>
                            {isCruiseDurationShown && (
                                <div className="absolute z-20 w-[300px] mt-2 bg-white border rounded-lg shadow-lg">
                                    <div className="p-4">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <input
                                                type="radio"
                                                name="cruiseDuration"
                                                value="Up to 7 nights cruise, no hotel stay"
                                                checked={cruiseSearch.duration === 'Up to 7 nights cruise, no hotel stay'}
                                                onChange={handleDurationChange}
                                                className="form-radio"
                                            />
                                            <label> 7 nights cruise, no hotel stay</label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <input
                                                type="radio"
                                                name="cruiseDuration"
                                                value="10 nights cruise, no hotel stay"
                                                checked={cruiseSearch.duration === '10 nights cruise, no hotel stay'}
                                                onChange={handleDurationChange}
                                                className="form-radio"
                                            />
                                            <label> 10 nights cruise, no hotel stay</label>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <input
                                                type="radio"
                                                name="cruiseDuration"
                                                value="8 to 14 nights cruise, no hotel stay"
                                                checked={cruiseSearch.duration === '8 to 14 nights cruise, no hotel stay'}
                                                onChange={handleDurationChange}
                                                className="form-radio"
                                            />
                                            <label>8 to 14 nights cruise, no hotel stay</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="cruiseDuration"
                                                value="15+ nights cruise, no hotel stay"
                                                checked={cruiseSearch.duration === '15+ nights cruise, no hotel stay'}
                                                onChange={handleDurationChange}
                                                className="form-radio"
                                            />
                                            <label>15+ nights cruise, no hotel stay</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='max-w-[250px] w-full'>
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

                    <div className="flex justify-end space-x-4">
                        <Button id="searchButton" />
                        <Button id="clear" onClick={handleClearSearch} />



                    </div>

                </div>


            </form>
        </div>
    );
};

export default CruiseSearchForm;

