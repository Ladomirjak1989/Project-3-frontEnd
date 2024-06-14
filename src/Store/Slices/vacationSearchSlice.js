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
    setdestination(state, action) {
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
  },
});

export const { setDeparture, setDestination, setDepartureDate, setReturnDate, setGuests } = vacationSearchSlice.actions;

export default vacationSearchSlice.reducer;