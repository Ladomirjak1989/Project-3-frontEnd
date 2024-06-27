import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchCruiseAsync } from './fetchSearchSliceAsync';


const initialState = {
  cruise: {},
  cruiseType: '',
  departure: '',
  destination: '',
  departureTime: '',
  duration: '',
  guests: {
    adults: "",
    children: "",
  
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
      state.guests.adults = action.payload;
    },
    setClearSearch(state) {
      return initialState;
    },

    setCruiseDuration(state, action) {
      state.duration = action.payload;
    },

  },


    extraReducers: (builder) => {
      builder.addCase(fetchSearchCruiseAsync.pending, (state) => {
          state.loading = true
          state.error = null
      })
      builder.addCase(fetchSearchCruiseAsync.fulfilled, (state, action) => {
          state.loading = false
          const cruise = action.payload.reduce((acc, cur) => {
            acc[cur._id] = cur
              return acc
          }, {})
      
          state.cruise = cruise
      })
      builder.addCase(fetchSearchCruiseAsync.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
      })
    
  },
});

export const { setCruiseType, setDeparture, setDestination, setDepartureTime, setGuests, setCruiseDuration, setClearSearch } = cruiseSearchSlice.actions;

export default cruiseSearchSlice.reducer;