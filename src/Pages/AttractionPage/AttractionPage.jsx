import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import SortList from '../../components/SortList/SortList';
import Searchbar from '../../components/Searchbar/Searchbar';
import { fetchAttractionAsync } from '../../Store/Slices/fetchAttractionSliceAsync';
import bgImage from '../../assets/attraction/dzhungli-azii.jpg';
import bgImg from '../../assets/attraction/calendar.jpeg';
import AttractionList from '../../components/AttractionList/AttractionList';
import { fetchTokenAmadeus } from '../../Store/Slices/fetchSessionSliceAsync';
import { setCathegory } from '../../Store/Slices/attractionSliceReducer';


const AttractionPage = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.attraction.loading);
  const attractions = useSelector(state => state.attraction.attractions);
  const [listToShow, setListToShow] = useState([])
  const user = useSelector((state) => state.session.user);
  const category = useSelector((state) => state.attraction.cathegory)
  const sortedAttraction = useSelector((state) => state.attraction.sortedAttraction) || []
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setListToShow(Object.values(attractions))
  }, [attractions])

  useEffect(() => {
    if (sortedAttraction.length > 0) {
      setListToShow(sortedAttraction)
    }
  }, [sortedAttraction])

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchTokenAmadeus())
      await dispatch(fetchAttractionAsync({ latitude: 41.397158, longitude: 2.160873, radius: 1 }));
    }
    init()
    setError()
  }, [dispatch]);


  const handleCathegory = (cat, index) => {
    dispatch(setCathegory(cat))
    setIndex(index)
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {user?.role !== 'admin' && <Searchbar />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center space-x-0 sm:space-x-2 md:space-x-4 mb-4 p-1 sm:p-2 md:p-5">
        {['ALL', 'EXCURSIONS & DAY TRIPS', 'ATTRACTIONS & GUIDED TOURS', 'ACTIVITIES'].map((cat, index) => (
          <button
            key={cat}
            className={`
            px-2 sm:px-4 text-xs sm:text-sm md:text-base py-1 sm:py-2 rounded-full hover:underline 
            ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}
          `}
            onClick={() => handleCathegory(cat, index)}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="flex justify-between items-center mx-auto max-w-[1250px] mb-4">
        <SortList />
      </div>
      {listToShow.length > 0 ? (
        <AttractionList attractions={listToShow} index={index} />
      ) : (
        <p className="text-center text-gray-500 my-6">No attractions found</p>
      )}

      <div className="w-full flex justify-center py-12 bg-white">
        <div className="max-w-7xl flex flex-col lg:flex-row justify-between items-center bg-blue-50 p-6 rounded-2xl shadow-lg">
          <div className="flex-1 text-center lg:text-left lg:max-w-md">
            <h3 className="text-sm text-blue-600 font-semibold uppercase mb-2">Why Choose DV Collection</h3>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              With <span className="text-indigo-600">Guaranteed Great Value</span> and <span className="text-indigo-600">Top-Rated Guides</span>, Our Experiences Are the Best Way to Explore Popular Sights and Hidden Gems.
            </h2>
            <p className="text-md text-blue-900">
              All while caring for the environment and supporting local communities.
            </p>
          </div>

          <div className="flex-1 mt-8 lg:mt-0 flex justify-center">
            <img
              src={bgImage}
              alt="Beautiful nature destination with people kayaking"
              className="w-[600px] rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>



      <div className="w-full flex justify-center py-6 sm:py-12">
        <div className="w-full sm:w-[90%] lg:w-[1100px] h-auto lg:h-[400px] flex flex-col sm:flex-col lg:flex-row-reverse justify-between items-center bg-cover bg-center bg-[url('assets/attraction/save.jpg')] p-6 sm:p-12 lg:p-24 rounded-2xl shadow-lg">

          {/* Right Side: Text content */}
          <div className="flex-1 text-center lg:text-left p-4 sm:p-8 rounded-lg">
            <h3 className="text-lg sm:text-xl text-blue-900 font-bold mb-3 sm:mb-4">Created with Care</h3>
            <h2 className="text-md sm:text-lg font-bold text-blue-900 mb-3 sm:mb-4">
              YOU CAN RELAX KNOWING WE'VE DESIGNED OUR EXPERIENCES WITH THE UTMOST CARE.
            </h2>
            <p className="text-sm sm:text-md text-blue-900 mb-3 sm:mb-4">
              Not only do we carefully check each supplier, we've made sure all experiences meet our high sustainability standards. Plus, for every experience you buy, we donate part of the proceeds to environmental and social impact projects worldwide.
            </p>
            <p className="text-sm sm:text-md text-blue-900">
              So you can have fun and help out at the same time.
            </p>
          </div>
        </div>
      </div>



      <div className="w-full flex justify-center py-6">
        <div className="w-4/5 p-5 bg-blue-50 rounded-xl flex items-center space-x-4 px-4 lg:px-4">
          {/* Icon Section */}
          <div className="flex items-center justify-center">
            <img
              src={bgImg}
              alt="Calendar"
              className="w-[80px]"  // Reduced the image width for a smaller icon
            />
          </div>

          {/* Text Section */}
          <div className="text-center md:text">
            <p className="text-blue-600 font-small">
              AND IF YOUR PLANS CHANGE THERE'S NO NEED TO WORRY, WE OFFER FLEXIBLE BOOKING WITH
              <br /> {/* Break line for new row */}
              <span className="font-bold text-indigo-800 block"> FREE CANCELLATION UP TO 24 HOURS</span> BEFORE THE EXPERIENCE BEGINS.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttractionPage;







