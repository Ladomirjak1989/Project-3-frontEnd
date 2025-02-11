import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { AMADEUS_KEY, AMADEUS_SECRET_KEY, AMADEUS_URL, API_URL } from "../../utils/variables";


export const fetchSessionAsync = createAsyncThunk(
    "login/fetchLogin",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, formData, {
                withCredentials: true, // ✅ Дозволяє передавати cookies
            });

            localStorage.setItem("token", response.data.authToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const fetchGetUserByIdAsync = createAsyncThunk("user/fetchUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/users/${formData.id}`)
        localStorage.setItem("token", response.data.authToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})



export const fetchTokenAmadeus = createAsyncThunk("user/fetchToken", async (_, { rejectWithValue }) => {
    try {
        // const tokenResponse = await axios.post(`${import.meta.env.VITE_AMADEUS_API_URL}/v1/${import.meta.env.VITE_AMADEUS_API_GET_TOKEN_URL}`,
        const tokenResponse = await axios.post(`${AMADEUS_URL}/v1/security/oauth2/token`,

            new URLSearchParams({
                'grant_type': 'client_credentials',
                // 'client_id': import.meta.env.VITE_AMADEUS_API_KEY,
                // 'client_secret': import.meta.env.VITE_AMADEUS_API_SECRET,
                'client_id': AMADEUS_KEY,

                'client_secret': AMADEUS_SECRET_KEY,
            })

        );

        const accessToken = tokenResponse.data.access_token; // Зберігаємо токен
        return accessToken
    } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchSignUpAsync = createAsyncThunk(
    "signup/fetchSignup",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, formData, {
                withCredentials: true, // ✅ Дозволяє передавати cookies
            });

            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const fetchUpdateAsync = createAsyncThunk("cart/fetchUpdateCart", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/${formData.userId}/${formData.type.toLowerCase()}s/${formData.id}`, formData.formData, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})



export const fetchRemoveCartAsync = createAsyncThunk(
    "cart/fetchRemoveCart",
    async (formData, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.session.token;

            console.log("FormData being sent:", formData);

            const response = await axios.put(
                `${API_URL}/users/${formData.userId}/delete-cart`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                }
            );
            localStorage.setItem("user", JSON.stringify(response.data.user))
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);


export const fetchRemoveElementFromCartAsync = createAsyncThunk("cart/fetchRemoveElementFromCart", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/${formData.userId}/delete/${formData.type}s/${formData.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })

        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchDeleteAsync = createAsyncThunk("delete/fetchDelete", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.delete(`${API_URL}/users/delete-profile/${formData}`, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchUpdateProfileAsync = createAsyncThunk("update/fetchUpdateProfile", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/update-profile/${formData.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,

            }

        })

        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchUpdatePasswordAsync = createAsyncThunk("update/fetchUpdatePassword", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/change-password/${formData.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })

        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }

})


export const fetchUser = createAsyncThunk(
    "user/fetchUserFacebook",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                withCredentials: true, // ✅ Дозволяє передавати кукі між бекендом і фронтом
            });

            console.log("✅ User Data:", response.data); // 🔹 Логуємо отримані дані

            // Зберігаємо токен та користувача в localStorage
            localStorage.setItem("token", response.data.authToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response.data;
        } catch (error) {
            console.error("❌ Error fetching user:", error.response?.data);
            return rejectWithValue(error.response?.data || "Error fetching user");
        }
    }
);




export const fetchLogout = createAsyncThunk('logout/fetchLogout', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching logout');
    }
});


// Thunk для видалення користувача
export const fetchDeleteUserByMail = createAsyncThunk(
    "user/deleteByEmail",
    async (userMail, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.session.token; // Отримуємо токен з Redux Store

            const response = await axios.post(`${API_URL}/users/delete-user-mail`, { userMail }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`, // Передаємо токен у заголовках
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Deletion failed");
        }
    }
);





export const fetchConfirmEmail = createAsyncThunk(
    'email/fetchConfirmEmail',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/email/confirm-email?token=${token}`);
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching email confirmation');
        }
    }
);








