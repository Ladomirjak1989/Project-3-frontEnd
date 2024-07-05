import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import router from './routers/routers';
import { fetchFlightAsync } from './Store/Slices/fetchFlightSliceAsync';
import { fetchVacationAsync } from './Store/Slices/fetchVacationSliceAsync';
import { fetchCityAsync } from './Store/Slices/fetchCitySliceReducer';
import { fetchHotelAsync } from './Store/Slices/fetchHotelSliceAsync';
import { fetchCruiseAsync } from './Store/Slices/fetchCruiseSliceAsync';
import { setToken, setUser } from './Store/Slices/sessionSliceReducer';
import { setCartCruiseWithUser } from './Store/Slices/cruiseSliceReducer';
import { setCartFlightWithUser } from './Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from './Store/Slices/vacationSliceReducer';
import { setCartHotelWithUser } from './Store/Slices/hotelSliceReducer';
import { fetchGetUserByIdAsync } from './Store/Slices/fetchSessionSliceAsync';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all data when the app loads
        const init = async () => {
            const flight = await dispatch(fetchFlightAsync());
            const vacation = await dispatch(fetchVacationAsync());
            const city = await dispatch(fetchCityAsync());
            const hotel = await dispatch(fetchHotelAsync());
            const cruise = await dispatch(fetchCruiseAsync())

            const token = await localStorage.getItem("token")
            const storage = await JSON.parse(localStorage.getItem("user"))
          
            if (storage && token) {
               
                const {payload} = await dispatch(fetchGetUserByIdAsync({id:storage._id}))
              
               await dispatch(setCartCruiseWithUser(payload.user.cruises))
               await dispatch(setCartFlightWithUser(payload.user.flights))
                await dispatch(setCartVacationWithUser(payload.user.vacations))
                await dispatch(setCartHotelWithUser(payload.user.hotels))
            }
        }
        init()


    }, [dispatch]);

    return <RouterProvider router={router} />;
};

export default App;
