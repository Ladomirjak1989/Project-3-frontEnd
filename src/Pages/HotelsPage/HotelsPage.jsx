import React from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import { useSelector } from 'react-redux'

const HotelsPage = () => {
  const user = useSelector(state=>state.session.user) 
  return (
    <div className='mx-auto my-0 max-w-5xl'>
      
      {user?.role !== "admin" && <Searchbar />}
    <div>HotelsPage</div>
    </div>
  )
}

export default HotelsPage