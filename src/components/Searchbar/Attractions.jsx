import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { setDestination, setCheckInDate, setCheckOutDate } from '../../Store/Slices/attractionSearchSlice';
import bgImage from "../../assets/attraction/bgattraction.jpg";
import Button from '../Button/Button';
import { fetchAttractionAsync, fetchCityAsync } from '../../Store/Slices/fetchAttractionSliceAsync';

const Attractions = () => {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]); // Стан для збереження підказок
  const [destination, setDestinationInput] = useState('');
  const attractionSearch = useSelector((state) => state.attractionSearch);


  const handleInputChange = (e) => {
    setDestinationInput(e.target.value)
    dispatch(setDestination(e.target.value)); // Передайте в Redux
  };


  // Виконуємо пошук підказок, коли введено 2 або більше символів
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination && destination.length >= 2) {
        try {
          const result = await dispatch(fetchCityAsync(destination)).unwrap();
          if (result && Array.isArray(result.data)) {
            setSuggestions(result.data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("City suggestions search failed:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [destination, dispatch]);

  // Обробник для натискання на кнопку пошуку
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Отримання координат міста
      const coordinates = await dispatch(fetchCityAsync(destination)).unwrap();
      if (coordinates) {
        // Виконання пошуку атракцій
        await dispatch(fetchAttractionAsync(coordinates));
        setDestinationInput(''); // Очистка поля пошуку
        setSuggestions([]); // Очистка підказок
      } else {
        console.error("No coordinates found for the city.");
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // return (
  //   <div className="w-full h-screen bg-cover bg-center rounded-bl-[100px] rounded-br-[100px] "
  //     style={{ backgroundImage: `url(${bgImage})` }}>
  //     <div className="flex flex-col justify-center items-center h-full">
  //       <h1 className="text-5xl text-indigo-950 font-bold mb-4">DISCOVER THE WORLD WITH <span className='text-yellow-400'>Dream Voyage</span></h1>
  //       <p className="text-white text-2xl mb-8 italic font-bold">From activities to tours, the best experiences in your destination.</p>

  //       <form onSubmit={handleSearch} className="flex flex-col md:flex-row w-full max-w-5xl mx-auto">
  //         <div className="flex items-center bg-white rounded-l-full w-3/5 p-4">
  //           <FaSearch className="text-gray-400 mr-4" />
  //           <input
  //             type="text"
  //             name='destination'
  //             className="outline-none w-full text-lg"
  //             placeholder="Enter the city of destination"
  //             value={destination}
  //             onChange={handleInputChange}
  //           />
  //         </div>

  //         {/* Показуємо підказки, якщо є */}
  //         {suggestions.length > 0 && (
  //           <ul className="absolute bg-white w-3/5 mt-2 p-2 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
  //             {suggestions.map((city, index) => (
  //               <li
  //                 key={index}
  //                 className="p-2 hover:bg-gray-200 cursor-pointer"
  //                 onClick={() => {
  //                   setDestinationInput(city.name); // Вибираємо підказку
  //                   setSuggestions([]); // Очищаємо підказки
  //                 }}
  //               >
  //                 {city.name}, {city.countryCode}
  //               </li>
  //             ))}
  //           </ul>
  //         )}

  //         <div className="flex items-center bg-white p-4">
  //           <input
  //             type="date"
  //             name='departureDate'
  //             className="outline-none w-full text-lg px-2"
  //             value={attractionSearch.departureDate}
  //             // onChange={handleInputChange}
  //             onChange={(e) => dispatch(setCheckInDate(e.target.value))}
  //           />
  //         </div>

  //         <div className="flex items-center bg-white p-4">
  //           <input
  //             type="date"
  //             name='returnDate'
  //             className="outline-none w-full text-lg px-2"
  //             value={attractionSearch.returnDate}
  //             // onChange={handleInputChange}
  //             onChange={(e) => dispatch(setCheckOutDate(e.target.value))}
  //           />
  //         </div>

  //         <Button id="attractionSearch" />
  //       </form>
  //     </div>
  //   </div>
  // );


  return (
    <div className="w-full h-screen sm:h-auto bg-cover bg-center rounded-bl-[100px] rounded-br-[100px] px-4 sm:px-8 py-8 sm:py-12"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="flex flex-col justify-center items-center h-full sm:h-auto text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl text-indigo-950 font-bold mb-4">
          DISCOVER THE WORLD WITH <span className='text-yellow-400'>Dream Voyage</span>
        </h1>
        <p className="text-white text-lg sm:text-2xl mb-6 sm:mb-8 italic font-bold">
          From activities to tours, the best experiences in your destination.
        </p>

        {/* Форма пошуку */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full sm:w-full lg:max-w-5xl mx-auto space-y-3 sm:space-y-0 sm:space-x-3">

          {/* Поле вводу тексту */}
          <div className="flex items-center bg-white rounded-full w-full sm:w-3/5 p-4">
            <FaSearch className="text-gray-400 mr-4" />
            <input
              type="text"
              name='destination'
              className="outline-none w-full text-lg"
              placeholder="Enter the city of destination"
              value={destination}
              onChange={handleInputChange}
            />
          </div>

          {/* Підказки для міст */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white w-full sm:w-3/5 mt-2 p-2 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDestinationInput(city.name); // Вибираємо підказку
                    setSuggestions([]); // Очищаємо підказки
                  }}
                >
                  {city.name}, {city.countryCode}
                </li>
              ))}
            </ul>
          )}

          {/* Дата виїзду */}
          <div className="flex items-center bg-white p-4 w-full sm:w-auto rounded-full">
            <input
              type="date"
              name='departureDate'
              className="outline-none w-full text-lg px-2"
              value={attractionSearch.departureDate}
              onChange={(e) => dispatch(setCheckInDate(e.target.value))}
            />
          </div>

          {/* Дата повернення */}
          <div className="flex items-center bg-white p-4 w-full sm:w-auto rounded-full">
            <input
              type="date"
              name='returnDate'
              className="outline-none w-full text-lg px-2"
              value={attractionSearch.returnDate}
              onChange={(e) => dispatch(setCheckOutDate(e.target.value))}
            />
          </div>

          {/* Кнопка пошуку */}
          <Button id="attractionSearch" className="w-full sm:w-auto" />
        </form>
      </div>
    </div>
  );

};

export default Attractions;

