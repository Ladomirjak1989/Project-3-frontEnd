import { createSlice } from '@reduxjs/toolkit';

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
    }
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
