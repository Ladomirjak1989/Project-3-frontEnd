import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../../utils/variables";

export const fetchSessionAsync = createAsyncThunk("login/fetchLogin", async(formData, { rejectWithValue })=>{
   try {
    const response = await axios.post(`${API_URL}/auth/login`,formData)
    localStorage.setItem("token", response.data.authToken)
    localStorage.setItem("user", JSON.stringify(response.data.user))
    return response.data  
    }catch(e){return rejectWithValue(e.response.data.message);} 

    
})



export const fetchSignUpAsync = createAsyncThunk("signup/fetchSignup", async(formData, { rejectWithValue })=>{
    try {
     const response = await axios.post(`${API_URL}/auth/signup`, formData)
     console.log('JWT token', response.data.authToken);
     return response.data 
     
     }catch(e){
        
        return rejectWithValue(e.response.data.message);} 
     
 })