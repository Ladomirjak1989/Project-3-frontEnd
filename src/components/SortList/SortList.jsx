import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSortedHotel } from '../../Store/Slices/hotelSearchSlice';
import { setSortedVacation } from '../../Store/Slices/vacationSearchSlice';

import { setSortOption } from '../../Store/Slices/sortSliceReducer';
import { setSortedAttraction } from '../../Store/Slices/attractionSliceReducer';


const SortList = () => {
    const dispatch = useDispatch();
    const vacation = useSelector(state => Object.values(state.vacations.vacations))
    const hotel = useSelector(state => Object.values(state.hotelSearch.hotels))
    const attraction = useSelector(state => Object.values(state.attraction.attractions))
    
    const { pathname } = useLocation()
    const sortOption = useSelector(state => state.sort.params);

    const [sortParams, setSortParams] = useState("")
    const [selectedSort, setSelectedSort] = useState("Our recommended");

    useEffect(() => {
        const location = pathname.split("/")
        setSortParams((prev) => {
            return location[2] || prev
        })
    }, [pathname])


    const sortingElement = (elementForSort, params) => {
        const [field, order] = params;

        return [...elementForSort].sort((a, b) => {
            let comparison = 0;
            // Sorting logic based on field

            if (field === "price") {
                if (a.price && a.price.amount) {
                    comparison = a.price.amount - b.price.amount;
                } else if (a.price) {
                    comparison = a.price - b.price
                } else {
                    comparison = a.randomPrice - b.randomPrice
                }
            } else if (field === "rating") {
                comparison = a.rating - b.rating; // Sort by rating
            } else if (field === "reviews") {
                comparison = a.randomReviews - b.randomReviews; // Sort by reviews
            }
            // Reverse order if descending
            return order === "DESC" ? -comparison : comparison;
        })
    }

    const handleSortChange = (event) => {
        const params = event.target.value.split("-")
        let sorted = []
        setSelectedSort(event.target.options[event.target.selectedIndex].text); // Змінює текст вибраного сортування

        if (sortParams === "hotels") {
            sorted = sortingElement(hotel, params)
            dispatch(setSortedHotel(sorted))
        }
        if (sortParams === "vacations") {
            sorted = sortingElement(vacation, params)
            dispatch(setSortedVacation(sorted));
        }
        if (sortParams === "attractions") {
            sorted = sortingElement(attraction, params)
            dispatch(setSortedAttraction(sorted));
        }
        dispatch(setSortOption(event.target.value));

    };

    return (
        <div className="relative inline-block text-left">
            <label className="block text-sm font-medium text-gray-700">SORT BY:</label>
            <select
                value={sortOption}
                onChange={handleSortChange}
                className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
                <option>Our recommended</option>
                <option value="price-ASC">Price - low to high</option>
                <option value="price-DESC">Price - high to low</option>
                <option value="rating-DESC">Rating - high to low</option>
                <option value="reviews-DESC">Reviews - high to low</option>
            </select>
        </div>
    );
};

export default SortList;
