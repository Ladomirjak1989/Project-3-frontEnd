import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import VacationEl from '../../components/VacationEl/VacationEl';
import SortList from '../../components/SortList/SortList';
import Searchbar from '../../components/Searchbar/Searchbar';
import { CiSun } from "react-icons/ci";
import { FaUmbrellaBeach } from "react-icons/fa";
import { PiVolleyballLight } from "react-icons/pi";
import { IoIosBed } from "react-icons/io";
import VacationBanner from '../../components/VacationBanner/VacationBanner';

const VacationPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const isLoading = useSelector(state => state.vacations.loading);
  const vacations = useSelector(state => Object.values(state.vacations.vacations));
  const vacationSearch = useSelector(state => Object.values(state.vacationSearch.vacations));
  const user = useSelector(state => state.session.user);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (vacationSearch.length) {
    return (
      <>
        {user?.role !== "admin" && <Searchbar />}
        <VacationBanner />
        <div className='mx-auto my-0 max-w-5xl'>
          <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4 items-center">
              <h2 className='text-xl font-semibold mb-2 italic'>Find your best vacation below:</h2>
              <SortList />
            </div>
            <ul>
              {vacationSearch.map(item => (
                <VacationEl {...item} key={item._id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      <VacationBanner />
      <div className='mx-auto my-0 max-w-5xl'>
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4 items-center">
            <h2 className='text-xl font-semibold mb-2 italic'>Find your best vacation below:</h2>
            <SortList />
          </div>
          <ul>
            {vacations.map(item => (
              <VacationEl {...item} key={item._id} />
            ))}
          </ul>
        </div>
      </div>



      <main className="bg-gray-100">
        <div className="mx-auto p-4 border-t">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-blue-900">Why choose Dream Voyage beach holiday?</h2>
            <p className="underline text-yellow-500">Your Dream Vacation Awaits</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <CiSun className="text-6xl mb-2 text-blue-900" />
              <h3 className="font-bold text-xl text-blue-900">Stunning settings</h3>
              <p className="text-gray-500">We’ve got 1000s of hotels on our roster. You can pick from places right on the beach and others that capture panoramic sea views from a clifftop plot.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <FaUmbrellaBeach className="text-6xl mb-2 text-blue-900" />
              <h3 className="font-bold text-xl text-blue-900">Seafront dining</h3>
              <p className="text-gray-500">Lots of our hotels are fitted with restaurants right on the beach – some are even fitted with outdoor terraces, meaning the waves make the soundtrack for mealtimes.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <PiVolleyballLight className="text-6xl mb-2 text-blue-900" />
              <h3 className="font-bold text-xl text-blue-900">Activities covered</h3>
              <p className="text-gray-500">Active-types and beach hotels are a perfect fit – all of our TUI MAGIC LIFE clubs are on the beach and include loads of watersports as part of the package.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <IoIosBed className="text-6xl mb-2 text-blue-900" />
              <h3 className="font-bold text-xl text-blue-900">Sea-view rooms</h3>
              <p className="text-gray-500">You can take advantage of your beachside bolthole with a sea-view room. They’re standard at some hotels, while at others you might need to pay a little extra.</p>
            </div>
          </div>
        </div>
      </main>



      <div className="bg-gray-100 p-4 border-t">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-900">FAQs</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "Where is the best place for a beach holiday?",
                answer: "For a close-to-home spot with top-notch beaches, the Balearics are well worth a look at. You’ll find tonnes of Blue Flag beaches split between Majorca, Menorca, Ibiza and Formentera. Further afield, the Caribbean’s a hotspot for beach-lovers – the Dominican Republic, Jamaica and Cuba host some of its most-snapped spots."
              },
              {
                question: "Where is the cheapest beach holiday?",
                answer: "For affordable beach holidays, destinations like Turkey, Bulgaria, and parts of Spain often offer great value for money without compromising on the experience."
              },
              {
                question: "Where is the most popular beach holiday?",
                answer: "Popular beach destinations include places like the Maldives, Bali, and the Hawaiian Islands, known for their stunning beaches and luxurious resorts."
              },
              {
                question: "What is a beach holiday?",
                answer: "A beach holiday typically involves staying at a coastal destination where you can enjoy activities such as swimming, sunbathing, beach sports, and exploring the local area."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="w-full text-left p-4 bg-blue-100 rounded-lg flex justify-between items-center" onClick={() => toggleFAQ(index)}>
                  <span className="font-semibold text-blue-900">{faq.question}</span>
                  <span className={`transform transition-transform ${activeFAQ === index ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                </button>
                <div className={`faq-answer p-4 bg-white rounded-lg ${activeFAQ === index ? 'block' : 'hidden'}`}>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VacationPage;
