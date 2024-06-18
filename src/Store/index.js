import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import sessionSliceReducer from "./Slices/sessionSliceReducer";
import flightSliceReducer from "./Slices/flightSliceReducer";
import flightSearchReducer from './Slices/flightSearchSlice';
import vacationSearchReducer from './Slices/vacationSearchSlice';
import hotelSearchSlice from "./Slices/hotelSearchSlice";
import popUpSliceReducer from "./Slices/popUpSliceReducer";
import cruiseSearchSlice from "./Slices/cruiseSearchSlice";


const Store = configureStore({
    reducer: {
        session: sessionSliceReducer,
        flights: flightSliceReducer,
        flightSearch: flightSearchReducer,
        vacationSearch: vacationSearchReducer,
        hotelSearch: hotelSearchSlice,
        cruiseSearch: cruiseSearchSlice,
        popUp: popUpSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default Store