import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating: (state, action) => {
      const { id, rating } = action.payload;
      state[id] = rating;
    },
  },
});

export const { setRating } = ratingSlice.actions;

export default ratingSlice.reducer;
