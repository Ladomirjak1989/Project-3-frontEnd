import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlightAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';



const FlightOfferForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.flights.loading)
    const [formData, setFormData] = useState({
        type: 'flight',
        origin: '',
        departure: "",
        destination: '',
        destinationCity: "",
        city: "",
        departureDate: '',
        returnDate: '',
        capacities: "",
        price: '',
        flightDates: '',
        flightOffers: '',
        currencies: 'EU, USD',
        duration: '',
        detailedName: '',
        subType: '',
        nonStop: '',
        oneWay: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.flightDates = `${formData.departureDate} to ${formData.returnDate}`; // Automatically set flightDates
        try {

            const flight = dispatch(createFlightAsync(formData))
            if(flight){
                navigate("/flights")
            }
            // Reset the form
            setFormData({
                type: 'flight',
                origin: '',
                departure: "",
                destination: '',
                departureDate: '',
                destinationCity: "",
                city: "",
                returnDate: '',
                price: '',
                flightDates: '',
                flightOffers: '',
                currencies: 'EU, USD',
                capacities: "",
                duration: '',
                detailedName: '',
                subType: '',
                nonStop: '',
                oneWay: ''
            });
        } catch (err) {
            console.error('Error creating flight offer:', err);
        }

    };
    if (isLoading) {
        return <Loader />
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Flight Offer</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="origin">Origin</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="origin" name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="destination">Destination</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="destination" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="destinationCity">Destination City</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="destinationCity" name="destinationCity" placeholder="Destination City" value={formData.destinationCity} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="capacities">Capacities</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="capacities" name="capacities" placeholder="Capacities" value={formData.capacities} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="city" name="city" placeholder="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="departureDate">Departure Date</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="date" id="departureDate" name="departureDate" placeholder="Departure Date" value={formData.departureDate} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="returnDate">Return Date</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="date" id="returnDate" name="returnDate" placeholder="Return Date" value={formData.returnDate} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="number" id="price" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="flightOffers">Flight Offers</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="flightOffers" name="flightOffers" placeholder="Flight Offers" value={formData.flightOffers} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="duration">Duration</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="duration" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="detailedName">Detailed Name</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="detailedName" name="detailedName" placeholder="Detailed Name" value={formData.detailedName} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="subType">Sub Type</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="subType" name="subType" placeholder="Sub Type" value={formData.subType} onChange={handleChange} required />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="nonStop">Non-Stop</label>
                <select className="w-full p-2 border border-gray-300 rounded" id="nonStop" name="nonStop" placeholder="Non Stop" value={formData.nonStop} onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="oneWay">One Way</label>
                <select className="w-full p-2 border border-gray-300 rounded" id="oneWay" name="oneWay" placeholder="One Way" value={formData.oneWay} onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button className="bg-blue-500 text-white p-2 rounded" type="submit">Create Flight Offer</button>
        </form>
    );
};

export default FlightOfferForm;
