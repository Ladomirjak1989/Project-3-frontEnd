import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {

  const backgroundImageUrl = 'https://newsroom.aaa.com/wp-content/uploads/2018/10/20181011-cruise-trends-i519402493.jpg'; 
  const navigate = useNavigate();

  // const handleCruiseDeal = () => {
  //   navigate('/cruises/deal');
  // };

  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-20">
        <div className="bg-white bg-opacity-80 p-2 rounded-lg">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">SAVE <span className="text-red-600">€200</span> ON MARELLA CRUISES</h2>
          <p className="text-lg text-gray-700 mb-2">Applicable on October, November & December<br/> 2024 cruises using your code.</p>
          <p className="text-gray-700 mb-4">Minimum 7 nights. T&Cs apply.</p>
          {/* <button onClick={handleCruiseDeal} className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700">
            SEE DEALS
          </button> */}
          <a className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700" href='#seeDeal'>
          SEE DEALS
          </a>
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;
