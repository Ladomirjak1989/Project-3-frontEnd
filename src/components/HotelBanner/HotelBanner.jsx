import React from 'react';

const HotelBanner = () => {
    return (
        <div className="relative w-full h-80 bg-cover bg-center" 
        style={{ 
            backgroundImage: "url('https://res.cloudinary.com/simplotel/image/upload/w_5000,h_2778/x_37,y_427,w_4935,h_1923,c_crop,q_80,fl_progressive/w_900,h_506,f_auto,c_fit/the-bristol-hotel-gurgaon/4_Swimming_Pool_CC2FCF_SH_l1si3f')", 
            borderBottomLeftRadius: '200px', // Заокруглення знизу зліва
            borderBottomRightRadius: '200px', // Заокруглення знизу справа
            }}>
            <div className="absolute inset-0 "></div> {/* Dark overlay */}

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black">
                <div className='bg-white bg-opacity-80 p-2 rounded-lg'>
                    <h1 className="text-4xl font-bold mb-4">Hotel only deals, sorted</h1>
                    <p className="text-lg">Browse over 150,000 incredible deals worldwide</p>
                </div>
            </div>
        </div>
    );
};

export default HotelBanner;
