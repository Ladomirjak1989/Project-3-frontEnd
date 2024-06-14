import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


// here users can see what trips are there, add them to the cart (in redux)
const HomePage = () => {
  const config = [
    {
      title: "Flights",
      link: "/flights",
      img: "https://www.hackmath.net/img/1/aircraft-02.jpg",
      linkText: "Book"

    },
    {
      title: "Vacations",
      link: "/vacations",
      img: "https://t3.ftcdn.net/jpg/06/70/80/84/360_F_670808419_2qVIxlfo2lT8U0QfWiwX21qidARG7M21.jpg",
      linkText: "Book"

    },
    {
      title: "Hotels",
      link: "/hotels",
      img: "https://media.licdn.com/dms/image/D4D12AQGxDdgsNCTOVQ/article-cover_image-shrink_720_1280/0/1698411417716?e=2147483647&v=beta&t=pMFaEPh6CwHETWB-sIIbXYfr_Teum6Kt1A7NJG3jrII",
      linkText: "Book"

    },
    {
      title: "Cruises",
      link: "/cruises",
      img: "https://www.carnival.com/-/media/images/ships/carnival-luminosa-open-for-sale-hero-mobile.jpg",
      linkText: "Book"

    },
    {
      title: "Cities",
      link: "/cities",
      img: "https://t3.ftcdn.net/jpg/00/99/12/34/360_F_99123407_CDVAXtMFWuayuO9VB8P8S687hZYqq6Js.jpg",
      linkText: "Show more..."

    },
    {
      title: "Attraction",
      link: "/attractions",
      img: "https://media.timeout.com/images/105473116/750/562/image.jpg",
      linkText: "Book"

    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.map(item => (
            <li key={item.title} alt={item.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
  );
};



export default HomePage