import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVacationAsync, updatedVacationAsync, fetchVacationByIdAsync } from '../../Store/Slices/fetchVacationSliceAsync';
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';

const VacationOfferForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the id from URL parameters
    const isLoading = useSelector(state => state.vacations.loading);
    const vacation = useSelector(state => state.vacations.vacation);


    const [formData, setFormData] = useState({

        duration: "",
        destination: '',
        price: 0,
        currency: "",
        description: '',
        name: "",
        type: "",
        address: "",
        amenities: "",
        activities: "",
        images: "",

    });

    useEffect(() => {
        if (id) {
            dispatch(fetchVacationByIdAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (vacation && vacation.duration) {
            const data = {
                duration: vacation.duration.split(" ")[0],
                destination: vacation.destination,
                price: vacation.price,
                currency: vacation.currency,
                description: vacation.description,
                name: vacation.accommodation.name,
                type: vacation.accommodation.type,
                address: vacation.accommodation.address,
                amenities: vacation.accommodation.amenities.join(", "),
                activities: vacation.activities.join(", "),
                images: vacation.images.join(", "),

            }
            setFormData(prev => ({ ...prev, ...data }));
        }
    }, [vacation]);

    const formatData = (formData) => {
        return ({

            destination: formData.destination,
            duration: `${formData.duration} nights`,
            price: formData.price,
            currency: formData.currency,
            description: formData.description,
            accommodation: {
                name: formData.name,
                type: formData.type,
                rating: vacation ? vacation.accommodation.rating : 0.00,
                address: formData.address,
                amenities: formData.amenities.split(", ")
            },
            activities:
                formData.activities.split(", "),


            images:
                formData.images.split(", "),
            reviews: vacation ? vacation.reviews : []
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const clearForm = () => {
        setFormData({

            duration: "",
            destination: '',
            price: 0,
            currency: "",
            description: '',
            name: "",
            type: "",
            address: "",
            amenities: "",
            activities: "",
            images: "",
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = formatData(formData)

        try {
            dispatch(createVacationAsync(data));
            clearForm()
            navigate(`/vacations`);



            // Reset the form

        } catch (err) {
            console.error('Error creating Vacation offer:', err);
        }
    };

    const handleUpdated = async (e) => {
        e.preventDefault();
        try {
            const data = formatData(formData)

            const updatedVacation = dispatch(updatedVacationAsync({ formData: data, id: vacation._id }));
            if (updatedVacation) {
                clearForm()
                navigate(`/vacations/${vacation._id}`);
            }
            // Reset the form

        } catch (err) {
            console.error('Error updating Vacation offer:', err);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <form onSubmit={vacation.duration ? handleUpdated : handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{vacation.duration ? 'Update Vacation Offer' : 'Create Vacation Offer'}</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="destination">Destination</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="Destination" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
            </div>


            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" type="text" id="description" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="amenities">Amenities</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" type="text" id="amenities" name="amenities" placeholder="Smenities" value={formData.amenities} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name ">Name</label>
                <input className="w-full p-2 border border-gray-300 rounded" type=" text" id=" name" name="name" placeholder=" Name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="type ">Type</label>
                <input className="w-full p-2 border border-gray-300 rounded" type=" text" id=" type" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address ">Address</label>
                <input className="w-full p-2 border border-gray-300 rounded" type=" text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor=" activities">Activities</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" type=" text" id="activities" name="activities" placeholder=" Activities" value={formData.activities} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor=" images">Images</label>
                <textarea className="w-full p-2 border border-gray-300 rounded" type=" text" id="images" name="images" placeholder="images" value={formData.images} onChange={handleChange} required />
            </div>



            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="number" id="price" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="currency">Currency</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="currency" name="currency" placeholder="Currency" value={formData.currency} onChange={handleChange} required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="duration">Duration</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="text" id="duration" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
            </div>


            {!vacation.duration && <Button id="create" />}
            {vacation.duration && <Button id="updated" />}
            <Button id="clear" onClick={clearForm} />

        </form>
    );
};

export default VacationOfferForm;

