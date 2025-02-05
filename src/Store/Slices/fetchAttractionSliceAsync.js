import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { AMADEUS_URL, API_URL } from "../../utils/variables";


export const fetchAttractionAsync = createAsyncThunk("attraction/fetchAttraction", async (coordinates, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.session.amadeusToken;

    const response = await axios.get(
      `${AMADEUS_URL}/v1/shopping/activities?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return rejectWithValue('Error fetching attractions');
  }
});

export const fetchCityAsync = createAsyncThunk("attraction/fetchCity", async (cityKeyword, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const accessToken = state.session.amadeusToken;

    const response = await axios.get(
      `${AMADEUS_URL}/v1/reference-data/locations/cities?keyword=${cityKeyword}&max=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data && response.data.data.length > 0) {
      const { latitude, longitude } = response.data.data[0].geoCode;
      return { latitude, longitude };
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error('Error fetching city information:', error);
    return rejectWithValue('City not found');
  }
});


export const fetchAttractionByIdAsync = createAsyncThunk("attraction/fetchAttractionById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/attractions/${id}`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const createAttractionAsync = createAsyncThunk("attraction/createAttraction", async (formData, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.post(`${API_URL}/attractions`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const updatedAttractionAsync = createAsyncThunk("attraction/updateAttraction", async ({ formData, id, }, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.put(`${API_URL}/attractions/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const deleteAttractionAsync = createAsyncThunk("attraction/deleteAttraction", async (id, { rejectWithValue, getState }) => {
  try {
    const state = getState()

    const token = state.session.token; // Adjust this path based on your actual state structure
    const role = state.session.user.role; // Adjust this path based on your actual state structure

    const response = await axios.delete(`${API_URL}/attractions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role
        }
      })

    return id
  } catch (e) { return rejectWithValue(e.response.data.message); }


})


