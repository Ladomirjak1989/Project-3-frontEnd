import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { fetchVacationAsync } from '../../Store/Slices/fetchVacationSliceAsync';
import VacationEl from '../../components/VacationEl/VacationEl';
import SortList from '../../components/SortList/SortList';

const VacationPage = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.vacations.isLoading)
  const vacations = useSelector(state => Object.values(state.vacations.vacations))

  useEffect(() => {
    dispatch(fetchVacationAsync())
  }, [])
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='mx-auto my-0 max-w-5xl'>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4 items-center">
          <h2 className='"text-xl font-semibold mb-2 italic text-xl'>Find your best vacation below:</h2>
          
        <SortList />
      
        </div>
        <ul>
          {vacations.map(item => (
            <VacationEl {...item} key={item._id} />

          ))}

        </ul>
       
      
    

        <Button id="book" />
      </div>
    </div>
  );

}

export default VacationPage