import React, { useState, useEffect } from 'react';
import FlightEl from '../../components/FlightEl/FlightEl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlightAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import Loader from '../../components/Loader/Loader';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';
import PopUpMessage from '../../components/PopUpMessage/PopUpMessage';




const DashboardPage = () => {

    const user = useSelector(state => state.session.user)
    const isLoading = useSelector(state => state.flights.loading)
    const flights = useSelector(state => Object.values(state.flights.flights))
    const flightSearch = useSelector(state => Object.values(state.flightSearch.flights))
    const popUp = useSelector(state => state.popUp.popUp)
   

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFlightAsync());
    }, [dispatch]);

    useEffect(() => {
        if (popUp) {
            setTimeout(() => {
                dispatch(setPopUp(null))
            }, 9000)
        }
    }, [popUp])


    if (isLoading) {
        return <Loader />

    }

    return (
        <div className='bg-slate-50'>
            <div className="border-dotted bg-white border-2 border-blue-900 p-4  rounded-lg">
                <p className="text-center text-blue-800">
                    <span className="font-bold">10kg hand luggage</span> and <span className="font-bold">underseat bag</span> included in the price <span className="font-bold">on all flights.</span>
                </p>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Alternative Flight</h3>
            </div>
            <h1></h1>
            <div className='relative'>
                <ul className='flex flex-col items-center gap-5'>

                    {user?.role === "admin" && flights.map((flight) => (
                        <FlightEl key={flight._id} flight={flight} />

                    ))}
                    {flightSearch.map((flight) => (
                        <FlightEl key={flight._id} flight={flight} />

                    ))}
                </ul>
                {!flightSearch.length && user?.role !=="admin" && <h2>No flights</h2>}
                {popUp && <PopUpMessage/>}
            </div>
        </div>
    );
};

export default DashboardPage;


