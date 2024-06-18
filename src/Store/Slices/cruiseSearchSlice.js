import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cruiseType: '',
  departure: '',
  destination: '',
  departureTime: '',
  duration: '',
  guests: {
    adults: 2,
    children: 0,
    cruiseDuration:'',
  },
};

const cruiseSearchSlice = createSlice({
  name: 'cruiseSearch',
  initialState,
  reducers: {
    setCruiseType(state, action) {
      state.cruiseType = action.payload;
    },
    setDeparture(state, action) {
      state.departure = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setDepartureTime(state, action) {
      state.departureTime = action.payload;
    },
    setDuration(state, action) {
        state.duration = action.payload;
      },

    setGuests(state, action) {
      state.guests = action.payload;
    },
    setClearSearch(state) {
      return initialState;
    },

    setCruiseDuration(state, action) {
      state.duration = action.payload;
    },
  },
});

export const { setCruiseType, setDeparture, setDestination, setDepartureTime, setGuests, setCruiseDuration, setClearSearch } = cruiseSearchSlice.actions;

export default cruiseSearchSlice.reducer;