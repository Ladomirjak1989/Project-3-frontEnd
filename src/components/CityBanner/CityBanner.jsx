import React from "react";

const CityBanner = () => {
    return (
        <div
            className="relative w-full h-96 bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://www.agencyexpress.co.uk/wp-content/uploads/2019/12/Banner-1920x650-London-Skyline-1920x650.jpg')",
                borderBottomLeftRadius: '100px', // Заокруглення знизу зліва
                borderBottomRightRadius: '100px', // Заокруглення знизу справа
            }}
        >

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-start items-start text-center text-black p-4">
                <div className="bg-white bg-opacity-80 p-2 rounded-lg max-w-sm">
                    <p className="text-xl font-bold mb-4">
                        Discover the heartbeat of the city, where every corner tells a story.
                    </p>
                    <p className="text-lg italic">Your urban adventure starts here!</p>
                    <div className="arrow-down animate-bounce text-5xl text-indigo-900">
                        ↓
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CityBanner;