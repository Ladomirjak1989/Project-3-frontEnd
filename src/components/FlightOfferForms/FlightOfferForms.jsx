import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlightAsync, updatedFlightAsync, fetchFlightByIdAsync } from '../../Store/Slices/fetchFlightSliceAsync';
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';

const FlightOfferForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the id from URL parameters
    const isLoading = useSelector(state => state.flights.loading);
    const flight = useSelector(state => state.flights.flight);
    const currentLang = useSelector(state => state.language.language);

    const [formData, setFormData] = useState({
        type: 'flight',
        origin: '',
        city: '',
        destination: '',
        destinationCity: '',
        departureDate: '',
        returnDate: '',
        price: '',
        flightDates: '',
        flightOffers: '',
        currencies: 'EU, USD',
        duration: '',
        detailedName: '',
        capacities: 250,
        subType: '',
        nonStop: '',
        oneWay: 'false',
        time: {
            depart: '18:00',
            arrive: '06:00'
        },
        returnTime: {
            depart: "12:00",
            arrive: "15:20"
        },
        summary: {
            nights: 14,
            pricePerPerson: 550,
            totalPrice: 1100
        },

    });

    useEffect(() => {
        if (id) {
            dispatch(fetchFlightByIdAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (flight) {
            setFormData(prev => ({ ...prev, ...flight }));
        }
    }, [flight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const clearForm = () => {
        setFormData({
            type: 'flight',
            origin: '',
            city: '',
            destination: '',
            destinationCity: '',
            departureDate: '',
            returnDate: '',
            price: '',
            flightDates: '',
            flightOffers: '',
            currencies: 'EU, USD',
            duration: '',
            detailedName: '',
            capacities: 250,
            subType: '',
            nonStop: '',
            oneWay: 'false',
            time: {
                depart: '18:00',
                arrive: '06:00'
            },
            returnTime: {
                depart: "12:00",
                arrive: "15:20"
            },
            summary: {
                nights: 14,
                pricePerPerson: 550,
                totalPrice: 1100
            },

        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.flightDates = `${formData.departureDate} to ${formData.returnDate}`; // Automatically set flightDates
        try {
            dispatch(createFlightAsync(formData));
            clearForm()
            navigate(`/${currentLang}/flights`)



            // Reset the form

        } catch (err) {
            console.error('Error creating flight offer:', err);
        }
    };

    const handleUpdated = async (e) => {
        e.preventDefault();
        formData.flightDates = `${formData.departureDate} to ${formData.returnDate}`; // Automatically set flightDates
        try {
            const updatedFlight = dispatch(updatedFlightAsync({ formData, id: flight._id }));
            if (updatedFlight) {
                clearForm()
                navigate(`/flights/${flight._id}`);
            }
            // Reset the form

        } catch (err) {
            console.error('Error updating flight offer:', err);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={flight ? handleUpdated : handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{flight ? 'Update Flight Offer' : 'Create Flight Offer'}</h2>
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
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="city" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
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

            {!flight && <Button id="create" />}
            {flight && <Button id="updated" />}
            <Button id="clear" onClick={clearForm} />

        </form>
    );
};

export default FlightOfferForm;

