import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import sessionSliceReducer from "./Slices/sessionSliceReducer";
import flightSliceReducer from "./Slices/flightSliceReducer";
import flightSearchReducer from './Slices/flightSearchSlice';
import vacationSearchReducer from './Slices/vacationSearchSlice';
import hotelSearchSlice from "./Slices/hotelSearchSlice";
import popUpSliceReducer from "./Slices/popUpSliceReducer";
import cruiseSearchSlice from "./Slices/cruiseSearchSlice";
import vacationSliceReducer from "./Slices/vacationSliceReducer";
import ratingSliceReducer from "./Slices/ratingSliceReducer";
import sortSliceReducer from "./Slices/sortSliceReducer";
import vacationDealsSliceReducer from "./Slices/vacationDealsSliceReducer";
import shortListSliceReducer from "./Slices/shortListSliceReducer";
import citySliceReducer from "./Slices/citySliceReducer";
import hotelSliceReducer from "./Slices/hotelSliceReducer";
import cruiseSliceReducer from "./Slices/cruiseSliceReducer";
import citySearchSlice from "./Slices/citySearchSlice";
import cartSliceReducer from "./Slices/cartSliceReducer";
import profileSliceReducer from "./Slices/profileSliceReducer";
import cruiseDealSliceReducer from "./Slices/cruiseDealSliceReducer";





const Store = configureStore({
    reducer: {
        session: sessionSliceReducer,
        flights: flightSliceReducer,
        flightSearch: flightSearchReducer,
        vacationSearch: vacationSearchReducer,
        hotelSearch: hotelSearchSlice,
        cruiseSearch: cruiseSearchSlice,
        popUp: popUpSliceReducer,
        vacations: vacationSliceReducer,
        ratings: ratingSliceReducer,
        sort: sortSliceReducer,
        vacationDeals: vacationDealsSliceReducer,
        shortList: shortListSliceReducer,
        city: citySliceReducer,
        hotels: hotelSliceReducer,
        cruise: cruiseSliceReducer,
        citySearch: citySearchSlice,
        cart: cartSliceReducer,
        profile: profileSliceReducer,
        cruiseDeal: cruiseDealSliceReducer,
    
        

       


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default Store