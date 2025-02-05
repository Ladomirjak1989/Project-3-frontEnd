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
        error: null,


    },
    reducers: {
        setCartHotelWithUser: (state, action) => {
            state.cartHotel = action.payload
            state.countCart = action.payload.length
        },

        setRemoveCart: (state) => {
            state.cartHotel = [];

            state.countCart = 0;
            const hotels = Object.values(state.hotels).map(item => {
                if (item.isCart) {
                    item.isCart = false
                }
                return item
            })
            state.hotels = hotels.reduce((acc, cur) => {
                acc[cur.hotelId] = cur;
                return acc;
            }, {});


        },


        setRemoveHotelFromCart: (state, action) => {
            state.cartHotel = state.cartHotel.filter(item => item.hotelId !== action.payload);
            state.countCart -= 1;
            if (state.hotels[action.payload]) {
                state.hotels[action.payload].isCart = false;
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotelAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchHotelAsync.fulfilled, (state, action) => {

                state.loading = false
                let counter = 0
                let countCart = 0
                const cartStorage = JSON.parse(localStorage.getItem("cart"))
                const storage = JSON.parse(localStorage.getItem("favorite"))
                const data = action.payload.map(item => {

                    // Generate a random number between 2 and 5
                    const randomRating = (Math.random() * (5 - 2) + 2).toFixed(1);

                    const randomReviews = Math.floor(Math.random() * 10000)
                    if (cartStorage && cartStorage.includes(item.hotelId)) {
                        item.isCart = true
                        countCart += 1
                    } else {
                        item.isCart = false
                    }

                    if (storage && storage.includes(item.hotelId)) {
                        item.isFavorite = true
                        counter += 1
                    } else {
                        item.isFavorite = false
                    }
                    const object = { ...item, randomReviews, rating: randomRating }
                    return object
                })
                const hotel = data.reduce((acc, cur) => {
                    acc[cur.hotelId] = cur
                    return acc
                }, {})

                state.favoriteHotel = data.filter(item => item.isFavorite)
                state.cartHotel = data.filter(item => item.isCart)
                state.countFavorite = counter
                state.countCart = countCart
                state.hotels = hotel
            })
            .addCase(fetchHotelAsync.rejected, (state, action) => {

                state.loading = false
                state.error = action.payload
            })



            .addCase(createHotelAsync.pending, (state) => {
                state.loading = true

                state.error = null
            })
            .addCase(createHotelAsync.fulfilled, (state, action) => {
                state.loading = false
                state.hotels[action.payload._id] = action.payload
            })
            .addCase(createHotelAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })



            .addCase(fetchHotelByIdAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchHotelByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.hotel = action.payload
            })
            .addCase(fetchHotelByIdAsync.rejected, (state, action) => {
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
            })



    }
})
export const { setSortedHotel, setFavorite, setCartHotel, setRemoveCart, setRemoveHotelFromCart, setCartHotelWithUser } = hotelSlice.actions;

export default hotelSlice.reducer;






