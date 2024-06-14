import React from 'react'
import { Link } from 'react-router-dom'

const PopUp = ({onClick}) => {
    const config = [{
        title: "Create Flight",
        link: "/flights/flight-new",

    },

    {
        link: '/vacations/vacation-new',
        title: 'Create Vacations',
    },
    {
        link: '/hotels/hotel-new',
        title: 'Create Hotels',
    },

    {
        link: '/cruises/cruise-new',
        title: 'Create Cruises',
    },
    {
        link: '/attractions/attraction-new',
        title: 'Create Attraction',
    },

    {
        link: '/cities/city-new',
        title: 'Create City',
    },
    ]
    return (
        <ul className='absolute bg-slate-50 w-48 m-2  flex flex-col gap-2 rounded shadow-lg'>
            {
                config.map(item => (
                    <li key={item.title} className="hover:bg-slate-200 rounded">
                        <Link to={item.link} className="block px-4 py-2">
                            {item.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default PopUp