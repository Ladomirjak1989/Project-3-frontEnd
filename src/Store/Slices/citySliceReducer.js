import { createSlice } from "@reduxjs/toolkit";
import { fetchCityAsync, createCityAsync, fetchCityByIdAsync, updatedCityAsync, deleteCityAsync } from "./fetchCitySliceReducer";


const citySlice = createSlice({
    name: "city",
    initialState: {
        cities: {},
        city: {},
        loading: false,
        error: null
    },
    reducers: {
        setSorted: (state, action) => {
            const city = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.cities = city
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCityAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCityAsync.fulfilled, (state, action) => {

            state.loading = false




            const city = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})


            state.cities = city
        })
        builder.addCase(fetchCityAsync.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
        })



            .addCase(createCityAsync.pending, (state) => {
                state.loading = true

                state.error = null
            })
            .addCase(createCityAsync.fulfilled, (state, action) => {
                state.loading = false
                state.cities[action.payload.id] = action.payload
            })
            .addCase(createCityAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })



            .addCase(fetchCityByIdAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCityByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.city = action.payload
            })
            .addCase(fetchCityByIdAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(updatedCityAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.city = null
                state.cities[action.payload.id] = action.payload

            })
            .addCase(updatedCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteCityAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.cities[action.payload]


            })
            .addCase(deleteCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})
export const { setSorted } = citySlice.actions;

export default citySlice.reducer;