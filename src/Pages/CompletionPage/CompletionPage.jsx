import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRemoveCart } from '../../Store/Slices/cruiseSliceReducer'
import { setRemoveCart as setVacationRemoveCart  } from '../../Store/Slices/vacationSliceReducer'
import { setRemoveCart as setCruiseRemoveCart  } from '../../Store/Slices/cruiseSliceReducer'
import { setRemoveCart as setFlightRemoveCart  } from '../../Store/Slices/flightSliceReducer'
import { setRemoveCart as setHotelRemoveCart  } from '../../Store/Slices/hotelSliceReducer'


const CompletionPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify([]))
        dispatch(setRemoveCart())
        dispatch(setVacationRemoveCart())
        dispatch(setCruiseRemoveCart())
        dispatch(setFlightRemoveCart())
        dispatch(setHotelRemoveCart())
        setTimeout(() => {
            navigate("/")
        }, 5000)


    }, [])
    return (

        <div>✅ Payment Was Successful!</div>
    )
}

export default CompletionPage