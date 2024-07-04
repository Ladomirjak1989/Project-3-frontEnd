import { createSlice } from "@reduxjs/toolkit";
import { fetchFlightAsync, createFlightAsync, fetchFlightByIdAsync, updatedFlightAsync, deleteFlightAsync } from "./fetchFlightSliceAsync";

const flightSlice = createSlice({
    name: "flight",
    initialState: {
        flights: {},
        flight: null,
        cartFlight: [],
        countCart: 0,
        loading: false,
        error: null
    },
    reducers: {
        setCartFlight: (state, action) => {
            const flightIndex = action.payload;
            if (state.flights[flightIndex]) {
                if (state.flights[flightIndex].isCart) {
                    state.flights[flightIndex].isCart = false;
                    state.countCart -= 1;
                    state.cartFlight = state.cartFlight.filter(item => item._id !== state.flights[flightIndex]._id);
                } else {
                    state.flights[flightIndex].isCart = true;
                    state.countCart += 1;
                    state.cartFlight = [...state.cartFlight, state.flights[flightIndex]];
                }
            }
        },

        setRemoveCart: (state) => {
            state.cartFlight = [];
            state.countCart = 0;
            const flights = Object.values(state.flights).map(item=>{
                if (item.isCart){
                    item.isCart=false
                }
                return item
            })
            state.flights= flights.reduce((acc, cur) => {
                acc[cur._id] = cur;
                return acc;
            }, {});

        },

        setRemoveFlightFromCart: (state, action) => {
            state.cartFlight = state.cartFlight.filter(item => item._id !== action.payload);
            state.countCart -= 1;
            if (state.flights[action.payload]) {
                state.flights[action.payload].isCart = false;
            }
        },
        setCartFlightWithUser: (state, action) => {
            state.cartFlight = action.payload 
            state.countCart = action.payload.length 
  
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlightAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlightAsync.fulfilled, (state, action) => {
                state.loading = false;
                let countCart = 0;
                const cartStorage = JSON.parse(localStorage.getItem("cart"));

                const data = action.payload.map(item => {
                    if (cartStorage && cartStorage.includes(item._id)) {
                        item.isCart = true;
                        countCart += 1;
                    } else {
                        item.isCart = false;
                    }
                    return item;
                });

                const flight = data.reduce((acc, cur) => {
                    acc[cur._id] = cur;
                    return acc;
                }, {});

                state.cartFlight = data.filter(item => item.isCart);
                state.countCart = countCart;
                state.flights = flight;
            })
            .addCase(fetchFlightAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFlightAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFlightAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.flights[action.payload._id] = action.payload;
            })
            .addCase(createFlightAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFlightByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlightByIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.flight = action.payload;
            })
            .addCase(fetchFlightByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatedFlightAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedFlightAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.flight = null;
                state.flights[action.payload._id] = action.payload;
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
                delete state.flights[action.payload];
            })
            .addCase(deleteFlightAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setCartFlight, setRemoveCart, setRemoveFlightFromCart, setCartFlightWithUser } = flightSlice.actions;

export default flightSlice.reducer;
