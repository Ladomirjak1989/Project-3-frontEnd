import { createSlice } from "@reduxjs/toolkit";
import { fetchFlightAsync, createFlightAsync, fetchFlightByIdAsync, updatedFlightAsync, deleteFlightAsync } from "./fetchFlightSliceAsync";


const flightSlice = createSlice({
    name: "flight",
    initialState: {
        flights: {},
        flight: null,
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
            // state.error = action.error.message;
        })



        builder.addCase(fetchFlightByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchFlightByIdAsync.fulfilled, (state, action) => {
            state.loading = false
            state.flight = action.payload
        })
        builder.addCase(fetchFlightByIdAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


            .addCase(updatedFlightAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedFlightAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.flight = null
                state.flights[action.payload._id] = action.payload
                // const index = state.flights.findIndex(flight => flight._id === action.payload._id);
                // if (index !== -1) {
                //     state.flights[index] = action.payload;
                // }
            })
            .addCase(updatedFlightAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteFlightAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFlightAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.flights[action.payload]

                // state.flights = state.flights.filter(flight => flight._id !== action.payload);
            })
            .addCase(deleteFlightAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})

export default flightSlice.reducer;