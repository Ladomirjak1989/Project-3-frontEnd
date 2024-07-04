import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteAsync, fetchGetUserByIdAsync, fetchRemoveCartAsync, fetchRemoveElementFromCartAsync, fetchSessionAsync, fetchSignUpAsync, fetchUpdateAsync, fetchUpdatePasswordAsync, fetchUpdateProfileAsync } from "./fetchSessionSliceAsync";


const sessionSlice = createSlice({
    name: "session",
    initialState: {
        token: null,
        user: null,
        loading: false,
        error: null,
        totalPrice: 0,
        order: [],
        firstName: "",
        lastName: "",
        email: "",
        message:"",
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
        setOrder: (state, action) => {
            state.totalPrice = action.payload.totalPrice
            state.order = action.payload.order
        },

        setFirstName: (state, action) => {
            state.firstName = action.payload

        },

        setLastName: (state, action) => {
            state.lastName = action.payload

        },
        setEmail: (state, action) => {
            state.email = action.payload

        },
        setUser: (state, action) => {
            state.user = action.payload

        },
        setToken: (state, action) => {
            state.token = action.payload

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSessionAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchSessionAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken

        })
        builder.addCase(fetchSessionAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload


        })



        builder.addCase(fetchSignUpAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchSignUpAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken

        })
        builder.addCase(fetchSignUpAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })


        builder.addCase(fetchUpdateAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchUpdateAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user



        })
        builder.addCase(fetchUpdateAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })

        builder.addCase(fetchRemoveCartAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchRemoveCartAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user



        })
        builder.addCase(fetchRemoveCartAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })



        builder.addCase(fetchRemoveElementFromCartAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchRemoveElementFromCartAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user



        })
        builder.addCase(fetchRemoveElementFromCartAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })

        builder.addCase(fetchGetUserByIdAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchGetUserByIdAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken


        })
        builder.addCase(fetchGetUserByIdAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })

        builder.addCase(fetchDeleteAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchDeleteAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = null
            state.token = null


        })
        builder.addCase(fetchDeleteAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })

        builder.addCase(fetchUpdateProfileAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchUpdateProfileAsync.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.authToken


        })
        builder.addCase(fetchUpdateProfileAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })


        builder.addCase(fetchUpdatePasswordAsync.pending, (state) => {
            state.loading = true
            state.error = null

        })
        builder.addCase(fetchUpdatePasswordAsync.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload


        })
        builder.addCase(fetchUpdatePasswordAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

        })


    }
})

export const { logout, setOrder, setFirstName, setLastName, setEmail, setUser, setToken } = sessionSlice.actions;
export default sessionSlice.reducer;