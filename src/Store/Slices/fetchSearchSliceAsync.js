import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";


export const fetchSearchFlightAsync = createAsyncThunk("search/fetchFlight", async (params, { rejectWithValue }) => {
    try {
      
        const response = await axios.get(`${API_URL}/flights`, {params})
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchSearchVacationAsync = createAsyncThunk("search/fetchVacation", async (params, { rejectWithValue }) => {
    try {
        
        const response = await axios.get(`${API_URL}/vacations`, {params})
        console.log(response.data)
      
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchSearchHotelAsync = createAsyncThunk("search/fetchHotel", async (params, { rejectWithValue }) => {
    try {
       
        const response = await axios.get(`${API_URL}/hotels`, {params})
        
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchSearchCruiseAsync = createAsyncThunk("search/fetchCruise", async (params, { rejectWithValue }) => {
    try {
       
        const response = await axios.get(`${API_URL}/cruises`, {params})
      
        return response.data
    } catch (e) { return rejectWithValue(e.response.data.message); }


})