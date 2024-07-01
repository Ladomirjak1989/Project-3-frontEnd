import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VacationEl from '../../components/VacationEl/VacationEl';
import HotelEl from '../../components/HotelEl/HotelEl';
import CruiseEl from "../../components/CruiseEl/CruiseEl"
import FlightEl from "../../components/FlightEl/FlightEl"



const CartPage = () => {

    const user = useSelector(state => state.session.user)
    const [sum, setSum] = useState()

    const cartHotel = useSelector(state => state.hotels.cartHotel)
    const cartCruise = useSelector(state => state.cruise.cartCruise)
    const cartVacation = useSelector(state => state.vacations.cartVacation)
    const cartFlight = useSelector(state => state.flights.cartFlight)


    useEffect(() => {
        const hotelsum = cartHotel.reduce((acc, cur) => {
            acc += cur.price
            return acc
        }, 0)
        setSum()
    }, [cartHotel, cartCruise, cartVacation, cartFlight])


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
                    <h4 className="text-xl font-semibold mr-4">Total: </h4>
                </div>
                    <Link className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition" to={`/payment`}>
                        PAY YOUR ORDER
                    </Link>
                    
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">Cart Package Holidays</h3>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Vacation Packages</h4>
                    <ul className="space-y-2">
                        {cartVacation.map(item => (
                            <VacationEl key={item._id} {...item} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Hotel Packages</h4>
                    <ul className="space-y-2">
                        {cartHotel.map(item => (
                            <HotelEl key={item._id} {...item} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Cruise Packages</h4>
                    <ul className="space-y-2">
                        {cartCruise.map(item => (
                            <CruiseEl key={item._id} {...item} />
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Flight Packages</h4>
                    <ul className="space-y-2">
                        {cartFlight.map(item => (
                            <FlightEl key={item._id} flight={item} />
                        ))}
                    </ul>
                </div>
               
            </div>
        </div>
    );
};



export default CartPage