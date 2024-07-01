import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { username, email, password } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
    },
    createAccount: () => {
      alert('Account created!');
    },
    deleteAccount: () => {
      alert('Account deleted!');
    },
    signOut: () => {
      alert('Signed out!');
    },
  },
});

export const { updateProfile, createAccount, deleteAccount, signOut } = profileSlice.actions;
export default profileSlice.reducer;
