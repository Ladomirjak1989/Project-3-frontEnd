import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";

export const fetchSessionAsync = createAsyncThunk("login/fetchLogin", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, formData)
        localStorage.setItem("token", response.data.authToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchGetUserByIdAsync = createAsyncThunk("user/fetchUser", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/users/${formData.id}`)
        localStorage.setItem("token", response.data.authToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})



export const fetchSignUpAsync = createAsyncThunk("signup/fetchSignup", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, formData)
        console.log('JWT token', response.data.authToken);
        return response.data

    } catch (e) {

        return rejectWithValue(e.response.data.message);
    }

})

export const fetchUpdateAsync = createAsyncThunk("cart/fetchUpdateCart", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.post(`${API_URL}/users/${formData.userId}/${formData.type}s/${formData.id}`, formData,{
            headers: {
              Authorization: `Bearer ${token}`,
             
            }
          })
      console.log(response.data)
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchRemoveCartAsync = createAsyncThunk("cart/fetchRemoveCart", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/${formData.userId}/delete-cart`, formData,{
            headers: {
              Authorization: `Bearer ${token}`,
             
            }
          })
     
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchRemoveElementFromCartAsync = createAsyncThunk("cart/fetchRemoveElementFromCart", async (formData, { rejectWithValue, getState }) => {
    try {
        const state = getState()
        const token = state.session.token;
        const response = await axios.put(`${API_URL}/users/${formData.userId}/${formData.type}s/${formData.id}`, formData,{
            headers: {
              Authorization: `Bearer ${token}`,
             
            }
          })
     
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchDeleteAsync = createAsyncThunk("delete/fetchDelete", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/users/delete-profile/${formData}`)
        localStorage.setItem("token","")
        localStorage.setItem("user", JSON.stringify({}))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchUpdateProfileAsync = createAsyncThunk("update/fetchUpdateProfile", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/users/update-profile/${formData.id}`, formData)
        localStorage.setItem("token", response.data.authToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchUpdatePasswordAsync = createAsyncThunk("update/fetchUpdatePassword", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/users/update-password/${formData.id}`, formData)
        localStorage.setItem("token", response.data.authToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})