import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchHotelAsync } from './fetchSearchSliceAsync';

const initialState = {
  hotels:{},
  destination: '',
  checkInDate: '',
  checkOutDate: '',
  rooms: [{ adults: 2, children: 0 }]
  
};

const hotelSearchSlice = createSlice({
  name: 'hotelSearch',
  initialState,
  reducers: {
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setCheckInDate(state, action) {
      state.checkInDate = action.payload;
    },
    setCheckOutDate(state, action) {
      state.checkOutDate = action.payload;
    },
    
    setGuests(state, action) {
      const { index, adults, children } = action.payload;
      state.rooms[index] = { adults, children };
    },
    
    setClearSearch(state) {
      return initialState;
    },
  },
    extraReducers: (builder) => {
      builder.addCase(fetchSearchHotelAsync.pending, (state) => {
          state.loading = true
          state.error = null
      })
      builder.addCase(fetchSearchHotelAsync.fulfilled, (state, action) => {
          state.loading = false
          const hotels = action.payload.reduce((acc, cur) => {
              acc[cur._id] = cur
              return acc
          }, {})
          state.hotels = hotels
      })
      builder.addCase(fetchSearchHotelAsync.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
      })
  }
});

export const {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
  setClearSearch
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
