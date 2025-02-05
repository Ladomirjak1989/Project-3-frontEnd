import { createSlice } from "@reduxjs/toolkit";
import { fetchAttractionAsync, createAttractionAsync, fetchAttractionByIdAsync, updatedAttractionAsync, deleteAttractionAsync } from "./fetchAttractionSliceAsync";


// Завантажуємо збережені вибрані готелі з localStorage
const savedFavoriteAttractions = JSON.parse(localStorage.getItem("favoriteAttractions")) || [];
const kindAttract = ['EXCURSIONS & DAY TRIPS', 'ATTRACTIONS & GUIDED TOURS', 'ACTIVITIES']

// Функція для оновлення localStorage
const updateLocalStorageFavoritesAttractions = (favorites) => {
    localStorage.setItem("favoriteAttractions", JSON.stringify(favorites));
};

const attractionSlice = createSlice({
    name: "attraction",
    initialState: {
        attractions: {},
        attraction: {},
        favoriteAttraction: savedFavoriteAttractions,
        cartAttraction: [],
        countCart: 0,
        countFavorite: savedFavoriteAttractions.length,
        loading: false,
        error: null,
        filteredAttractions: [],
        sortedAttraction: [],
        cathegory: "ALL",

    },

    reducers: {
        setCathegory: (state, action) => {
            state.cathegory = action.payload;
        },

        setSortedAttraction: (state, action) => {
            state.sortedAttraction = action.payload

        },

        setFavoriteAttraction: (state, action) => {
            const attractionId = action.payload;
            const attraction = state.attractions[attractionId];

            if (attraction) {
                if (attraction.isFavorite) {
                    // Видалити з улюблених
                    state.favoriteAttraction = state.favoriteAttraction.filter(item => item.id !== attractionId);
                    attraction.isFavorite = false;
                } else {
                    // Додати до улюблених
                    state.favoriteAttraction.push(attraction);
                    attraction.isFavorite = true;
                }

                // Оновлення лічильника
                state.countFavorite = state.favoriteAttraction.length;
                updateLocalStorageFavoritesAttractions(state.favoriteAttraction);
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttractionAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(fetchAttractionAsync.fulfilled, (state, action) => {
                state.loading = false;
                let counter = 0;
                const storage = JSON.parse(localStorage.getItem("favoriteAttractions")) || [];

                const data = action.payload.data.map(item => {
                    const randomReviews = Math.floor(Math.random() * 1000);
                    const randomRatings = (Math.random() * 3 + 2).toFixed(1);

                    if (storage.find(attraction => attraction.id === item.id)) {
                        item.isFavorite = true;
                        counter += 1;
                    } else {
                        item.isFavorite = false;
                    }

                    const kindOfAttractions = kindAttract[Math.floor(Math.random() * kindAttract.length)];

                    return { ...item, randomReviews, rating: randomRatings, kindOfAttractions };
                });

                state.attractions = data.reduce((acc, cur) => {
                    acc[cur.id] = cur;
                    return acc;
                }, {});

                state.favoriteAttraction = data.filter(item => item.isFavorite);
                state.countFavorite = counter;

                updateLocalStorageFavoritesAttractions(state.favoriteAttraction);
            })

            .addCase(fetchAttractionAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })



            .addCase(createAttractionAsync.pending, (state) => {
                state.loading = true

                state.error = null
            })
            .addCase(createAttractionAsync.fulfilled, (state, action) => {
                state.loading = false
                state.attractions[action.payload.id] = action.payload
            })
            .addCase(createAttractionAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })



            .addCase(fetchAttractionByIdAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAttractionByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.attraction = action.payload
            })
            .addCase(fetchAttractionByIdAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(updatedAttractionAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedAttractionAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.attraction = null
                state.attractions[action.payload.id] = action.payload

            })
            .addCase(updatedAttractionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(deleteAttractionAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAttractionAsync.fulfilled, (state, action) => {
                state.loading = false;
                delete state.attractions[action.payload]


            })
            .addCase(deleteAttractionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
})
export const { setSortedAttraction, setFavoriteAttraction, setCartAttraction, setRemoveCart, setRemoveAttractionFromCart, setCartAttractionWithUser, setCathegory } = attractionSlice.actions;

export default attractionSlice.reducer;



