import { createSlice } from "@reduxjs/toolkit";


const languageSlice = createSlice({
    name: "language",
    initialState: {
        language: "en",
    },
    reducers: {
        setCurrentLang: (state, action) => {
          
            state.language = action.payload
        }
    },

});

export const { setCurrentLang } = languageSlice.actions;

export default languageSlice.reducer;