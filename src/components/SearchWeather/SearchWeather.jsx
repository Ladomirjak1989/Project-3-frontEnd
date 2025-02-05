import React, { useState } from 'react';
import Button from '../Button/Button';

const SearchWeather = ({ onSearch, suggestions, onCityChange, onSuggestionClick }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city !== '') {
      onSearch(city);
      setCity(''); // Очищуємо стан поля
    }
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    onCityChange(value); // Викликаємо функцію для пошуку підказок
  };

  const handleSuggestionClick = (suggestedCity) => {
    onSuggestionClick(suggestedCity);
    setCity(''); // Очищуємо поле після вибору підказки
  };

  return (
    <div className="relative w-1/2 mx-auto"> {/* Встановлюємо ширину контейнера */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center mb-6 space-x-2">
        {/* Встановлюємо флексбокс та проміжок між елементами */}
        <input
          type="text"
          className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <Button id="searchButton" />
      </form>

      {/* Показуємо підказки міст */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full w-full bg-white border-2 border-black rounded-lg z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion.name)} // Виклик очищення після вибору
            >
              {suggestion.name}, {suggestion.region}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWeather;





