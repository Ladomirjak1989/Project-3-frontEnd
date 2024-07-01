import { createSlice } from "@reduxjs/toolkit";
import { fetchHotelAsync, createHotelAsync, fetchHotelByIdAsync, updatedHotelAsync, deleteHotelAsync } from "./fetchHotelSliceAsync";


const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotels: {},
        hotel: {},
        favoriteHotel: [],
        cartHotel: [],
        countCart: 0,
        countFavorite: 0,
        loading: false,
        error: null
    },
    reducers: {
        setSortedHotel: (state, action) => {
            const hotel = action.payload.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})

            state.hotels = hotel
        },
        setFavorite: (state, action) => {
            const hotelIndex = action.payload;
            if (state.hotels[hotelIndex]) {
                if (state.hotels[hotelIndex].isFavorite) {
                    state.hotels[hotelIndex].isFavorite = false;
                    state.countFavorite -= 1;
                    state.favoriteHotel = state.favoriteHotel.filter(item => item._id !== state.hotels[hotelIndex]._id);
                } else {
                    state.hotels[hotelIndex].isFavorite = true;
                    state.countFavorite += 1;
                    state.favoriteHotel = [...state.favoriteHotel, state.hotels[hotelIndex]];
                }
            }
        },

        setCartHotel: (state, action) => {
            const hotelIndex = action.payload;
            if (state.hotels[hotelIndex]) {
                if (state.hotels[hotelIndex].isCart) {
                    state.hotels[hotelIndex].isCart = false;
                    state.countCart -= 1;
                    state.cartHotel = state.cartHotel.filter(item => item._id !== state.hotels[hotelIndex]._id);
                } else {
                    state.hotels[hotelIndex].isCart = true;
                    state.countCart += 1;
                    state.cartHotel = [...state.cartHotel, state.hotels[hotelIndex]];
                }
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHotelAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchHotelAsync.fulfilled, (state, action) => {

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
            const hotel = data.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
            state.favoriteHotel = data.filter(item => item.isFavorite)
            state.cartHotel = data.filter(item => item.isCart)
            state.countFavorite = counter
            state.countCart = countCart
            state.hotels = hotel
        })
        builder.addCase(fetchHotelAsync.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
        })



        builder.addCase(createHotelAsync.pending, (state) => {
            state.loading = true

            state.error = null
        })
        builder.addCase(createHotelAsync.fulfilled, (state, action) => {
            state.loading = false
            state.hotels[action.payload._id] = action.payload
        })
        builder.addCase(createHotelAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(fetchHotelByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchHotelByIdAsync.fulfilled, (state, action) => {
            state.loading = false
            state.hotel = action.payload
        })
        builder.addCase(fetchHotelByIdAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })


            .addCase(updatedHotelAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedHotelAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.hotel = null
                state.hotels[action.payload._id] = action.payload

            })
            .addCase(updatedHotelAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteHotelAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteHotelAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.hotels[action.payload]


            })
            .addCase(deleteHotelAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})
export const { setSortedHotel, setFavorite, setCartHotel } = hotelSlice.actions;

export default hotelSlice.reducer;