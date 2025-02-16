import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCruiseDealAsync } from '../../Store/Slices/fetchCruiseSliceAsync'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';


const CruiseDeal = ({ count }) => {
  const dispatch = useDispatch()
  const deal = useSelector(state => state.cruiseDeal.deals)
  const currentLang = useSelector(state => state.language.language)

  useEffect(() => {
    dispatch(fetchCruiseDealAsync({ count }))
  }, [count])

  return (
    <>
      <div className='mx-auto p-4'id='seeDeal'> 
        <div className="mx-auto max-w-4xl bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Cruise Deals</h2>
          <Swiper
            slidesPerView={1}
            navigation={true}
            loop={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {deal.map(deal => (
              <SwiperSlide className='p-2 py-8' key={deal.id}>
                <div className="bg-antiquewhite bg-cover rounded-lg shadow-md overflow-hidden">
                  <div className="relative flex justify-center">
                    <img src={deal.images[0]} alt={deal.destination} className="w-full h-72 object-cover mb-4" />
                    <div className="absolute left-2 top-2 bg-red-600 text-white text-xl p-2 rounded-lg shadow-md">
                      SAVE €150
                    </div>
                    <div className="absolute right-2 bottom-4 bg-white bg-opacity-75 text-xl p-2 rounded-lg shadow-md">
                      {deal.destination}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{deal.destination}</h3>
                    <p className="text-gray-700 mb-4">{deal.description}</p>
                    <Link to={`/${currentLang}/cruises/${deal._id}`} className="block text-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-sm">
                      SHOW MORE...
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );


  
}

export default CruiseDeal




