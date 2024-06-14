import { createSlice } from "@reduxjs/toolkit";
import { fetchSessionAsync, fetchSignUpAsync } from "./fetchSessionSliceAsync";


const sessionSlice = createSlice({
    name: "session",
    initialState: {
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSessionAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchSessionAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken

        })
        builder.addCase(fetchSessionAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload


        })



        builder.addCase(fetchSignUpAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchSignUpAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken

        })
        builder.addCase(fetchSignUpAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })
    }
})

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer;