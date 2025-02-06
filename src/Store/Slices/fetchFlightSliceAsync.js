import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'
import { AMADEUS_URL, API_URL } from "../../utils/variables";


export const fetchFlightAsync = createAsyncThunk("flight/fetchFlight", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/flights`)
    return response.data
  } catch (e) { return rejectWithValue(e.response.data.message); }


})

export const fetchFlightAsyncApi = createAsyncThunk("flight/fetchFlightApi", async ({ flyFrom, flyTo, departing, passengers, returning, tripType }, { getState, rejectWithValue }) => {
  try {

    const state = getState()
    const accessToken = state.session.amadeusToken;
    const responseCityFrom = await axios.get(
      `${AMADEUS_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyFrom}`,
      // `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${flyFrom}`,
      // `${import.meta.env.VITE_AMADEUS_API_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyFrom}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )


    const responseCityTo = await axios.get(
      `${AMADEUS_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyTo}`,
      //flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-05-02&adults=1&nonStop=false&max=250
      // `${import.meta.env.VITE_AMADEUS_API_URL}/v1/reference-data/locations?subType=CITY&keyword=${flyTo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )


    const responseFlight = await axios.get(
      // `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=LON&departureDate=2024-12-21&adults=2`,
      //  `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=LON&departureDate=2024-12-21&adults=2`,
      `${AMADEUS_URL}/v2/shopping/flight-offers?originLocationCode=${responseCityFrom.data.data[0].iataCode}&destinationLocationCode=${responseCityTo.data.data[0].iataCode}&departureDate=${departing}&adults=${passengers.adults}&nonStop=false&max=250`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    let responseFlightReturn = null
    if (tripType === "return" && returning) {
      responseFlightReturn = await axios.get(
        // `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=LON&departureDate=2024-12-21&adults=2`,
        //  `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AMS&destinationLocationCode=LON&departureDate=2024-12-21&adults=2`,
        `${AMADEUS_URL}/v2/shopping/flight-offers?originLocationCode=${responseCityTo.data.data[0].iataCode}&destinationLocationCode=${responseCityFrom.data.data[0].iataCode}&departureDate=${returning}&adults=${passengers.adults}&nonStop=false&max=250`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    }
    // Додаємо flyFrom та flyTo в кожен об'єкт у `responseFlight`
    const updatedFlightData = responseFlight.data.data.map((flight) => ({
      ...flight,
      flyFrom,
      flyTo,
    }));

    // Додаємо flyFrom у return flights як FlyTo
    const updatedReturnFlightData = responseFlightReturn?.data?.data.map((flight) => ({
      ...flight,
      FlyTo: flyFrom, // Міняємо місцями для зворотного рейсу
    })) || [];

    return {
      data: updatedFlightData,
      flyFrom,
      flyTo,
      departing,
      passengers,
      returning,
      tripType,
      dataReturn: updatedReturnFlightData,
    };

    // return { data: responseFligth.data.data, flyFrom, flyTo, departing, passengers, returning, tripType, dataReturn: responseFlightReturn?.data?.data || [] }
  } catch (e) {
    console.error("Error fetching flight data:", e); // Log full error for debugging
    return rejectWithValue(e.response ? e.response.data : e.message); // Handle error message correctly
  }
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
