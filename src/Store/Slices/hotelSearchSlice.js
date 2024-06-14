import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setaddRoom(state) {
      state.rooms.push({ adults: 2, children: 0 });
    },
    setremoveRoom(state, action) {
      state.rooms = state.rooms.filter((_, index) => index !== action.payload);
    },
    setGuests(state, action) {
      const { index, adults, children } = action.payload;
      state.rooms[index] = { adults, children };
    },
    setclearAll(state) {
      state.rooms = [{ adults: 2, children: 0 }];
      state.destination = '';
      state.checkInDate = '';
      state.checkOutDate = '';
    }
  }
});

export const {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
  setRooms,
  setaddRoom,
  setremoveRoom,
  setGuests,
  setclearAll
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
