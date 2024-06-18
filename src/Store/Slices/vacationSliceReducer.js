import { createSlice } from "@reduxjs/toolkit";
import { fetchVacationAsync, createVacationAsync, fetchVacationByIdAsync, updatedVacationAsync, deleteVacationAsync  } from "./fetchVacationSliceAsync";


const VacationSlice = createSlice({
    name: "vacation",
    initialState: {
        Vacations: {},
        Vacation: null,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchVacationAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchVacationAsync.fulfilled, (state, action) => {
            state.loading = false
            const Vacation = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.Vacations = Vacation
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
            state.Vacations[action.payload._id] = action.payload
        })
        builder.addCase(createVacationAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            // state.error = action.error.message;
        })



        builder.addCase(fetchVacationByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchVacationByIdAsync.fulfilled, (state, action) => {
            state.loading = false
            state.Vacation = action.payload
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
            state.Vacation = null
            state.Vacations[action.payload._id] = action.payload
            // const index = state.Vacations.findIndex(Vacation => Vacation._id === action.payload._id);
            // if (index !== -1) {
            //     state.Vacations[index] = action.payload;
            // }
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
            delete state.Vacations[action.payload]

            // state.Vacations = state.Vacations.filter(Vacation => Vacation._id !== action.payload);
        })
        .addCase(deleteVacationAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export default VacationSlice.reducer;