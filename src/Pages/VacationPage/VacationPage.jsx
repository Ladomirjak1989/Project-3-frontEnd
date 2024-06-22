import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { fetchVacationAsync } from '../../Store/Slices/fetchVacationSliceAsync';
import VacationEl from '../../components/VacationEl/VacationEl';
import SortList from '../../components/SortList/SortList';
import Searchbar from '../../components/Searchbar/Searchbar';



const VacationPage = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.vacations.loading)
  const vacations = useSelector(state => Object.values(state.vacations.vacations))
  const vacationSearch = useSelector(state => Object.values(state.vacationSearch.vacations))
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchVacationAsync())
  }, [])

  if (isLoading) {
    return <Loader />
  }
  if (vacationSearch.length) {
    return (
      <>
        {user?.role !== "admin" && <Searchbar />}
        <div className='mx-auto my-0 max-w-5xl'>
          <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4 items-center">
              <h2 className='"text-xl font-semibold mb-2 italic text-xl'>Find your best vacation below:</h2>

              <SortList />

            </div>
            <ul>
              {vacationSearch.map(item => (
                <VacationEl {...item} key={item._id} />

              ))}
            </ul>
            <Button id="book" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
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
    </>
  );

}

export default VacationPage