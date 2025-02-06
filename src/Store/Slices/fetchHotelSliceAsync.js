import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { AMADEUS_URL, API_URL } from "../../utils/variables";

export const fetchHotelAsync = createAsyncThunk("hotel/fetchHotel", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/hotels`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchHotelAsyncApi = createAsyncThunk("hotel/fetchHotelApi", async ({ hotelTo }, { getState, rejectWithValue }) => {
  try {
    const state = getState()
    const accessToken = state.session.amadeusToken;

    const responseCityHotelTo = await axios.get(
      `${AMADEUS_URL}/v1/reference-data/locations?subType=CITY&keyword=${hotelTo}`,
      //flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-05-02&adults=1&nonStop=false&max=250
      // `${import.meta.env.AMADEUS_API_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyTo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
   
    const response = await axios.get(`${AMADEUS_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${responseCityHotelTo.data.data[0].iataCode}&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
   
    return response.data.data
  }

  catch (e) {
    console.error("Error fetching hotel data:", e); // Log full error for debugging
    return rejectWithValue(e.response ? e.response.data : e.message); // Handle error message correctly
  }
}
)


export const fetchHotelAsyncApiId = createAsyncThunk("hotel/fetchHotelApiId", async ({ hotelId }, { getState, rejectWithValue }) => {
  try {
   
    const state = getState()
    const accessToken = state.session.amadeusToken;

    const response = await axios.get(
      // `${AMADEUS_URL}/v3/reference-data/locations/hotels/by-hotels?hotelIds=${hotelId}`,
      `${AMADEUS_URL}/v3/shopping/hotel-offers/${hotelId}`,
      //flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-05-02&adults=1&nonStop=false&max=250
      // `${import.meta.env.AMADEUS_API_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyTo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )


    return response.data.data
  }

  catch (e) {
    console.error("Error fetching hotel data:", e); // Log full error for debugging
    return rejectWithValue(e.response ? e.response.data : e.message); // Handle error message correctly
  }
}
)


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


