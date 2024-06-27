import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCruiseByIdAsync } from '../../Store/Slices/fetchCruiseSliceAsync';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

const CruiseDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.cruise.loading);
  const cruise = useSelector(state => state.cruise.cruise);

  const days = [
    {
      day: "DAY 1",
      location: "Bridgetown, Barbados",
      departure: "20:00",
      description: "A hypnotic calypso isle, Barbados is the ultimate Caribbean dream. And at just 21 miles by 14 miles, the island really is your oyster. Of course, it’s most famous for its palm-fringed beaches, but there’s more than talcum powder sands here. We’re talking a duty-free shopping scene and sights that are...",
      imageUrl: "https://www.barbadospocketguide.com/images/Articles/Tab_1_Bridgetown_resized_shutterstock_1243298509.jpg",
    },
    {
      day: "DAY 2",
      location: "Scarborough, Tobago",
      portTime: "09:00 - 19:00",
      description: "A bustling city seeped in history, Tobago’s capital offers up a snapshot of days gone by. Sprawled over the hillside, it’s overlooked by the Fort King George, a 17th-century hideout that sits proudly at the summit. Wander through the town to Upper Scarborough and take a look at the House of Assembly...",
      imageUrl: "https://pp.vk.me/c627718/v627718107/317a0/NxE9RmycwUs.jpg"
    },
    {
      day: "DAY 3",
      location: "St George's, Grenada",
      portTime: "08:00 - 18:00",
      description: "Grenada can’t fail to spice things up. It’s known as the ‘Spice Island’ after all. Wherever you head, the fragrant scent of ginger, almond, nutmeg and vanilla follows you. Plus you can see cinnamon, cocoa beans and every tropical fruit imaginable growing here. Alongside its basket of goodies, this lush...",
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/b8/1f/e6/the-old-watch-station.jpg?w=600&h=400&s=1"
    },
    {
      day: "DAY 4",
      location: "Kingstown, St Vincent",
      portTime: "08:00 - 18:00",
      description: "Somewhat unfairly, St Vincent is often overlooked in favour of its little brothers and sisters – the neighbouring Grenadines. But those who do stop here are in for a treat. Deserted beaches and untouched forest stretch for miles, interrupted only by the occasional cobbled town or dormant volcano. Kingstown...",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPYkjij64Wl7Nr_yHteCgxlamrUMIuPTxwIw&s"
    },
    {
      day: "DAY 5",
      location: "Castries, St Lucia",
      portTime: "08:00 - 19:00",
      description: "St Lucia’s skyline is high rise. But it’s not the hotels that make this island look serrated against the sky, it’s the mountains. The Pitons are 2 of the biggest. Both their summits tower at least 2,000 feet above sea level and their slopes are coiffured with a mane of dense green rainforest. At their...",
      imageUrl: "https://cdn.britannica.com/93/199393-050-6A59F3BE/Castries-Saint-Lucia.jpg"
    },
    {
      day: "DAY 6",
      location: "Pointe-A-Pitre, Guadeloupe",
      portTime: "08:00 - 18:00",
      description: "Flick through your French dictionary while sipping a Caribbean rum punch – Guadeloupe is where French and African influences fuse. This gorgeous spot is actually a bouquet of islands. There’s a scattering of little ones but the two main players are Basse-Terre and Grande-Terre. Together, they’re shaped...",
      imageUrl: "https://www.captaincruise.nl/wp-content/uploads/2020/10/Pointre-a-pitre-map.jpg"
    },
    {
      day: "DAY 7",
      location: "at sea...",
      imageUrl: "https://www.msccruises.nl/-/media/global-contents/destinations/ports/guadeloupe/pointe-a-pitre/cruise-to-pointe-a-pitre-guadeloupe.jpg?bc=transparent&as=1&dmc=0&iar=0&mh=1395&mw=2460&sc=0&thn=0&udi=0&hash=68D03D38C07FD6DED594E3DF03D7686B"
    },


  ];

  const [openDay, setOpenDay] = useState(null);
  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  useEffect(() => {
    dispatch(fetchCruiseByIdAsync(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (!cruise) {
    return <div>No Cruise details available.</div>;
  }

  const {
    images = [],
    name,
    type,
    departure,
    destination,
    description,
    duration,
    month,
    visitingCities = [],
    pricePerPerson,
    totalPrice,
    details = {},
    amenities = [],
  } = cruise;

  return (
    <div className="container mx-auto mt-7 max-w-5xl p-4">
      <div className="border border-dashed border-blue-400 p-4 rounded-lg text-center mb-6">
        <p className="text-blue-500 font-bold">
          USE OUR APP <span className="text-black">DreamVoyage</span> TO SAVE AN EXTRA <span className="text-black">€70</span> ON Cruise
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 underline text-center">
        Here is your detailed information about your selected Cruise! 😃
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {images.length > 0 && (
          <div className="flex flex-wrap -mx-2 mb-6">
            {images.map((image, index) => (
              <div key={index} className="w-1/3 px-2 mb-4">
                <img src={image} alt={`Image ${index + 1}`} className="w-full h-40 rounded-lg shadow-md object-cover" />
              </div>
            ))}
          </div>
        )}
        
        <div className="mb-6">
          <p><strong className="italic">Name:</strong> {name}</p>
          <p><strong className="italic">Type:</strong> {type}</p>
          <p><strong className="italic">Departure:</strong> {departure}</p>
          <p><strong className="italic">Destination:</strong> {destination}</p>
          <p><strong className="italic">Duration:</strong> {duration}</p>
          <p><strong className="italic">Month:</strong> {month}</p>
          <p><strong className="italic">Description:</strong> {details.description}</p>
        </div>

        {visitingCities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-600">Visiting Cities</h3>
            <ul className="list-disc list-inside text-gray-700">
              {visitingCities.map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
          </div>
        )}

        {amenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-600">Amenities</h3>
            <ul className="list-disc list-inside text-gray-700">
              {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <div className="text-xl font-bold text-cyan-800">Price pp: €{pricePerPerson}</div>
          <div className="text-md font-bold text-cyan-800 italic">Total price: €{totalPrice}</div>
          <div className="text-red-600">Includes €146 discount</div>
        </div>

        <div className="bg-lime-500 text-white text-center rounded-md p-2 mb-6">
          <p>PAY ONLY €250pp DEPOSIT TODAY</p>
        </div>

        <div className="flex justify-end">
        <Button id="book" />
        </div>
      </div>
      <h2 className='text-2xl font-semibold mb-6 underline italic pl-20'>YOUR ITINERARY</h2>
<div className="container mx-auto p-4">
  {days.map((day, index) => (
    <div key={index} className="mb-4">
      <div
        className={`flex justify-between items-center p-4 rounded-t-lg ${openDay === index ? 'bg-blue-100' : 'bg-blue-200'} cursor-pointer`}
        onClick={() => toggleDay(index)}
      >
        <div className="flex items-center">
          <div className="font-bold text-lg">{day.day}</div>
          <div className="ml-4">
            <div className="font-semibold">{day.location}</div>
            {day.departure && <div className="text-sm text-gray-700">🕒 Departs: {day.departure}</div>}
            {day.portTime && <div className="text-sm text-gray-700">🕒 Time in port: {day.portTime}</div>}
          </div>
        </div>
        <div className={`transform transition-transform ${openDay === index ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414l-4.293 4.293A1 1 0 014.293 8.707l5-5A1 1 0 0110 3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {openDay === index && (
        <div className="bg-white p-4 rounded-b-lg shadow-md">
          <div className="flex">
            <div className="w-2/3">
              <p className="text-gray-700 mb-4">{day.description}</p>
              {/* <a href="#" className="text-blue-500 hover:underline">More details</a> */}
            </div>
            <div className="w-1/3">
              <img src={day.imageUrl} alt={day.location} className="rounded-lg shadow-md object-cover h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
    </div>


  );
};

export default CruiseDetailsPage;

