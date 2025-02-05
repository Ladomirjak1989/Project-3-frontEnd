import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import {API_URL}  from "../../utils/variables";

export const fetchCityAsync = createAsyncThunk("city/fetchCity", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/cities`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


export const fetchCityByIdAsync = createAsyncThunk("city/fetchCityById", async (id, { rejectWithValue }) => {
  try {
  
    const response = await axios.get(`${API_URL}/cities/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createCityAsync = createAsyncThunk("city/createCity", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/cities`, formData,
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

    const response = await axios.put(`${API_URL}/cities/${id}`, formData,
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

    const response = await axios.delete(`${API_URL}/cities/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


