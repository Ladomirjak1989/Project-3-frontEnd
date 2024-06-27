import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchCityAsync } from './fetchSearchSliceAsync';


const initialState = {
  cities:{},
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

const citySearchSlice = createSlice({
  name: 'citySearch',
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
    builder.addCase(fetchSearchCityAsync.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchSearchCityAsync.fulfilled, (state, action) => {
        state.loading = false
        const cities = action.payload.reduce((acc, cur) => {
          acc[cur._id] = cur
            return acc
        }, {})
        state.cities = cities
    })
    builder.addCase(fetchSearchCityAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});


export const { setDeparture, setDestination, setDepartureDate, setDuration, setReturnDate, setGuests, setClearSearch } = citySearchSlice.actions;

export default citySearchSlice.reducer;