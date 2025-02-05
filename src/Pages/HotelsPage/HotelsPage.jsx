import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import SortList from '../../components/SortList/SortList';
import Searchbar from '../../components/Searchbar/Searchbar';
import { FaHotel } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import HotelSearchApi from '../../components/HotelSearchApi/HotelSearchApi';
import HotelBanner from '../../components/HotelBanner/HotelBanner';
import { Link } from 'react-router-dom';

const HotelsPage = () => {
  const isLoading = useSelector(state => state.hotels.loading);
  const hotels = useSelector(state => Object.values(state.hotels.hotels));
  const hotelSearch = useSelector(state => Object.values(state.hotelSearch.hotels));
  const user = useSelector(state => state.session.user);

  const [visibleCount, setVisibleCount] = useState(5);
  const visibleHotels = hotelSearch.slice(0, visibleCount);
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent}`;

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hotelSearch.length) {
    return (
      <>

        {user?.role !== "admin" && <Searchbar />}
        <HotelBanner />
        <div className="bg-white p-8"></div>
        <div className="mx-auto my-0 max-w-5xl">
          <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4 items-center">
              <h2 className="text-xl font-semibold mb-2 italic">Find your best hotel above:</h2>
              <SortList />
            </div>
            <ul>
              {visibleHotels.map(item => (
                <HotelSearchApi {...item} key={item.hotelId} />
              ))}
            </ul>
            {visibleCount < hotelSearch.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleShowMore}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition-all duration-300"
                >
                  SHOW MORE
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      <HotelBanner />
      <div className="mx-auto my-0 max-w-5xl">
        <div className="max-w-6xl mx-auto text-center py-12">
          <div className="flex items-center justify-center my-8">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <h2 className="text-center text-2xl font-bold text-blue-900">Reasons to book with DV</h2>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaHotel className="text-5xl text-blue-900 mb-4" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Twenty of hotels worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCreditCard className="text-5xl text-blue-900 mb-4" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Book now, pay later</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMobileScreenButton className="text-5xl text-blue-900 mb-4" />
              <p className="text-lg font-semibold text-blue-900 mb-2">Around-the-clock support through the Dream Voyage app</p>
            </div>
          </div>
        </div>

      </div>

      <div className="mx-auto my-0 max-w-5xl">
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl font-semibold mb-2 italic">Find your best hotel above:</h2>
            <SortList />
          </div>
          <ul>
            {visibleHotels.map(item => (
              <HotelSearchApi {...item} key={item.hotelId} />
            ))}
          </ul>
          {visibleCount < hotelSearch.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition-all duration-300"
              >
                SHOW MORE
              </button>
            </div>
          )}
        </div>
      </div>



      <div className="bg-blue-200 max-w-6xl mx-auto my-8 rounded-lg shadow-lg flex items-center">
        {/* Text Section */}
        <div className="w-1/2 p-4 text-center">
          <h2 className="text-xl font-bold text-blue-900 italic">HOTEL HIGHLIGHT</h2>
          <p className="text-sm text-gray-800 mt-4">
            Sea-facing rooms and a private beach make for a dreamy getaway at Jamaica’s Grand Decameron Cornwall Beach™.
            <Link
              to={bookingUrl}
              className="text-blue-700 font-medium hover:underline block mt-2"
            >
              Book on booking.com
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="relative md:col-span-2">
          <img
            src="https://media.istockphoto.com/id/1461608439/photo/las-vegas-bellagio-hotel.jpg?s=612x612&w=0&k=20&c=B3O5PPR03BaQGakZH3s223orCzWVaWsioZKAiK4LPwM="
            alt="Grand Decameron Cornwall Beach"
            className="rounded-lg shadow-lg w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <img
              src="https://st.depositphotos.com/1141099/1947/i/450/depositphotos_19478545-stock-photo-bellagio.jpg"
              className="w-28 h-14 object-contain"
              alt="Hotel Logo"
            />
          </div>
        </div>
      </div>


      <div className="bg-orange-50 p-8">
        <div className="max-w-4xl mx-auto text-gray-900">
          <p className="mb-4">
            Got your flights sorted and just need to find somewhere to stay? Good news – we’ve got thousands of hotels for you to choose from right around the globe. Plus, our bumper selection means there’s something in our range to suit every budget. From city-and-beach breaks on Spain’s south coast to Caribbean getaways, the hotels in our collection have got you covered no matter what type of holiday you’re after. And as well as sun and sand, you can pick from a selection of spots in big-name cities, too – from places close to home like Edinburgh and Manchester to European capitals and beyond.
          </p>
          <p>
            The best bit? We’ve taken the stress out of searching, with easy-to-use filters giving you the option to search by star rating, board basis and more. There are spots for all seasons, too, so whether you’re escaping the winter weather in the Canary Islands or making the most of the Med’s balmy temperatures in summer, we’ve got you covered. And, when it comes to choosing a place to stay, we’ve got everything from All Inclusive hotels to private apartments and huge villas that are great for big groups. All that’s left to do is start your search…
          </p>
        </div>
      </div>
    </>
  );
};

export default HotelsPage;








