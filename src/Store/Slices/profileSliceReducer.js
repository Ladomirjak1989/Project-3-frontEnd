import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    email: '',
    password: '',
    confirmPassword: "",
    purchases: [],
  },
  reducers: {
    updateProfile: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    changePassword: (state, action) => {
      console.log('Password changed', action.payload);
    }
  }
});

export const { updateProfile, changePassword } = profileSlice.actions;

export default profileSlice.reducer;

