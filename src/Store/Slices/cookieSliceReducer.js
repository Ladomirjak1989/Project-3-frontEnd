import { createSlice } from "@reduxjs/toolkit";
import { fetchCookieAsync, getCookieInfo } from "./fetchCookieSliceReducer";

const cookieSlice = createSlice({
    name: "cookie",
    initialState: {
        data: null,
        error: null,
        loading: false,
        cookiePopUp: true,
    },
    reducers: {
        resetCookieState: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
            state.cookiePopUp = false;
        },
        setCookiePopUp: (state, action) => {
            state.cookiePopUp = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchCookieAsync
            .addCase(fetchCookieAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCookieAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.cookiePopUp = !action.payload.cookiesAccepted;
            })
            .addCase(fetchCookieAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle getCookieInfo
            .addCase(getCookieInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCookieInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.cookiePopUp = !action.payload.cookiesAccepted;
            })
            .addCase(getCookieInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCookieState, setCookiePopUp } = cookieSlice.actions;
export default cookieSlice.reducer;
