import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVacationDealsAsync } from '../../Store/Slices/fetchVacationSliceAsync'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import { useTranslation } from 'react-i18next';


const VacationDeals = ({ count, customKey }) => {
  const dispatch = useDispatch()
  const deals = useSelector(state => state.vacationDeals.deals) || []
  // ✅ Якщо `deals` — об'єкт, конвертуємо в масив
  const dealsArray = Array.isArray(deals) ? deals : Object.values(deals);
  

  const { t } = useTranslation();
  const currentLang = useSelector(state => state.language.language)

  useEffect(() => {
    dispatch(fetchVacationDealsAsync({ count }))
  }, [count, dispatch])


  return (
    <>
      <div className='mx-auto p-4'>
        <div className="mx-auto max-w-4xl bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">{t('homeSwiper.homeSwiperTitle')}</h2>
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
            {dealsArray.map((deal,index) => (
              <SwiperSlide className='p-2 py-8' key={`${deal.id}${customKey}`}>
                <div className="bg-antiquewhite bg-cover rounded-lg shadow-md overflow-hidden">
                  <div className="relative flex justify-center">
                    <img src={deal.images[0]} alt={deal.destination} className="w-full h-72 object-cover mb-4" />
                    <div className="absolute left-2 top-2 bg-red-600 text-white text-xl p-2 rounded-lg shadow-md">
                      {t('homeSwiper.homeSwiperLastMinute')}
                      </div>
                    <div className="absolute right-2 bottom-4 bg-white bg-opacity-75 text-xl p-2 rounded-lg shadow-md">
                      {t(`homeSwiper.homeSwiperCityCountry${index + 1}`)} {/* Динамічний переклад міста */}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {t(`homeSwiper.homeSwiperCityCountry${index + 1}`)} {/* Динамічний переклад міста */}
                    {/* {deal.destination }*/}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {t(`homeSwiper.homeSwiperSubTitle${index + 1}`)} {/* Динамічний переклад опису */}
                    {/* {deal.description }*/}
                    </p>
                    <Link to={`/${currentLang}/vacations/${deal._id}`} className="block text-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-sm">
                      {t('homeSwiper.homeSwiperShowMoreButton')}
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

  // return (
  //   <div className='mx-auto p-4'>
  //     <div className="mx-auto max-w-4xl bg-gray-50 p-6 rounded-lg shadow-lg">
  //       <h2 className="text-3xl font-bold text-center mb-8">{t('homeSwiper.homeSwiperTitle')}</h2>
  //       <Swiper
  //         slidesPerView={1}
  //         navigation={true}
  //         loop={true}
  //         spaceBetween={30}
  //         centeredSlides={true}
  //         autoplay={{ delay: 2500, disableOnInteraction: false }}
  //         modules={[Pagination, Navigation, Autoplay]}
  //         className="mySwiper"
  //       >
  //         {dealsArray.length > 0 ? (
  //           dealsArray.map((deal, index) => (
  //             <SwiperSlide className='p-2 py-8' key={`${deal._id}${customKey}`}>
  //               <div className="bg-antiquewhite bg-cover rounded-lg shadow-md overflow-hidden">
  //                 <div className="relative flex justify-center">
  //                   <img src={deal.images?.[0] || "/default-image.jpg"} alt={deal.destination || "No Destination"} className="w-full h-72 object-cover mb-4" />
  //                   <div className="absolute left-2 top-2 bg-red-600 text-white text-xl p-2 rounded-lg shadow-md">
  //                     {t('homeSwiper.homeSwiperLastMinute')}
  //                   </div>
  //                   <div className="absolute right-2 bottom-4 bg-white bg-opacity-75 text-xl p-2 rounded-lg shadow-md">
  //                     {t(`homeSwiper.homeSwiperCityCountry${index + 1}`)}
  //                   </div>
  //                 </div>
  //                 <div className="p-4">
  //                   <h3 className="text-xl font-semibold mb-2">
  //                     {t(`homeSwiper.homeSwiperCityCountry${index + 1}`)}
  //                   </h3>
  //                   <p className="text-gray-700 mb-4">
  //                     {t(`homeSwiper.homeSwiperSubTitle${index + 1}`)}
  //                   </p>
  //                   <Link to={`/${currentLang}/vacations/${deal._id}`} className="block text-center text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-sm">
  //                     {t('homeSwiper.homeSwiperShowMoreButton')}
  //                   </Link>
  //                 </div>
  //               </div>
  //             </SwiperSlide>
  //           ))
  //         ) : (
  //           <p className="text-center text-gray-500">{t('No deals available')}</p>
  //         )}
  //       </Swiper>
  //     </div>
  //   </div>
  // );


  
}

export default VacationDeals







