import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorted } from '../../Store/Slices/vacationSliceReducer';
import { setSortOption } from '../../Store/Slices/sortSliceReducer';
import { useLocation } from 'react-router-dom';
import { setSortedHotel } from '../../Store/Slices/hotelSliceReducer';




const SortList = () => {
    const dispatch = useDispatch();
    const vacation = useSelector(state => Object.values(state.vacations.vacations))
    const hotel = useSelector(state => Object.values(state.hotels.hotels))
    const { pathname } = useLocation()
    const sortOption = useSelector(state => state.sort.params);

    const [sortParams, setSortParams] = useState("")

    useEffect(() => {
        const location = pathname.split("/")

        setSortParams((prev) => {
            return location[1] || prev
        })
    }, [pathname])

    const sortingElement = (elementForSort, params) => {
        return elementForSort.toSorted((a, b) => {
            if (params[0] === "rating") {
               
                return b.accommodation[params[0]] - a.accommodation[params[0]]
            }
           

            if (params[0] === "reviews") {
                
                return b.randomReviews - a.randomReviews
            }
            if (params[1] === "ASC") {
                
                return a[params[0]] - b[params[0]]

            }
            if (params[1] === "DESC") {
               
                return b[params[0]] - a[params[0]]
            }


        })
    }

    const handleSortChange = (event) => {
        const params = event.target.value.split("-")
        let sorted = []
        if (sortParams === "hotels") {
            sorted = sortingElement(hotel, params)
            dispatch(setSortedHotel(sorted))
        }
        if(sortParams==="vacations"){
            sorted = sortingElement(vacation, params)
            dispatch(setSorted(sorted));
        }

       
       
        dispatch(setSortOption(event.target.value))

    };

    return (
        <div className="relative inline-block text-left">
            <label className="block text-sm font-medium text-gray-700">Sort by:</label>
            <select
                value={sortOption}
                onChange={handleSortChange}
                className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
                <option>Our recommended</option>
                <option value="price-ASC">Price - low to high</option>
                <option value="price-DESC">Price - high to low</option>
                <option value="rating-DESC">Rating</option>
                <option value="reviews-DESC">Reviews</option>
            </select>
        </div>
    );
};

export default SortList;
