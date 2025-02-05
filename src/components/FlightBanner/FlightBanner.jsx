import React from "react";

const FlightBanner = () => {
  return (
    <div
      className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/936722270/photo/passenger-airplane-flying-above-clouds-view-from-the-window-plane-to-amazing-sky-at-the-sunset.jpg?s=612x612&w=0&k=20&c=_JqTWTMapwsOpi2HCBQOuCIdTChjLudqmyUOpntwuOo=')",
          borderBottomLeftRadius: '200px', 
          borderBottomRightRadius: '200px', 
        }}
    >
      {/* Overlay for darkening the background */}
      <div className="absolute inset-0"></div>

      {/* Text Content */}
      <div className="relative text-center text-black px-4">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg">
          <h2 className="text-lg font-bold md:text-2xl mb-6 drop-shadow-sm">
            Take Off to Your Next Adventure
          </h2>
          <p className="italic text-xl md:text-base drop-shadow-sm">
            "Explore the skies and discover new horizons. Book your dream flight today!"

          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightBanner;