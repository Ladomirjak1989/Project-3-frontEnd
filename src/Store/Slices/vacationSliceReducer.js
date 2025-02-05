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

        cleanOne: (state, action) => {
            state.vacation = action.payload
        },


        setSortedVacation: (state, action) => {
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

        setCartVacation: (state, action) => {
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
        },

        setCartVacationWithUser: (state, action) => {
            state.cartVacation = action.payload
            state.countCart = action.payload.length

        },

        setRemoveCart: (state) => {
            state.cartVacation = [];
            state.countCart = 0;
            const vacations = Object.values(state.vacations).map(item => {
                if (item.isCart) {
                    item.isCart = false
                }
                return item
            })
            state.vacations = vacations.reduce((acc, cur) => {
                acc[cur._id] = cur;
                return acc;
            }, {});

        },
        setRemoveVacationFromCart: (state, action) => {
            state.cartVacation = state.cartVacation.filter(item => item._id !== action.payload);
            state.countCart -= 1;
            if (state.vacations[action.payload]) {
                state.vacations[action.payload].isCart = false;
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacationAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchVacationAsync.fulfilled, (state, action) => {
                state.loading = false
                let counter = 0
                let countCart = 0
                const cartStorage = JSON.parse(localStorage.getItem("cart"))
                const storage = JSON.parse(localStorage.getItem("favorite"))
                const data = action.payload.map(item => {
                    const randomRating = (Math.random() * (5 - 2) + 2).toFixed(1);
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
                    const object = { ...item, randomReviews, rating: randomRating }
                    return object
                })
                const vacation = data.reduce((acc, cur) => {
                    acc[cur._id] = cur
                    return acc
                }, {})
                state.favoriteVacation = data.filter(item => item.isFavorite)
                state.cartVacation = data.filter(item => item.isCart)
                state.countFavorite = counter
                state.countCart = countCart
                state.vacations = vacation
            })
            .addCase(fetchVacationAsync.rejected, (state, action) => {

                state.loading = false
                state.error = action.payload
            })

            // .addCase(fetchVacationAsync.fulfilled, (state, action) => {
            //     console.log("Fetched data:", action.payload); // Лог для діагностики
            
            //     if (!Array.isArray(action.payload)) {
            //         console.error("❌ fetchVacationAsync повернув НЕ масив:", action.payload);
            //         state.vacations = {}; // Уникнути помилок
            //         return;
            //     }
            
            //     state.loading = false;
            //     let counter = 0;
            //     let countCart = 0;
            //     const cartStorage = JSON.parse(localStorage.getItem("cart"));
            //     const storage = JSON.parse(localStorage.getItem("favorite"));
            
            //     const data = action.payload.map(item => {
            //         const randomRating = (Math.random() * (5 - 2) + 2).toFixed(1);
            //         const randomReviews = Math.floor(Math.random() * 10000);
            
            //         item.isCart = cartStorage && cartStorage.includes(item._id);
            //         if (item.isCart) countCart += 1;
            
            //         item.isFavorite = storage && storage.includes(item._id);
            //         if (item.isFavorite) counter += 1;
            
            //         return { ...item, randomReviews, rating: randomRating };
            //     });
            
            //     const vacation = data.reduce((acc, cur) => {
            //         acc[cur._id] = cur;
            //         return acc;
            //     }, {});
            
            //     state.favoriteVacation = data.filter(item => item.isFavorite);
            //     state.cartVacation = data.filter(item => item.isCart);
            //     state.countFavorite = counter;
            //     state.countCart = countCart;
            //     state.vacations = vacation;
            // })
            



            .addCase(createVacationAsync.pending, (state) => {
                state.loading = true

                state.error = null
            })
            .addCase(createVacationAsync.fulfilled, (state, action) => {
                state.loading = false
                state.vacations[action.payload._id] = action.payload
            })
            .addCase(createVacationAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })



            .addCase(fetchVacationByIdAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchVacationByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.vacation = action.payload
            })
            .addCase(fetchVacationByIdAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(updatedVacationAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedVacationAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.vacation = {}
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
export const { setSorted, setFavorite, setCartVacation, cleanOne, setRemoveCart, setRemoveVacationFromCart, setCartVacationWithUser } = vacationSlice.actions;

export default vacationSlice.reducer;