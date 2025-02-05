import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, } from 'react-router-dom'
import { fetchFlightByIdAsync } from '../../Store/Slices/fetchFlightSliceAsync'
import FlightOfferForm from '../../components/FlightOfferForms/FlightOfferForms'


const UpdatedFlightPage = () => {

  const dispatch = useDispatch()

  const { id } = useParams()
  useEffect(() => {

    dispatch(fetchFlightByIdAsync(id))
  }, [id])

  return (
    <div><FlightOfferForm /></div>
  )
}

export default UpdatedFlightPage