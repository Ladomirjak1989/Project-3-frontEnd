import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../../../src/assets/aboutImage.avif';

const AboutPage = () => {


  return (
    <main className="py-4 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <picture className="relative bg-cover bg-center h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <img src={aboutImage} alt="about Dream Voyage" className="object-cover w-full h-full"/>
        </picture>
        <article className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            At <span className='text-orange-500 italic text-xl'>Dream Voyage</span>, we believe that travel is one of life's greatest adventures. Our mission is to make it easy and affordable for everyone to explore new destinations and create memories that will last a lifetime. As a one-stop shop for travel booking, we offer a wide range of options for  
            <Link to="/flights" className="text-blue-500 hover:underline"> flights</Link>, 
            <Link to="/hotels" className="text-blue-500 hover:underline"> hotels</Link>, 
            <Link to="/cities" className="text-blue-500 hover:underline"> city tours</Link>, 
            <Link to="/vacations" className="text-blue-500 hover:underline"> vacations</Link>, and 
            <Link to="/cruises" className="text-blue-500 hover:underline"> cruises</Link>, so you can create a customized itinerary that suits your needs and budget.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Our experienced travel experts are always on hand to help you plan and book your dream trip, whether you're planning a romantic getaway, a family vacation, or a solo adventure. We take pride in offering personalized service, competitive pricing, and a hassle-free booking experience. With <span className='text-orange-500 italic text-xl'>Dream Voyage</span>, you can rest assured that you're in good hands.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            We understand that travel is not just about the destination, but also the journey. That's why we offer a comprehensive travel guide to help you get the most out of your trip, including local recommendations, insider tips, and practical information. We also offer 24/7 customer support, so you can reach out to us at any time if you need help or have questions.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            So why wait? 🌞Discover the world with <span className='text-orange-500 italic text-xl'>Dream Voyage</span>!😀
          </p>
        </article>
      </div>
    </main>
  )
}

export default AboutPage;

