import React from 'react';



const ContactBanner = () => {

    const backgroundImageUrl = "https://img.freepik.com/premium-photo/beautifiul-underwater-panoramic-view-with-tropical-fish-coral-reefs_143092-1348.jpg"
  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="absolute inset-0"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="p-6 shadow-lg text-center max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Contact us</h1>
          <p className="text-2xl text-white">Here's how you can get in touch before, during or after your holiday.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
