import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import VacationEl from '../../components/VacationEl/VacationEl';
import HotelEl from '../../components/HotelEl/HotelEl';
import CruiseEl from "../../components/CruiseEl/CruiseEl"


const CartPage = () => {

    const cartHotel = useSelector(state => state.hotels.cartHotel)
    const cartCruise = useSelector(state => state.cruise.cartCruise)
    const cartVacation = useSelector(state => state.vacations.cartVacation)
    const cartFlight = useSelector(state => state.flights.cartFlight)
console.log(cartHotel,cartCruise,cartVacation, cartFlight)


    return (
        <div>CartPage</div>
    )
}

export default CartPage