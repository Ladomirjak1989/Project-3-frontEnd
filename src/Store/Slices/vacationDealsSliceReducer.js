import { createSlice } from '@reduxjs/toolkit';
import { fetchVacationDealsAsync } from './fetchVacationSliceAsync';

const initialState = {
  deals: [

  ]

};

const vacationDealsSlice = createSlice({
  name: 'vacationDeals',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVacationDealsAsync.pending, (state) => {
        state.loading = true
        state.error = null
    })
    builder.addCase(fetchVacationDealsAsync.fulfilled, (state, action) => {
        state.loading = false
        
        state.deals = action.payload
    })
    builder.addCase(fetchVacationDealsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

export const selectVacationDeals = (state) => state.vacationDeals.deals;

export default vacationDealsSlice.reducer;
