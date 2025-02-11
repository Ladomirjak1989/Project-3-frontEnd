import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchWeather from '../SearchWeather/SearchWeather';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import assets from "../../assets/weather/cloudnoresult.jpeg"


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [city, setCity] = useState("")
  const [suggestions, setSuggestions] = useState([]);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Функція для отримання дати та місяця
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // отримати день місяця
    const month = date.toLocaleString('default', { month: 'short' }); // отримати скорочену назву місяця
    return `${day} ${month}`;
  };



  const VITE_WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

  // Функція для отримання підказок міст (autocomplete)
  const fetchCitySuggestions = async (query) => {
    if (query.length >= 2) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${VITE_WEATHER_KEY}&q=${query}`
        );
        setSuggestions(response.data);
      } catch (err) {
        setError('Unable to fetch city suggestions');
      }
    } else {
      setSuggestions([]); // Очищуємо підказки, якщо менше ніж 2 символи
    }
  };

  // Функція для отримання погоди по місту
  const fetchWeather = async (city) => {
    try {

      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${VITE_WEATHER_KEY}&q=${city}&days=14`
      );
      setCity(city)
      setWeatherData(response.data);
      setError('');
      setSuggestions([]); // Очищуємо підказки після пошуку
    } catch (err) {
      setError('City not found. Please try again!');
      setWeatherData(null);
    }
  };

  // Обробка зміни в полі введення
  const handleCityChange = (inputValue) => {
    setCity(inputValue);
    if (inputValue.length >= 2) {
      fetchCitySuggestions(inputValue); // Отримуємо підказки, коли введено 2 і більше символів
    }
  };

  // Обробка кліку на підказку
  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setSuggestions([]); // Очищуємо підказки після вибору міста
    fetchWeather(suggestedCity);
  };

  useEffect(() => {
    // Початковий пошук для випадкового міста
    const cities = ["Amsterdam", "Madrid", "Kyyiv"]

    // / Generate a random index based on the length of the cities array
    const randomIndex = Math.floor(Math.random() * cities.length);

    // Select the city at the random index
    const randomCity = cities[randomIndex];
    setCity(randomCity)
    fetchWeather(randomCity)
  }, [])


  // return (
  //   <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[url('assets/weather/weatherbg.jpg')] bg-cover bg-center py-10 px-4">
  //     <div className="w-full max-w-4xl bg-opacity-80 rounded-lg p-6">
  //       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
  //         Find the best weather that fits you the best
  //       </h1>

  //       <SearchWeather onSearch={fetchWeather}
  //         suggestions={suggestions}
  //         onCityChange={handleCityChange}
  //         onSuggestionClick={handleSuggestionClick}
  //       />

  //       {/* Error handling with image */}
  //       {error && (
  //         <div className="text-center">
  //           <p className="text-red-600 text-3xl text-center mt-4">{error}</p>
  //           <img
  //             src={assets}
  //             className="mx-auto mt-4 w-25 h-25"
  //           />
  //         </div>
  //       )}


  //       {weatherData && (
  //         <div className="mt-8">

  //           {/* City and general weather information */}
  //           <div className="flex items-center justify-between mb-4">
  //             <div>
  //               <h2 className="text-4xl font-bold text-gray-800">{city}</h2>
  //               <p className="text-xl text-gray-900">
  //                 {weatherData.location.region}, {weatherData.location.country}
  //               </p>
  //               <p className="text-sm text-gray-800">{weatherData.location.localtime}</p>
  //             </div>

  //             <div className="flex items-center space-x-6">
  //               <img
  //                 src={weatherData.current.condition.icon}
  //                 alt={weatherData.current.condition.text}
  //                 className="w-40 h-40"
  //               />
  //               <div>
  //                 <p className="text-5xl font-semibold text-gray-800">
  //                   {weatherData.current.temp_c}°C
  //                 </p>
  //                 <p className="text-lg text-gray-700">{weatherData.current.condition.text}</p>
  //                 <p className="text-sm text-gray-700">
  //                   {weatherData.current.is_day === 1 ? 'Day' : 'Night'}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Astro Details */}


  //           <div className="grid grid-cols-2 gap-6 mb-4">
  //             <div>
  //               <p className="text-lg font-medium text-gray-800 italic"><span className='underline'>Sunrise:</span> {weatherData.forecast.forecastday[0].astro.sunrise}</p>
  //               <p className="text-lg font-medium text-gray-800 italic"><span className='underline'>Sunset:</span> {weatherData.forecast.forecastday[0].astro.sunset}</p>
  //             </div>
  //             <div>
  //               <p className="text-lg font-medium text-gray-800 italic"><span className='underline'>Moonrise:</span> {weatherData.forecast.forecastday[0].astro.moonrise}</p>
  //               <p className="text-lg font-medium text-gray-800 italic"><span className='underline'>Moonset:</span> {weatherData.forecast.forecastday[0].astro.moonset}</p>
  //             </div>
  //           </div>



  //           {/* Daily Forecast */}
  //           <div className="mt-4">
  //             <h3 className="text-2xl font-semibold text-gray-800 mb-4">Daily Weather Forecast</h3>

  //             <Swiper
  //               spaceBetween={16}
  //               slidesPerView={2}
  //               navigation={true}
  //               breakpoints={{
  //                 640: { slidesPerView: 3 },
  //                 768: { slidesPerView: 4 },
  //                 1024: { slidesPerView: 6 },
  //               }}
  //               modules={[Navigation]}
  //               className="mySwiper"
  //             >
  //               {weatherData.forecast.forecastday.slice(0, 14).map((item) => (
  //                 <SwiperSlide key={item.date}>
  //                   <div className="flex min-h-[220px] flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
  //                     <span className="text-lg font-medium text-gray-800">
  //                       {formatDate(item.date)}
  //                     </span>
  //                     <span className="text-lg font-medium text-gray-800">
  //                       {`${weekDays[new Date(item.date).getDay()]}`}
  //                     </span>
  //                     <img
  //                       src={item.day.condition.icon}
  //                       alt={item.day.condition.text}
  //                       className="w-14 h-14 my-2"
  //                     />
  //                     <span className="text-sm text-gray-600">{item.day.condition.text}</span>
  //                     <span className="text-sm text-gray-600">{item.day.avgtemp_c}°C</span> {/* Updated to item.day.avgtemp_c */}
  //                   </div>
  //                 </SwiperSlide>
  //               ))}
  //             </Swiper>
  //           </div>



  //           {/* Hourly forecast*/}
  //           <div className="mt-4">
  //             <h3 className="text-2xl font-semibold text-gray-800 mb-4">
  //               Hourly Weather Forecast (Current and Next Day)
  //             </h3>
  //             <Swiper
  //               spaceBetween={16}
  //               slidesPerView={2}
  //               navigation={true}
  //               breakpoints={{
  //                 640: { slidesPerView: 3 },
  //                 768: { slidesPerView: 4 },
  //                 1024: { slidesPerView: 6 },
  //               }}
  //               modules={[Navigation]}
  //               className="mySwiper"
  //             >
  //               {weatherData.forecast.forecastday
  //                 .slice(0, 2) // Take only the current day and next day
  //                 .flatMap((day, dayIndex) =>
  //                   day.hour
  //                     .filter((hour) => {
  //                       // For the current day, only show future hours
  //                       const currentDate = new Date();
  //                       const hourDate = new Date(hour.time);
  //                       return dayIndex === 0 ? currentDate < hourDate : true;
  //                     })
  //                     .map((hour, index) => (
  //                       <SwiperSlide key={`${dayIndex}-${index}`}>
  //                         <div className="flex min-h-[220px] flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
  //                           <span className="text-lg font-medium text-gray-800">
  //                             {new Date(hour.time).getHours()}:00
  //                           </span>
  //                           <img
  //                             src={hour.condition.icon}
  //                             alt={hour.condition.text}
  //                             className="w-14 h-14 my-2"
  //                           />
  //                           <span className="text-sm text-gray-600">{hour.condition.text}</span>
  //                           <span className="text-sm text-gray-600">{hour.temp_c}°C</span>
  //                         </div>
  //                       </SwiperSlide>
  //                     ))
  //                 )}
  //             </Swiper>
  //           </div>




  //           {/* Forecast Details */}
  //           <div className="mt-8 text-center">
  //             <p className="text-lg font-medium text-gray-800 italic">
  //               <span className='underline'>Avg Temp:</span> {weatherData.forecast.forecastday[0].day.avgtemp_c}°C
  //             </p>
  //             <p className="text-lg font-medium text-gray-800 italic">
  //               <span className='underline'>Avg Visibility:</span> {weatherData.forecast.forecastday[0].day.avgvis_km} km
  //             </p>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[url('assets/weather/weatherbg.jpg')] bg-cover bg-center py-6 sm:py-10 px-3 sm:px-4">
      <div className="w-full max-w-4xl bg-opacity-80 rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-4 sm:mb-8">
          Find the best weather that fits you the best
        </h1>

        <SearchWeather
          onSearch={fetchWeather}
          suggestions={suggestions}
          onCityChange={handleCityChange}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Error handling with image */}
        {error && (
          <div className="text-center">
            <p className="text-red-600 text-xl sm:text-3xl text-center mt-4">{error}</p>
            <img src={assets} className="mx-auto mt-4 w-20 sm:w-25 h-20 sm:h-25" />
          </div>
        )}

        {weatherData && (
          <div className="mt-6 sm:mt-8">

            {/* City and general weather information */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">{city}</h2>
                <p className="text-lg sm:text-xl text-gray-900">
                  {weatherData.location.region}, {weatherData.location.country}
                </p>
                <p className="text-sm sm:text-md text-gray-800">{weatherData.location.localtime}</p>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                  className="w-20 sm:w-40 h-20 sm:h-40"
                />
                <div className="text-center sm:text-left">
                  <p className="text-3xl sm:text-5xl font-semibold text-gray-800">
                    {weatherData.current.temp_c}°C
                  </p>
                  <p className="text-md sm:text-lg text-gray-700">{weatherData.current.condition.text}</p>
                  <p className="text-sm sm:text-md text-gray-700">
                    {weatherData.current.is_day === 1 ? 'Day' : 'Night'}
                  </p>
                </div>
              </div>
            </div>

            {/* Astro Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
              <div>
                <p className="text-md sm:text-lg font-medium text-gray-800 italic">
                  <span className='underline'>Sunrise:</span> {weatherData.forecast.forecastday[0].astro.sunrise}
                </p>
                <p className="text-md sm:text-lg font-medium text-gray-800 italic">
                  <span className='underline'>Sunset:</span> {weatherData.forecast.forecastday[0].astro.sunset}
                </p>
              </div>
              <div>
                <p className="text-md sm:text-lg font-medium text-gray-800 italic">
                  <span className='underline'>Moonrise:</span> {weatherData.forecast.forecastday[0].astro.moonrise}
                </p>
                <p className="text-md sm:text-lg font-medium text-gray-800 italic">
                  <span className='underline'>Moonset:</span> {weatherData.forecast.forecastday[0].astro.moonset}
                </p>
              </div>
            </div>

            {/* Daily Forecast */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Daily Weather Forecast
              </h3>

              <Swiper
                spaceBetween={12}
                slidesPerView={1.5}
                navigation={true}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {weatherData.forecast.forecastday.slice(0, 14).map((item) => (
                  <SwiperSlide key={item.date}>
                    <div className="flex min-h-[180px] sm:min-h-[220px] flex-col items-center bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm">
                      <span className="text-md sm:text-lg font-medium text-gray-800">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-md sm:text-lg font-medium text-gray-800">
                        {`${weekDays[new Date(item.date).getDay()]}`}
                      </span>
                      <img
                        src={item.day.condition.icon}
                        alt={item.day.condition.text}
                        className="w-10 sm:w-14 h-10 sm:h-14 my-2"
                      />
                      <span className="text-sm text-gray-600">{item.day.condition.text}</span>
                      <span className="text-sm text-gray-600">{item.day.avgtemp_c}°C</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Hourly forecast */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Hourly Weather Forecast (Current and Next Day)
              </h3>
              <Swiper
                spaceBetween={12}
                slidesPerView={2}
                navigation={true}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {weatherData.forecast.forecastday
                  .slice(0, 2)
                  .flatMap((day, dayIndex) =>
                    day.hour
                      .filter((hour) => {
                        const currentDate = new Date();
                        const hourDate = new Date(hour.time);
                        return dayIndex === 0 ? currentDate < hourDate : true;
                      })
                      .map((hour, index) => (
                        <SwiperSlide key={`${dayIndex}-${index}`}>
                          <div className="flex min-h-[180px] sm:min-h-[220px] flex-col items-center bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm">
                            <span className="text-md sm:text-lg font-medium text-gray-800">
                              {new Date(hour.time).getHours()}:00
                            </span>
                            <img
                              src={hour.condition.icon}
                              alt={hour.condition.text}
                              className="w-10 sm:w-14 h-10 sm:h-14 my-2"
                            />
                            <span className="text-sm text-gray-600">{hour.condition.text}</span>
                            <span className="text-sm text-gray-600">{hour.temp_c}°C</span>
                          </div>
                        </SwiperSlide>
                      ))
                  )}
              </Swiper>
            </div>

            {/* Forecast Details */}
            <div className="mt-8 text-center">
              <p className="text-lg font-medium text-gray-800 italic">
                <span className='underline'>Avg Temp:</span> {weatherData.forecast.forecastday[0].day.avgtemp_c}°C
              </p>
              <p className="text-lg font-medium text-gray-800 italic">
                <span className='underline'>Avg Visibility:</span> {weatherData.forecast.forecastday[0].day.avgvis_km} km
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );


}

export default Weather;




