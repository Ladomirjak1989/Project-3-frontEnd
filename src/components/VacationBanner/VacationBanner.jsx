import React from 'react';

const VacationBanner = () => {
    return (
        <div
            className="relative w-full h-screen bg-center"
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/1160947136/photo/couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island.jpg?s=612x612&w=0&k=20&c=WJWEH22TFinjI0edzblfH-Nw0cdBfPX5LV8EMvs8Quo=')",
                backgroundSize: 'cover', // Масштабування зображення
                backgroundRepeat: 'no-repeat',
                borderBottomLeftRadius: '200px', // Заокруглення знизу зліва
                borderBottomRightRadius: '200px', // Заокруглення знизу справа
            }}
        >
            {/* Текст поверх зображення */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black">
                <div className="bg-white bg-opacity-80 p-4 rounded-lg">
                    <h1 className="text-4xl font-bold mb-4">Escape the ordinary and embrace paradise.</h1>
                    <p className="text-lg italic">Your dream getaway is just a click away!</p>
                    <div className="arrow-down animate-bounce text-5xl text-indigo-900">
                        ↓
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacationBanner;



