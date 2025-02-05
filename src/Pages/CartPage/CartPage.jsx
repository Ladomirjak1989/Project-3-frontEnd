import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VacationEl from '../../components/VacationEl/VacationEl';
import HotelEl from '../../components/HotelEl/HotelEl';
import CruiseEl from "../../components/CruiseEl/CruiseEl"
import { setOrder } from '../../Store/Slices/sessionSliceReducer';
import Button from '../../components/Button/Button';
import { setCartCruiseWithUser, setRemoveCart } from '../../Store/Slices/cruiseSliceReducer'
import { setCartVacationWithUser, setRemoveCart as setVacationRemoveCart } from '../../Store/Slices/vacationSliceReducer'
import { setRemoveCart as setCruiseRemoveCart } from '../../Store/Slices/cruiseSliceReducer'
import { setCartFlightWithUser, setRemoveCart as setFlightRemoveCart } from '../../Store/Slices/flightSliceReducer'
import { setCartHotelWithUser, setRemoveCart as setHotelRemoveCart } from '../../Store/Slices/hotelSliceReducer'
import { fetchRemoveCartAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import FlightElCart from '../../components/FlightElCart/FlightElCart';


const CartPage = () => {

    const user = useSelector(state => state.session.user)
    const sum = useSelector(state => state.session.totalPrice)
    const dispatch = useDispatch()

    const cartHotel = useSelector(state => state.hotels.cartHotel)
    const cartCruise = useSelector(state => state.cruise.cartCruise)
    const cartVacation = useSelector(state => state.vacations.cartVacation)
    const cartFlight = useSelector(state => state.flights.cartFlight)
    const currentLang = useSelector(state => state.language.language)

    useEffect(() => {
        const hotelSum = cartHotel.reduce((acc, cur) => {
            acc += cur.price
            return acc
        }, 0)

        const cruiseSum = cartCruise.reduce((acc, cur) => {
            acc += cur.totalPrice
            return acc
        }, 0)

        const vacationSum = cartVacation.reduce((acc, cur) => {
            acc += cur.price
            return acc
        }, 0)

        const flightSum = cartFlight.reduce((acc, cur) => {
            acc += +cur.price
            return acc
        }, 0)

        dispatch(setOrder({
            totalPrice: hotelSum + cruiseSum + flightSum + vacationSum,
            order: [...cartFlight, ...cartVacation, ...cartCruise, ...cartHotel]
        }))
    }, [cartHotel, cartCruise, cartVacation, cartFlight])

    const handleRemoveAll = async () => {
        if (!user) {
            localStorage.setItem("cart", JSON.stringify([]))
            dispatch(setRemoveCart())
            dispatch(setVacationRemoveCart())
            dispatch(setCruiseRemoveCart())
            dispatch(setFlightRemoveCart())
            dispatch(setHotelRemoveCart())
            return
        }
       
        const { payload } = await dispatch(fetchRemoveCartAsync({ userId: user._id }))

        if (payload.user) {
            const storage = JSON.parse(localStorage.getItem("user"))
            // JSON.stringify(localStorage.setItem("user", { ...storage, flights: [], hotels: [], vacations: [], cruises: [] }))
            dispatch(setCartCruiseWithUser([]))
            dispatch(setCartFlightWithUser([]))
            dispatch(setCartVacationWithUser([]))
            dispatch(setCartHotelWithUser([]))
        }
    }

return (
        <div className="container mx-auto my-6 p-4 border rounded shadow-lg bg-white">
            <div className="flex justify-between items-center mb-4">
            </div>
            <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold">ORDER YOUR VACATION</h3>
                </div>
                <div className="flex space-x-2">
                    <div className="flex justify-end items-center">
                        <h4 className="text-xl font-semibold mr-4">Total: €{sum.toFixed(2)} </h4>

                    </div>
                    <div >
                        <Link className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition" to={`/${currentLang}/order`}>
                            PAY YOUR ORDER
                        </Link>
                        <Button onClick={handleRemoveAll} id="clearCart" />
                    </div>

                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Cart Package Holidays</h3>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Vacation Packages</h4>
                    <ul className="space-y-2">
                        {cartVacation.map(item => (
                            <VacationEl key={item._id} {...item} isCart={true} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Hotel Packages</h4>
                    <ul className="space-y-2">
                        {cartHotel.map(item => (
                            <HotelEl key={item._id} {...item} isCart={true} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Cruise Packages</h4>
                    <ul className="space-y-2">
                        {cartCruise.map(item => (
                            <CruiseEl key={item._id} {...item} isCart={true} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Flight Packages</h4>
                    <ul className="space-y-2">
                        {cartFlight.map(item => (
                            <FlightElCart key={item.id} flight={item} isCart={true}/>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};



export default CartPage