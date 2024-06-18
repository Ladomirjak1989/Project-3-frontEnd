import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  departure: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  duration: '',
  guests: {
    adults: 2,
    children: 0,
  },
};

const vacationSearchSlice = createSlice({
  name: 'vacationSearch',
  initialState,
  reducers: {
    setDeparture(state, action) {
      state.departure = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action) {
      state.returnDate = action.payload;
    },
    setDuration(state, action) {
        state.duration = action.payload;
      },

    setGuests(state, action) {
      state.guests = action.payload;
    },
    setClearSearch(state) {
      return initialState;
    }
  },
});

export const { setDeparture, setDestination, setDepartureDate, setReturnDate, setGuests, setClearSearch } = vacationSearchSlice.actions;

export default vacationSearchSlice.reducer;