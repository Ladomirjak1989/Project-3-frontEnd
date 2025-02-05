import { createSlice } from '@reduxjs/toolkit';
import { fetchCruiseDealAsync } from './fetchCruiseSliceAsync';

const initialState = {
  deals: [

  ]

};

const cruiseDealSlice = createSlice({
  name: 'cruiseDeal',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCruiseDealAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCruiseDealAsync.fulfilled, (state, action) => {
        state.loading = false

        state.deals = action.payload
      })
      .addCase(fetchCruiseDealAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
});

export const selectCruiseDeal = (state) => state.cruiseDeal.deals;

export default cruiseDealSlice.reducer;
