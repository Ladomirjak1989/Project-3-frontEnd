import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, } from 'react-router-dom'
import { fetchVacationByIdAsync } from '../../Store/Slices/fetchVacationSliceAsync'
import VacationOfferForm from '../../components/VacationOfferForm/VactionOfferForm'



const UpdatedVacationPage = () => {

  const dispatch = useDispatch()

  const { id } = useParams()
  useEffect(() => {

    dispatch(fetchVacationByIdAsync(id))
  }, [id])

  return (
    <div><VacationOfferForm /></div>
  )
}

export default UpdatedVacationPage