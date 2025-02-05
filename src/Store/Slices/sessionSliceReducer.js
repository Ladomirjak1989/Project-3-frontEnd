import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteAsync, fetchGetUserByIdAsync, fetchRemoveCartAsync, fetchRemoveElementFromCartAsync, fetchSessionAsync, fetchSignUpAsync, fetchTokenAmadeus, fetchUpdateAsync, fetchUpdatePasswordAsync, fetchUpdateProfileAsync, fetchUser, fetchLogout, fetchDeleteUserByMail, fetchConfirmEmail } from "./fetchSessionSliceAsync";


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
        message: "",
        amadeusToken: "",
        success: false,

    },
    reducers: {

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

        setSession: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.user = null;
            state.token = null;
            state.order = [];
            state.totalPrice = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessionAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchSessionAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.authToken

            })
            .addCase(fetchSessionAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload


            })



            .addCase(fetchSignUpAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchSignUpAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.authToken

            })
            .addCase(fetchSignUpAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })


            .addCase(fetchUpdateAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchUpdateAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user



            })
            .addCase(fetchUpdateAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            .addCase(fetchRemoveCartAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchRemoveCartAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                console.log(action.payload.user, 123)
                state.token = action.payload.token

            })
            .addCase(fetchRemoveCartAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            .addCase(fetchRemoveElementFromCartAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchRemoveElementFromCartAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user



            })
            .addCase(fetchRemoveElementFromCartAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            .addCase(fetchGetUserByIdAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchGetUserByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.authToken


            })
            .addCase(fetchGetUserByIdAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            .addCase(fetchDeleteAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchDeleteAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.token = null


            })
            .addCase(fetchDeleteAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })

            .addCase(fetchUpdateProfileAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchUpdateProfileAsync.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.message = action.payload.message


            })
            .addCase(fetchUpdateProfileAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })


            .addCase(fetchUpdatePasswordAsync.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchUpdatePasswordAsync.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload


            })
            .addCase(fetchUpdatePasswordAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })


            .addCase(fetchTokenAmadeus.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(fetchTokenAmadeus.fulfilled, (state, action) => {
                state.loading = false
                state.amadeusToken = action.payload


            })
            .addCase(fetchTokenAmadeus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

            })


            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(fetchLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.user = null;
                state.token = null;
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchDeleteUserByMail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(fetchDeleteUserByMail.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchDeleteUserByMail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchConfirmEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;

            })
            .addCase(fetchConfirmEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




    }
})

export const { setOrder, setFirstName, setLastName, setEmail, setUser, setToken, setSession, resetState } = sessionSlice.actions;
export default sessionSlice.reducer;




