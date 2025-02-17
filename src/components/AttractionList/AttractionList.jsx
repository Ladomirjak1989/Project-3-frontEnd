import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AttractionEl from '../AttractionEl/AttractionEl';


const kindOfAttractions = ["ALL", "EXCURSIONS & DAY TRIPS", "ATTRACTIONS & GUIDED TOURS", "ACTIVITIES"];

const AttractionList = ({ attractions, index }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [count, setCount] = useState(0);
    const [currentItems, setCurrentItems] = useState([])



    useEffect(() => {
        // Filter attractions based on the selected category
        const category = kindOfAttractions[index];
        const filteredAttractions = category === "ALL"
            ? attractions
            : attractions.filter(item => item.kindOfAttractions === category);

        setCount(Math.ceil(filteredAttractions.length / itemsPerPage));
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredAttractions.slice(indexOfFirstItem, indexOfLastItem);

        setCurrentItems(currentItems)
    }, [attractions, attractions.length, index, currentPage]);


    // Page change handler
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            {/* List of attractions for the current page */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {currentItems.map((item) => (
                    <AttractionEl {...item} key={item.id} />
                ))}
            </ul>

            {/* Pagination */}
            <Stack spacing={2} className="mt-6 sm:mt-8 flex justify-center">
                <Pagination
                    count={count}
                    page={currentPage}
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                    size="medium"
                />
            </Stack>
        </div>
    );
};

export default AttractionList;





