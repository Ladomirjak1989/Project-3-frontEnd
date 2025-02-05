import { createSlice } from '@reduxjs/toolkit';

const initialState = {params: "Our recommended"};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
     
      state.params = action.payload},

  },
});

export const { setSortOption } = sortSlice.actions;

export default sortSlice.reducer;
