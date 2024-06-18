import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchFlightAsync } from './fetchSearchSliceAsync';

const initialState = {
  flights:{},
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
    setClearSearch(state) {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchFlightAsync.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchSearchFlightAsync.fulfilled, (state, action) => {
        state.loading = false
        const flight = action.payload.reduce((acc, cur) => {
            acc[cur._id] = cur
            return acc
        }, {})
        state.flights = flight
    })
    builder.addCase(fetchSearchFlightAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

export const { setFlyFrom, setFlyTo, setDeparting, setReturning, setPassengers, setTripType, setClearSearch } = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
