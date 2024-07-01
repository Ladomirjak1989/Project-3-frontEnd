import { createSlice } from "@reduxjs/toolkit";
import { fetchVacationAsync, createVacationAsync, fetchVacationByIdAsync, updatedVacationAsync, deleteVacationAsync } from "./fetchVacationSliceAsync";


const vacationSlice = createSlice({
    name: "vacation",
    initialState: {
        vacations: {},
        vacation: {},
        favoriteVacation: [],
        cartVacation: [],
        countCart: 0,
        countFavorite: 0,
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
        },
        setFavorite: (state, action) => {
            const vacationIndex = action.payload;
            if (state.vacations[vacationIndex]) {
                if (state.vacations[vacationIndex].isFavorite) {
                    state.vacations[vacationIndex].isFavorite = false;
                    state.countFavorite -= 1;
                    state.favoriteVacation = state.favoriteVacation.filter(item => item._id !== state.vacations[vacationIndex]._id);
                } else {
                    state.vacations[vacationIndex].isFavorite = true;
                    state.countFavorite += 1;
                    state.favoriteVacation = [...state.favoriteVacation, state.vacations[vacationIndex]];
                }
            }
        },

        setCart: (state, action) => {
            const vacationIndex = action.payload;
            if (state.vacations[vacationIndex]) {
                if (state.vacations[vacationIndex].isCart) {
                    state.vacations[vacationIndex].isCart = false;
                    state.countCart -= 1;
                    state.cartVacation = state.cartVacation.filter(item => item._id !== state.vacations[vacationIndex]._id);
                } else {
                    state.vacations[vacationIndex].isCart = true;
                    state.countCart += 1;
                    state.cartVacation = [...state.cartVacation, state.vacations[vacationIndex]];
                }
            }
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVacationAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchVacationAsync.fulfilled, (state, action) => {

            state.loading = false
            let counter = 0
            let countCart = 0
            const cartStorage = JSON.parse(localStorage.getItem("cart"))
            const storage = JSON.parse(localStorage.getItem("favorite"))
            const data = action.payload.map(item => {
                const randomReviews = Math.floor(Math.random() * 10000)
                
                if (cartStorage && cartStorage.includes(item._id)) {
                    item.isCart = true
                    countCart += 1
                } else {
                    item.isCart = false
                }
               
               
                if (storage && storage.includes(item._id)) {
                    item.isFavorite = true

                    counter += 1
                } else {
                    item.isFavorite = false
                }
                const object = { ...item, randomReviews }
                return object
            })
            const vacation = data.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.favoriteVacation = data.filter(item=>item.isFavorite)
            state.cartVacation = data.filter(item => item.isCart)
            state.countFavorite = counter
            state.countCart = countCart
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
export const { setSorted, setFavorite } = vacationSlice.actions;

export default vacationSlice.reducer;