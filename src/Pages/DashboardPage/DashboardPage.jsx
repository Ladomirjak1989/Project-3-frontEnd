import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightEl from '../../components/FlightEl/FlightEl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlightAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import Loader from '../../components/Loader/Loader';
// import FlightOfferForm from '../../components/FlightOfferForms/FlightOfferForms.jsX';




const DashboardPage = () => {
    // const [flights, setFlights] = useState([]);
    const user = useSelector(state => state.session.user)
    const isLoading = useSelector(state=>state.flights.loading)
    const flights = useSelector(state => Object.values(state.flights.flights))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFlightAsync());
    }, [dispatch]);

    

    
    if(isLoading){
        return <Loader/>
    }

    return (
        <div>
            <h1></h1>
            <div>
                
                <ul className='flex flex-col items-center gap-5'>
                    {flights.map((flight) => (
                        <FlightEl key={flight._id} flight={flight} />

                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;


