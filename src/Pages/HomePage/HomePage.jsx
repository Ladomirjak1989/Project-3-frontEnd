import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VacationDeals from '../../components/VacationDeals/VacationDeals';
import Searchbar from '../../components/Searchbar/Searchbar';
import { useSelector } from 'react-redux';

// here users can see what trips are there, add them to the cart (in redux)
const HomePage = () => {

  const user = useSelector(state => state.session.user);

  const budgetDeals = [
    { amount: '€300', description: 'Deals up to €300pp', link: '/deals/300' },
    { amount: '€500', description: 'Deals up to €500pp', link: '/deals/500' },
    { amount: '€1000', description: 'Deals up to €1000pp', link: '/deals/1000' },
  ];

  const config = [
    {
      title: "Flights",
      link: "/flights",
      img: "https://www.hackmath.net/img/1/aircraft-02.jpg",
      linkText: "BOOK"
    },
    {
      title: "Vacations",
      link: "/vacations",
      img: "https://t3.ftcdn.net/jpg/06/70/80/84/360_F_670808419_2qVIxlfo2lT8U0QfWiwX21qidARG7M21.jpg",
      linkText: "BOOK"
    },
    {
      title: "Hotels",
      link: "/hotels",
      img: "https://media.licdn.com/dms/image/D4D12AQGxDdgsNCTOVQ/article-cover_image-shrink_720_1280/0/1698411417716?e=2147483647&v=beta&t=pMFaEPh6CwHETWB-sIIbXYfr_Teum6Kt1A7NJG3jrII",
      linkText: "BOOK"
    },
    {
      title: "Cruises",
      link: "/cruises",
      img: "https://www.carnival.com/-/media/images/ships/carnival-luminosa-open-for-sale-hero-mobile.jpg",
      linkText: "BOOK"
    },
    {
      title: "Cities",
      link: "/cities",
      img: "https://t3.ftcdn.net/jpg/00/99/12/34/360_F_99123407_CDVAXtMFWuayuO9VB8P8S687hZYqq6Js.jpg",
      linkText: "SHOW MORE..."
    },
    {
      title: "Attraction",
      link: "/attractions",
      img: "https://media.timeout.com/images/105473116/750/562/image.jpg",
      linkText: "BOOK"
    },
  ];


  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      <div className='mx-auto my-0 max-w-5xl'>
        <div className="container mx-auto py-8">
          <div className="py-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find the holiday that suits you...</h2>
            <p className="text-lg text-gray-700">Our huge range of holidays includes everything from globetrotting tours and adventures at sea to beach-based getaways in Europe and beyond.</p>
          </div>
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.map(item => (
                <li key={item.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img className="w-full h-60 object-cover" src={item.img} alt={item.title} />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <Link to={item.link}
                      className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                      {item.linkText}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <VacationDeals count={10} />


        <div className="mx-auto p-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Travelling on a budget</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {budgetDeals.map((deal, index) => (
              <div key={index} className="bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Up to</h3>
                  <p className="text-4xl font-bold mb-4">{deal.amount}pp</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">{deal.description}</p>
                  <Link to={deal.link} className="text-blue-500 hover:text-blue-700 text-2xl">
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
