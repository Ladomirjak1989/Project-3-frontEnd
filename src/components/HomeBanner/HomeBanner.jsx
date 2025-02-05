import React from "react";

const HomeBanner = () => {
    return (
        <div
          className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1225346915/photo/lake-pehoe-torres-del-paine-patagonia-chile.jpg?s=612x612&w=0&k=20&c=RkY3CGPz8tdiSDs0hvJhc4kjqAU5LiD4AeR5aKm0Skc=')",
              borderBottomLeftRadius: '100px', // Заокруглення знизу зліва
              borderBottomRightRadius: '100px', // Заокруглення знизу справа
            }}
        >
          {/* Overlay for darkening the background */}
          <div className="absolute inset-0"></div>
    
          {/* Text Content */}
          <div className="relative text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
              Travel
            </h1>
            <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
              Quench your wanderlust with dreamy destinations, city guides, and
              travel tips from around the globe.
            </p>
            <p className="italic text-sm md:text-base drop-shadow-sm">
            "Life is too important to waste it on monotony. Travel and enjoy."
              <br />— Oscar Wilde
            </p>
          </div>
        </div>
      );
};

export default HomeBanner;
