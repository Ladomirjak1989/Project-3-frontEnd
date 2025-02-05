import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchCityByIdAsync } from '../../Store/Slices/fetchCitySliceReducer'
import Loader from '../../components/Loader/Loader'




const CityDetailsPage = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.city.loading)
  const city = useSelector(state => state.city.city)
  const currentLang = useSelector(state => state.language.language)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is a City Break?',
      answer: 'A city break is a short trip to any city – big or small. We’ve partnered with other airlines to take you to more cities in Europe and beyond.',
    },
    {
      question: 'How long should a City Break be?',
      answer: 'City breaks are typically short trips lasting between 2 to 5 days, making them perfect for a weekend getaway or a quick escape.',
    },
    {
      question: 'What are the best City Breaks in Europe?',
      answer: (
        <span>
          Some of the best city breaks in Europe include Paris, Amsterdam, Barcelona, London and Prague, known for their culture, food, and landmarks. Once you’ve decided on your perfect city break destination, take a look at the best{' '}
          <Link to={`/${currentLang}/attractions`} className="text-blue-600 hover:underline">
            things to do
          </Link>{' '}
          and start planning your holiday.
        </span>
      ),
    },
    {
      question: 'What should I pack for a City Break?',
      answer: 'Pack light! Essentials include comfortable walking shoes, weather-appropriate clothing, and travel-sized toiletries. A city break can easily be a hand luggage-only affair.',
    },
  ];

  useEffect(() => {
    dispatch(fetchCityByIdAsync(id))
  }, [id])

  if (loading) {
    return <Loader />
  }

  const {
    imgUrl,
    name,
    latitude,
    longitude,
    country,
    population,
    description
  } = city


  return (
    <div className="bg-gray-100 min-h-screen pb-12">

      <div className="container mx-auto pt-5">
        <div className="max-w-lg mx-auto flex flex-col items-center bg-gray-200 p-5 rounded-md gap-5">
          <img src={imgUrl} alt={name} className="max-w-full w-full" />
          <p><strong className="italic">Name:</strong> {name}</p>
          <p><strong className="italic">Latitude:</strong> {latitude}</p>
          <p><strong className="italic">Longitude:</strong> {longitude}</p>
          <p><strong className="italic">Country:</strong> {country}</p>
          <p><strong className="italic">Population:</strong> {population}</p>
          <p><strong className="italic">Description:</strong> {description}</p>
          <div className="flex justify-center gap-5 mt-5">
            <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" to={`/${currentLang}/flights`}>
              SHOW FLIGHTS
            </Link>
          </div>
        </div>
      </div>


      <div className="container max-w-7xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-lg shadow-md"
              onClick={() => toggleAccordion(index)}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 cursor-pointer">
                <h3 className="text-blue-900 font-bold">{faq.question}</h3>
                <span className="text-blue-900">{activeIndex === index ? '▲' : '▼'}</span>
              </div>
              {/* Answer */}
              {activeIndex === index && (
                <div className="p-4 bg-blue-50 rounded-b-lg text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="max-w-5xl mx-auto my-12 p-6 bg-amber-100 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Couldn’t find a City Break holiday?
        </h2>
        <p className="text-gray-700 mb-6">
          Why not browse through a wide range of our package holidays we offer.
        </p>
        <Link
          to={`/${currentLang}/vacations`}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
        >
          VIEW ALL PACKAGE HOLIDAYS
        </Link>
      </div>



    </div>



  )



}

export default CityDetailsPage