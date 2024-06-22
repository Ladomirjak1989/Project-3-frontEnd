import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchVacationAsync } from './fetchSearchSliceAsync';


const initialState = {
  vacations:{},
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
  extraReducers: (builder) => {
    builder.addCase(fetchSearchVacationAsync.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchSearchVacationAsync.fulfilled, (state, action) => {
        state.loading = false
        const vacations = action.payload.reduce((acc, cur) => {
          const randomReviews = Math.floor(Math.random() * 10000)
          const object = { ...cur, randomReviews }
          acc[cur._id] = object
            return acc
        }, {})
        state.vacations = vacations
    })
    builder.addCase(fetchSearchVacationAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});


export const { setDeparture, setDestination, setDepartureDate, setDuration, setReturnDate, setGuests, setClearSearch } = vacationSearchSlice.actions;

export default vacationSearchSlice.reducer;