import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";

export const fetchCruiseAsync = createAsyncThunk("cruise/fetchCruise", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/cruises`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchCruiseByIdAsync = createAsyncThunk("cruise/fetchCruiseById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/cruises/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createCruiseAsync = createAsyncThunk("cruise/createCruise", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/cruises`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedCruiseAsync = createAsyncThunk("cruise/updateCruise", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_URL}/cruises/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteCruiseAsync = createAsyncThunk("cruise/deleteCruise", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_URL}/cruises/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})



// export const fetchCruiseDealsAsync = createAsyncThunk("Cruise/fetchCruiseDeals", async (params, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${API_URL}/Cruises/deals`,{params})
//     return response.data
//   } catch (e) { return rejectWithValue(e.response.data.message); }


// })

