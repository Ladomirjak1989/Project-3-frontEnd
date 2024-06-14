import { createSlice } from "@reduxjs/toolkit";
import { fetchFlightAsync, createFlightAsync } from "./fetchFlightSliceAsync";


const flightSlice = createSlice({
    name: "flight",
    initialState: {
        flights: {},
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFlightAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchFlightAsync.fulfilled, (state, action) => {
            state.loading = false
            const flight = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.flights = flight
        })
        builder.addCase(fetchFlightAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })



        builder.addCase(createFlightAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createFlightAsync.fulfilled, (state, action) => {
            state.loading = false
            state.flights[action.payload._id] = action.payload
        })
        builder.addCase(createFlightAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export default flightSlice.reducer;