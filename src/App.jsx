import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import router from './routers/routers';
import { fetchFlightAsync } from './Store/Slices/fetchFlightSliceAsync';
import { fetchVacationAsync } from './Store/Slices/fetchVacationSliceAsync';
import { fetchCityAsync } from './Store/Slices/fetchCitySliceReducer';
import { fetchHotelAsync } from './Store/Slices/fetchHotelSliceAsync';
import { fetchCruiseAsync } from './Store/Slices/fetchCruiseSliceAsync';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all data when the app loads
        dispatch(fetchFlightAsync());
        dispatch(fetchVacationAsync());
        dispatch(fetchCityAsync());
        dispatch(fetchHotelAsync());
        dispatch(fetchCruiseAsync())
    }, [dispatch]);

    return <RouterProvider router={router} />;
};

export default App;
