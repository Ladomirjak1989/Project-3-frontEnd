import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  limit: 10,
};

const shortlistSlice = createSlice({
  name: 'shortlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.items.length < state.limit) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearShortlist: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, clearShortlist } = shortlistSlice.actions;
export default shortlistSlice.reducer;
