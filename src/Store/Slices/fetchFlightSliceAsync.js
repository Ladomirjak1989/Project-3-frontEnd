import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";


export const fetchFlightAsync = createAsyncThunk("flight/fetchFlight", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/flights`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchFlightByIdAsync = createAsyncThunk("flight/fetchFlightById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/flights/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createFlightAsync = createAsyncThunk("flight/createFlight", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/flights`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedFlightAsync = createAsyncThunk("flight/updateFlight", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_URL}/flights/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteFlightAsync = createAsyncThunk("flight/deleteFlight", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_URL}/flights/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})
