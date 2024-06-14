import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flyFrom: '',
  flyTo: '',
  departing: '',
  returning: '',
  passengers: {
    adults: 2,
    children: 0,
  },
  tripType: 'return',
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setFlyFrom(state, action) {
      state.flyFrom = action.payload;
    },
    setFlyTo(state, action) {
      state.flyTo = action.payload;
    },
    setDeparting(state, action) {
      state.departing = action.payload;
    },
    setReturning(state, action) {
      state.returning = action.payload;
    },
    setPassengers(state, action) {
      state.passengers = action.payload;
    },
    setTripType(state, action) {
      state.tripType = action.payload;
    },
  },
});

export const { setFlyFrom, setFlyTo, setDeparting, setReturning, setPassengers, setTripType } = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
