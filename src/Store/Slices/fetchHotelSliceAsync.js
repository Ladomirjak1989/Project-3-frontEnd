import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";

export const fetchHotelAsync = createAsyncThunk("hotel/fetchHotel", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/hotels`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchHotelByIdAsync = createAsyncThunk("hotel/fetchHotelById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createHotelAsync = createAsyncThunk("hotel/createHotel", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/hotels`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedHotelAsync = createAsyncThunk("hotel/updateHotel", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_URL}/hotels/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteHotelAsync = createAsyncThunk("hotel/deleteHotel", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_URL}/hotels/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})



// export const fetchHotelDealsAsync = createAsyncThunk("hotel/fetchHotelDeals", async (params, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${API_URL}/hotels/deals`,{params})
//     return response.data
//   } catch (e) { return rejectWithValue(e.response.data.message); }


// })

