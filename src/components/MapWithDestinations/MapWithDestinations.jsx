import React from 'react';

const MapWithDestinations = () => {
  const backgroundImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwgW9kjEQ42jMHzUoxT31o1k6xwfzwVgVNEW3AAVQByjbTsvJ1NOblt0DCfvlzeFnIj0&usqp=CAU';

  // return (
  //   <div>
  //     <h2 className='text-blue-900 font-semibold pl-40 text-2xl underline m-5'>Cruise destinations</h2>
  //   <div className="relative bg-cover bg-center h-[400px] w-full" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
  //     <div className="absolute top-[28%] left-[30%]">
  //       <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
  //         <span className="text-blue-900 font-semibold hover:underline">WESTERN MEDITERRANEAN</span>
  //       </div>
  //     </div>
  //     <div className="absolute top-[33%] left-[52%]">
  //       <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
  //         <span className="text-blue-900 font-semibold hover:underline">EASTERN MEDITERRANEAN</span>
  //       </div>
  //     </div>
  //     <div className="absolute top-[40%] left-[30%]">
  //       <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
  //         <span className="text-blue-900 font-semibold hover:underline">CANARY ISLANDS AND ATLANTIC</span>
  //       </div>
  //     </div>
  //     <div className="absolute top-[51%] left-[21%]">
  //       <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
  //         <span className="text-blue-900 font-semibold hover:underline">CARIBBEAN</span>
  //       </div>
  //     </div>
  //     <div className="absolute top-[47%] left-[65%]">
  //       <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
  //         <span className="text-blue-900 font-semibold hover:underline">NORTH AFRICA</span>
  //       </div>
  //     </div>
  //   </div>
  //   </div>
  // );


  return (
    <div>
      <h2 className="text-blue-900 font-semibold text-2xl underline m-5 text-center sm:text-left sm:pl-40">
        Cruise destinations
      </h2>

      <div className="relative bg-cover bg-center h-[400px] w-full" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        {/* Labels */}
        <div className="absolute top-[25%] left-[10%] sm:top-[28%] sm:left-[30%]">
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md text-center">
            <span className="text-blue-900 font-semibold hover:underline">WESTERN MEDITERRANEAN</span>
          </div>
        </div>

        <div className="absolute top-[35%] left-[50%] sm:top-[33%] sm:left-[52%]">
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md text-center">
            <span className="text-blue-900 font-semibold hover:underline">EASTERN MEDITERRANEAN</span>
          </div>
        </div>

        <div className="absolute top-[45%] left-[15%] sm:top-[40%] sm:left-[30%]">
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md text-center">
            <span className="text-blue-900 font-semibold hover:underline">CANARY ISLANDS AND ATLANTIC</span>
          </div>
        </div>

        <div className="absolute top-[55%] left-[5%] sm:top-[51%] sm:left-[21%]">
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md text-center">
            <span className="text-blue-900 font-semibold hover:underline">CARIBBEAN</span>
          </div>
        </div>

        <div className="absolute top-[50%] left-[65%] sm:top-[47%] sm:left-[65%]">
          <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md text-center">
            <span className="text-blue-900 font-semibold hover:underline">NORTH AFRICA</span>
          </div>
        </div>
      </div>
    </div>
  );

};

export default MapWithDestinations;


