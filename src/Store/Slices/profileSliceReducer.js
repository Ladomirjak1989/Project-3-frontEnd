import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    }
  };


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { field, value } = action.payload;
      if (field.includes('address.')) {
        const addressField = field.split('.')[1];
        state.address[addressField] = value;
      } else {
        state[field] = value;
      }
    }
  }
});

export const { updateProfile, } = profileSlice.actions;
export default profileSlice.reducer;
