import { createSlice } from "@reduxjs/toolkit";
import { fetchCruiseAsync, createCruiseAsync, fetchCruiseByIdAsync, updatedCruiseAsync, deleteCruiseAsync } from "./fetchCruiseSliceAsync";


const cruiseSlice = createSlice({
    name: "cruise",
    initialState: {
        cruises: {},
        cruise: {},
        favoriteCruise: [],
        cartCruise: [],
        countCart: 0,
        countFavorite: 0,
        loading: false,
        error: null
    },
    reducers: {
        
        setFavorite: (state, action) => {
            const cruiseIndex = action.payload;
            if (state.cruises[cruiseIndex]) {
                if (state.cruises[cruiseIndex].isFavorite) {
                    state.cruises[cruiseIndex].isFavorite = false;
                    state.countFavorite -= 1;
                    state.favoriteCruise = state.favoriteCruise.filter(item => item._id !== state.cruises[cruiseIndex]._id);
                } else {
                    state.cruises[cruiseIndex].isFavorite = true;
                    state.countFavorite += 1;
                    state.favoriteCruise = [...state.favoriteCruise, state.cruises[cruiseIndex]];
                }
            }
        },

        setCart: (state, action) => {
            const cruiseIndex = action.payload;
            if (state.cruises[cruiseIndex]) {
                if (state.cruises[cruiseIndex].isCart) {
                    state.cruises[cruiseIndex].isCart = false;
                    state.countCart -= 1;
                    state.cartCruise = state.cartCruise.filter(item => item._id !== state.cruises[cruiseIndex]._id);
                } else {
                    state.cruises[cruiseIndex].isCart = true;
                    state.countCart += 1;
                    state.cartCruise = [...state.cartCruise, state.cruises[cruiseIndex]];
                }
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCruiseAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCruiseAsync.fulfilled, (state, action) => {

            state.loading = false
            let counter = 0
            let countCart = 0
            const cartStorage = JSON.parse(localStorage.getItem("cart"))
            const storage = JSON.parse(localStorage.getItem("favorite"))
            const data = action.payload.map(item => {
                const randomReviews = Math.floor(Math.random() * 1000)

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
            const cruise = data.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.favoriteCruise = data.filter(item => item.isFavorite)
            state.cartCruise = data.filter(item => item.isCart)
            state.countFavorite = counter
            state.countCart = countCart
            state.cruises = cruise
        })
        builder.addCase(fetchCruiseAsync.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
        })



        builder.addCase(createCruiseAsync.pending, (state) => {
            state.loading = true

            state.error = null
        })
        builder.addCase(createCruiseAsync.fulfilled, (state, action) => {
            state.loading = false
            state.cruises[action.payload._id] = action.payload
        })
        builder.addCase(createCruiseAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(fetchCruiseByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCruiseByIdAsync.fulfilled, (state, action) => {
            state.loading = false
           
            state.cruise = action.payload
        })
        builder.addCase(fetchCruiseByIdAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


            .addCase(updatedCruiseAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedCruiseAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cruise = null
                state.cruises[action.payload._id] = action.payload

            })
            .addCase(updatedCruiseAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteCruiseAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCruiseAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.cruises[action.payload]


            })
            .addCase(deleteCruiseAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})
export const { setFavorite } = cruiseSlice.actions;   //setSortedCruise

export default cruiseSlice.reducer;