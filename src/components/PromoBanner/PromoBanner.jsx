import React from 'react';


const PromoBanner = () => {

  const backgroundImageUrl = 'https://newsroom.aaa.com/wp-content/uploads/2018/10/20181011-cruise-trends-i519402493.jpg';

  return (
    <div
      className="relative bg-cover bg-center h-64 sm:h-80 lg:h-96 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        borderBottomLeftRadius: '100px',
        borderBottomRightRadius: '100px',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="relative z-10 flex flex-col items-start justify-center text-center sm:text-left px-4 sm:px-10">
        <div className="bg-white bg-opacity-80 p-3 sm:p-5 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-3">
            SAVE <span className="text-red-500">€200</span> ON MARELLA CRUISES
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 mb-2">
            Applicable on October, November & December 2025 cruises using your code.
          </p>
          <p className="text-gray-700 font-semibold mb-3 sm:mb-4 italic">
            Minimum 7 nights.
          </p>
          <a
            className="bg-blue-500 text-white text-sm sm:text-lg py-2 px-4 sm:px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            href="#seeDeal"
          >
            SEE DEALS
          </a>
        </div>
      </div>
    </div>
  );

}

export default PromoBanner;
