import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchAttractionAsync } from "./fetchSearchSliceAsync"

const initialState = {
  attractions: [],
  destination: '',
  checkInDate: '',
  checkOutDate: '',

};

const attractionSearchSlice = createSlice({
  name: 'attractionSearch',
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

  },

  extraReducers: (builder) => {
    builder.addCase(fetchSearchAttractionAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchSearchAttractionAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.attractions = Array.isArray(action.payload) ? action.payload : []; 
    });

    builder.addCase(fetchSearchAttractionAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },

});

export const {
  setDestination,
  setCheckInDate,
  setCheckOutDate,
} = attractionSearchSlice.actions;

export default attractionSearchSlice.reducer;
