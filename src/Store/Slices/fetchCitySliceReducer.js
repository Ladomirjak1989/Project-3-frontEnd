import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_CITY_URL } from "../../utils/variables";

export const fetchCityAsync = createAsyncThunk("city/fetchCity", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_CITY_URL}/city`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchCityByIdAsync = createAsyncThunk("city/fetchCityById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_CITY_URL}/city/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createCityAsync = createAsyncThunk("city/createCity", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_CITY_URL}/city`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedCityAsync = createAsyncThunk("city/updateCity", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_CITY_URL}/city/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteCityAsync = createAsyncThunk("city/deleteCity", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_CITY_URL}/city/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})



export const fetchCityDealsAsync = createAsyncThunk("city/fetchCityDeals", async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/city/deals`,{params})
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

