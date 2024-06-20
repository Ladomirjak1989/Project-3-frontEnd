import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";

export const fetchVacationAsync = createAsyncThunk("vacation/fetchVacation", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/vacations`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchVacationByIdAsync = createAsyncThunk("vacation/fetchVacationById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/vacations/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createVacationAsync = createAsyncThunk("vacation/createVacation", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/vacations`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedVacationAsync = createAsyncThunk("vacation/updateVacation", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_URL}/vacations/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteVacationAsync = createAsyncThunk("vacation/deleteVacation", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_URL}/vacations/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})
