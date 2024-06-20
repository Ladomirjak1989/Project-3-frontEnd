import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popUp: null,
 
};

const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setPopUp(state, action) {
      state.popUp = action.payload;
 }
    }
});

export const {
  setPopUp,
  
} = popUpSlice.actions;

export default popUpSlice.reducer;
