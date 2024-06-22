import { createSlice } from "@reduxjs/toolkit";
import { fetchVacationAsync, createVacationAsync, fetchVacationByIdAsync, updatedVacationAsync, deleteVacationAsync } from "./fetchVacationSliceAsync";


const vacationSlice = createSlice({
    name: "vacation",
    initialState: {
        vacations: {},
        vacation: {},
        loading: false,
        error: null
    },
    reducers: {
        setSorted: (state, action) => {
            const vacation = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.vacations = vacation
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVacationAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchVacationAsync.fulfilled, (state, action) => {
            state.loading = false
            const vacation = action.payload.reduce((acc, cur) => {
                const randomReviews = Math.floor(Math.random() * 10000)
                const object = { ...cur, randomReviews }
                acc[cur._id] = object
                return acc
            }, {})
            state.vacations = vacation
        })
        builder.addCase(fetchVacationAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })



        builder.addCase(createVacationAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createVacationAsync.fulfilled, (state, action) => {
            state.loading = false
            state.vacations[action.payload._id] = action.payload
        })
        builder.addCase(createVacationAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(fetchVacationByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchVacationByIdAsync.fulfilled, (state, action) => {
            state.loading = false
            state.vacation = action.payload
        })
        builder.addCase(fetchVacationByIdAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


            .addCase(updatedVacationAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedVacationAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.vacation = null
                state.vacations[action.payload._id] = action.payload

            })
            .addCase(updatedVacationAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteVacationAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVacationAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.vacations[action.payload]


            })
            .addCase(deleteVacationAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})
export const { setSorted } = vacationSlice.actions;

export default vacationSlice.reducer;