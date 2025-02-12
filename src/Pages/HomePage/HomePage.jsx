import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import VacationDeals from '../../components/VacationDeals/VacationDeals';
import { useDispatch, useSelector } from 'react-redux';
import Weather from '../../components/Weather/Weather';
import { useTranslation } from 'react-i18next';
import Cookie from '../../components/Cookie/Cookie';
import { FaEnvelope } from 'react-icons/fa';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import { fetchUser } from '../../Store/Slices/fetchSessionSliceAsync';
import useToken from '../../Hooks/UseToken';
import { setCookiePopUp } from '../../Store/Slices/cookieSliceReducer';
import welkomHomeImg from '../../assets/flags/welkom-home.jpg'


const HomePage = () => {


  const user = useSelector(state => state.session.user);
  const { t } = useTranslation();
  const currentLang = useSelector(state => state.language.language)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const [showMessage, setShowMessage] = useState(false); // Стейт для показу повідомлення
  const cookiePopUp = useSelector(state => state.cookie.cookiePopUp);

  const budgetDeals = [
    { amount: '€300', description: t('homeDeals.homeDealsSubTitle1'), link: '/deals/300' },
    { amount: '€500', description: t('homeDeals.homeDealsSubTitle2'), link: '/deals/500' },
    { amount: '€1000', description: t('homeDeals.homeDealsSubTitle3'), link: '/deals/1000' },
  ];

  const config = [
    {
      title: t('homeMain.homeMainFlights'),
      link: `/${currentLang}/flights`, // Corrected template string
      img: "https://www.hackmath.net/img/1/aircraft-02.jpg",
      linkText: t('button.homeMainBookButton')
    },
    {
      title: t('homeMain.homeMainVacations'),
      link: `/${currentLang}/vacations`,
      img: "https://t3.ftcdn.net/jpg/06/70/80/84/360_F_670808419_2qVIxlfo2lT8U0QfWiwX21qidARG7M21.jpg",
      linkText: t('button.homeMainBookButton')
    },
    {
      title: t('homeMain.homeMainHotels'),
      link: `/${currentLang}/hotels`,
      img: "https://media.licdn.com/dms/image/D4D12AQGxDdgsNCTOVQ/article-cover_image-shrink_720_1280/0/1698411417716?e=2147483647&v=beta&t=pMFaEPh6CwHETWB-sIIbXYfr_Teum6Kt1A7NJG3jrII",
      linkText: t('button.homeMainBookButton')
    },
    {
      title: t('homeMain.homeMainCruises'),
      link: `/${currentLang}/cruises`,
      img: "https://www.carnival.com/-/media/images/ships/carnival-luminosa-open-for-sale-hero-mobile.jpg",
      linkText: t('button.homeMainBookButton')
    },
    {
      title: t('homeMain.homeMainCities'),
      link: `/${currentLang}/cities`,
      img: "https://t3.ftcdn.net/jpg/00/99/12/34/360_F_99123407_CDVAXtMFWuayuO9VB8P8S687hZYqq6Js.jpg",
      linkText: t('button.homeMainShowMore')
    },
    {
      title: t('homeMain.homeMainAttractions'),
      link: `/${currentLang}/attractions`,
      img: "https://media.timeout.com/images/105473116/750/562/image.jpg",
      linkText: t('button.homeMainBookButton')
    },
  ];
  useToken()

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);


  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      setShowMessage(true);

      // Таймер для ховання повідомлення через 5 секунд
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      // Очищення таймера під час демонтування компонента
      return () => clearTimeout(timer);
    }
  }, [searchParams]);



  useEffect(() => {
    const cookiesAccepted = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookiesAccepted='));

    if (!cookiesAccepted) {
      dispatch(setCookiePopUp(true)) // Показуємо банер, якщо cookie не встановлено
    } else {
      dispatch(setCookiePopUp(false))
    }
  }, []);

  return (
    <>
      {/* {user?.role !== "admin" && <Searchbar />} */}

      {showMessage && (
        <div className="fixed top-16 left-1/3 transform -translate-x-1/2 bg-green-100 text-blsck px-6 py-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-center">
            ✅ Login successful! Welcome to our website!
          </p>
        </div>
      )}


      <div className="relative bg-gray-100">
        {/* Верхній Gradient */}
        <div className="h-1 p-2 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse"></div>

        <div className="flex justify-center py-4">
          <img
            src={welkomHomeImg}
            alt="Welcome Home"
            className="w-56 h-20 object-cover rounded-sm shadow-md"
          />
        </div>


        {/* Текст Welcome */}
        <div className="bg-gray-100 py-4 text-center shadow-md">
          <h2 className="text-2xl font-bold text-black animate-bounce">
            Welcome to Your Next Adventure!
          </h2>
          <p className="text-sm text-gray-600 font font-semibold mt-2">
            Discover amazing destinations, unique experiences, and unforgettable memories.
          </p>
        </div>

        {/* Нижній Gradient */}
        <div className="h-1 p-2 bg-gradient-to-r from-orange-400 to-yellow-400 animate-pulse"></div>
      </div>


      <HomeBanner />

      <div className='mx-auto my-0 max-w-7xl bg-gray-50 '>
        <div className="container mx-auto py-8">
          <div className="py-4 px-4 sm:px-8 lg:px-12 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              {t('homeMain.homeMainTitle')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              {t('homeMain.homeMainSubTitle')}
            </p>
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
        {cookiePopUp && <Cookie />}

        <VacationDeals count={10} customKey="b" />

        <Weather />


        <div className="mx-auto p-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">{t('homeDeals.homeDealsTitle')}</h2>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {budgetDeals.map((deal, index) => (
              <div key={index} className="bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{t('homeDeals.homeDealsUp')}</h3>
                  <p className="text-4xl font-bold mb-4">{deal.amount}{t('homeDeals.homeDealsPP')}</p>
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


      {/* Holiday Offers Section */}
      <div className="flex p-32 py-8">
        <FaEnvelope className="text-blue-900 text-2xl mr-2" />
        <p className="text-blue-500 font-semibold">
          Don't miss out!  <Link to={`/${currentLang}/holiday`} className="underline text-indigo-900 hover:text-yellow-500">Sign up for holiday offers</Link>
        </p>
      </div>
    </>
  );
}

export default HomePage;
