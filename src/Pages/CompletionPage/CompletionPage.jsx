import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRemoveCart } from '../../Store/Slices/cruiseSliceReducer'
import { setRemoveCart as setVacationRemoveCart } from '../../Store/Slices/vacationSliceReducer'
import { setRemoveCart as setCruiseRemoveCart } from '../../Store/Slices/cruiseSliceReducer'
import { setRemoveCart as setFlightRemoveCart } from '../../Store/Slices/flightSliceReducer'
import { setRemoveCart as setHotelRemoveCart } from '../../Store/Slices/hotelSliceReducer'
import goodIcon from "../../assets/flags/icons8-good-quality.gif"

const CompletionPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentLang = useSelector(state => state.language.language)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify([]))
        dispatch(setRemoveCart())
        dispatch(setVacationRemoveCart())
        dispatch(setCruiseRemoveCart())
        dispatch(setFlightRemoveCart())
        dispatch(setHotelRemoveCart())
        setTimeout(() => {
            navigate(`/${currentLang}/`)
        }, 5000)


    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <div className="text-center">
                    <img
                        src={goodIcon}
                        alt="Good Icon"
                        className="mx-auto w-32 h-32 mb-4"
                    />
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Thank you for your purchase. You will be redirected to the home page shortly.
                </p>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500 border-solid"></div>
                </div>
            </div>
        </div>
    );
}

export default CompletionPage