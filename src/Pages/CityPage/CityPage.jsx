import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Searchbar from '../../components/Searchbar/Searchbar';
import Loader from "../../components/Loader/Loader";
import CityBanner from '../../components/CityBanner/CityBanner';
import { MdFlightTakeoff } from "react-icons/md";
import { FaHotel } from "react-icons/fa";

const CityPage = () => {
  const isLoading = useSelector(state => state.vacations.loading);
  const user = useSelector(state => state.session.user);
  const cities = useSelector(state => Object.values(state.city.cities));
  const citySearch = useSelector(state => Object.values(state.citySearch.cities));
  const currentLang = useSelector(state => state.language.language);
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent}`;

  if (isLoading) {
    return <Loader />;
  }

  if (citySearch.length) {
    return (
      <>
        {user?.role !== "admin" && <Searchbar />}
        <CityBanner />
        <div className='mx-auto my-0 max-w-5xl'>
          <div className="container mx-auto p-4">
            <div>
              <h2 className="flex justify-center text-4xl italic underline mb-12 mt-5">Top 10 best cities in the world: </h2>
              <ul className='grid grid-cols-3 gap-10 w-full mx-auto'>
                {citySearch.map((city) => (
                  <li key={city.id} className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-5 rounded-md">
                    <img src={city.imgUrl} alt={city.name} className="max-w-[350px] max-h-[300px] w-full h-4/5 pt-2" />
                    <h4 className="text-xl">{city.name}</h4>
                    <p>{city.country}</p>
                    <div>
                      <Link className='px-3 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-700 inline-block' to={`/${currentLang}/city-details/${city._id}`} >
                        Show more...
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      <CityBanner />
      <div className="mx-auto my-0 max-w-5xl">


        {/* Why Choose Section */}
        <div className="container mx-auto my-12">
          <div className="flex items-center justify-center my-8">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <h2 className="text-center text-2xl font-bold text-blue-900">Why choose a DV city break?</h2>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <MdFlightTakeoff className='size-8' />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">FLEXIBLE FLYING</h3>
              <p className="text-gray-700">
                We’ve partnered with leading airlines to give you more choice on where and when you fly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <FaHotel className='size-8' />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">HANDPICKED HOTELS</h3>
              <p className="text-gray-700">
                Our handpicked hotels are all within easy reach of the top sights.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <p className='text-3xl'>👍</p>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">HASSLE-FREE</h3>
              <p className="text-gray-700">
                All our city breaks come with flights and a hotel rolled into one handy package.
              </p>
            </div>

          </div>

        </div>
        <hr className="border-gray-300 mb-2" />



        {/* Список міст */}
        <div className="container mx-auto p-4">
          <div>
            <h2 className="flex justify-center text-4xl italic underline mb-12 mt-5">Top 10 best cities in the world: </h2>
            <ul className="grid grid-cols-3 gap-10 w-full mx-auto">
              {cities.map((city) => (
                <li key={city.id} className="flex flex-col gap-2 items-center justify-center bg-gray-100 p-5 rounded-md">
                  <img src={city.imgUrl} alt={city.name} className="max-w-[350px] max-h-[300px] w-full h-4/5 pt-2" />
                  <h4 className="text-xl">{city.name}</h4>
                  <p>{city.country}</p>
                  <div>
                    <Link
                      className="px-3 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-700 inline-block"
                      to={`/${currentLang}/city-details/${city._id}`}
                    >
                      SHOW MORE...
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* Нова секція */}
      <div className="flex flex-wrap max-w-7xl items-center bg-orange-100 rounded-md shadow-md ml-32">
        {/* Зображення ліворуч */}
        <div className="md:w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/038/908/604/small_2x/aerial-view-of-the-iconic-tower-bridge-connecting-londong-with-southwark-photo.jpg"
            alt="City"
            className="rounded-md"
          />
        </div>
        {/* Текст праворуч */}
        <div className="w-full md:w-1/2 p-2">
          <h3 className="text-2xl font-bold mb-2 text-blue-900">City Breaks</h3>
          <h4 className="text-lg mb-4 text-indigo-800">HOLIDAYS TO THE WORLD’S MOST ICONIC CITIES</h4>
          <hr className="border-gray-500 mb-4" />
          <ul className="list-disc pl-5 space-y-2 text-gray-700 columns-2 gap-4">
            <li>Flights with leading airlines, giving you more choice on when and where you fly.</li>
            <li>Hotels in central locations, including a range of 3T to 5T properties to suit your budget.</li>
            <li>On selected holidays, you can upgrade your booking to include a hassle-free coach transfer.</li>
            <li>Our city breaks are ABTA & ATOL-protected, and come with 24-hour support via our HolidayLine.</li>
          </ul>

        </div>
      </div>

      
      
      {/* New Section: Where Can Our City Breaks Take You? */}
      <div className="container max-w-7xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">
          WHERE CAN OUR CITY BREAKS TAKE YOU?
        </h2>
        <p className="text-gray-700 text-center mb-6">
          From weekends in Europe to adventures in far-flung destinations, our city breaks come in all shapes and sizes.{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            Barcelona
          </Link>{" "}
          serves up striking architecture with a side of sunshine.{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            Amsterdam
          </Link>{" "}
          is a favourite with culture vultures thanks to its bushel of museums. And{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            Lisbon
          </Link>
          ’s pretty, cobbled streets make it another one of Europe’s highlights.
        </p>
        <p className="text-gray-700 text-center mb-6">
          Further afield, the USA has some firm contenders for the world’s best city break – stroll around Central Park in{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            New York City
          </Link>
          , or experience the legendary nightlife{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            Las Vegas
          </Link>{" "}
          has to offer. Meanwhile, in the United Arab Emirates,{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            Dubai
          </Link>{" "}
          has a super-modern skyline to write home about.
        </p>
        <p className="text-gray-700 text-center">
          No matter where you end up, we’ve got a handpicked selection of centrally located hotels, and offer a range of{" "}
          <Link to={bookingUrl} className="text-blue-600 hover:underline">
            expert-led experiences
          </Link>{" "}
          to help you explore. So, even if you’re looking at a last-minute city break, you can relax knowing everything’s sorted.
        </p>
      </div>

    </>
  );
};

export default CityPage;
