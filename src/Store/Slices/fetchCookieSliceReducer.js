import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../../utils/variables";

// Unified function to fetch or update cookie consent
export const fetchCookieAsync = createAsyncThunk(
  "cookie/fetchCookie",
  async (cookie, { rejectWithValue }) => {
    try {
      // Make the GET request
      const response = await axios.get(`${API_URL}/cookie-consent`, {
        params: { cookie }, // Use `params` for query parameters
        withCredentials: true, // Include cookies if needed
      });
      return response.data; // Return API response
    } catch (e) {
      // Provide a fallback error message
      const errorMessage = e.response?.data?.message || "Failed to fetch cookie data.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Optional: Separate function for fetching cookie details
export const getCookieInfo = createAsyncThunk(
  "cookie/getCookie",
  async (_, { rejectWithValue }) => {
    try {
      // Make the GET request
      const response = await axios.get(`${API_URL}/cookie-consent`, {
        withCredentials: true,
      });
      return response.data; // Return API response
    } catch (e) {
      // Provide a fallback error message
      const errorMessage = e.response?.data?.message || "Failed to get cookie information.";
      return rejectWithValue(errorMessage);
    }
  }
);
