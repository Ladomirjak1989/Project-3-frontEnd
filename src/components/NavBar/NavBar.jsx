import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/wanderlust-logo.png";
import { fetchLogout } from '../../Store/Slices/fetchSessionSliceAsync';
import PopUp from '../PopUp/PopUp';
import { CgProfile } from "react-icons/cg";
import { setCartHotelWithUser } from '../../Store/Slices/hotelSliceReducer';
import { setCartCruiseWithUser } from '../../Store/Slices/cruiseSliceReducer';
import { setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from '../../Store/Slices/vacationSliceReducer';
import { useTranslation } from 'react-i18next';
import LanguageChange from '../LanguageChange/LanguageChange';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router hook to get the current location
  const token = useSelector(state => state.session.token);
  const { t } = useTranslation();
  const currentLang = useSelector(state => state.language.language)


  // Стан для мобільного меню
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Track the active link
  const [activeLink, setActiveLink] = useState(`/${currentLang}`);

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link on route change
  }, [location]);

  const navBarConfig = [
    { link: `/${currentLang}`, title: t('navbar.linkHome') },
    { link: `/${currentLang}/flights`, title: t('navbar.linkFlight') },
    { link: `/${currentLang}/vacations`, title: t('navbar.linkVacation') },
    { link: `/${currentLang}/hotels`, title: t('navbar.linkHotel') },
    { link: `/${currentLang}/cruises`, title: t('navbar.linkCruise') },
    { link: `/${currentLang}/attractions`, title: t('navbar.linkAttraction') },
    { link: `/${currentLang}/cities`, title: t('navbar.linkCity') },
    // Додаємо логіку: показати Login тільки якщо немає токена
    ...(token ? [] : [{ link: `/${currentLang}/login`, title: t('navbar.navLogIn') }])
  ];




  const { countFavorite: countFavoriteVacation, countCart: countVacationCart } = useSelector(state => state.vacations);
  const { countFavorite: countFavoriteHotel, countCart: countHotelCart } = useSelector(state => state.hotelSearch);
  const { countFavorite: countFavoriteCruise, countCart: countCruiseCart } = useSelector(state => state.cruise);
  const { countFavorite: countFavoriteAttraction } = useSelector(state => state.attraction);
  const { countCart: countFlightCart } = useSelector(state => state.flights);



  const user = useSelector(state => state.session.user);

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);



  const clearAllCarts = () => (dispatch) => {
    dispatch(setCartHotelWithUser([]));
    dispatch(setCartCruiseWithUser([]));
    dispatch(setCartFlightWithUser([]));
    dispatch(setCartVacationWithUser([]));
  };


  const onLogOut = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      await dispatch(fetchLogout());
      await dispatch(clearAllCarts());

      navigate(`/${currentLang}/`);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  useEffect(() => {
    setCount(countFavoriteVacation + countFavoriteHotel + countFavoriteCruise + countFavoriteAttraction);
  }, [countFavoriteVacation, countFavoriteHotel, countFavoriteCruise, countFavoriteAttraction]);

  useEffect(() => {

    setCartCount(countFlightCart + countVacationCart + countCruiseCart + countHotelCart);
  }, [countFlightCart, countVacationCart, countCruiseCart, countHotelCart]);

  const toggleCart = () => {
    setIsCartOpen(true);
    setTimeout(() => {
      setIsCartOpen(false);
    }, 5000);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link
  };


  return (
    <div className="shadow-md">
      <nav className='flex flex-col items-center bg-navbar bg-cover py-8 px-4'>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to='/'>
            <img className='w-[150px] transition-transform duration-300 hover:scale-105' src={Logo} alt="logo" />
          </Link>



          {/* Title */}
          <h1 className='text-xl ml-2 lg:text-4xl font-bold text-yellow-500 tracking-wide drop-shadow-lg'>
            {t("navbar.navTitle")}
          </h1>

          {/* Navigation Links */}
          <ul className='items-center gap-2 text-base lg:gap-6 lg:text-lg font-medium hidden md:flex '>
            {user?.role === "admin" && (
              <li className='relative' onClick={() => setPopUpOpen(prev => !prev)}>
                <div className="flex items-center justify-center h-12 w-12 bg-blue-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
                  <CgProfile className="text-white text-2xl" />
                </div>
                {isPopUpOpen && <PopUp onClick={setPopUpOpen} />}
              </li>
            )}

            {navBarConfig.map(item => (
              <li
                key={item.title}
                className={`transition-colors duration-200 ${activeLink === item.link ? 'text-yellow-400 underline font-bold' : 'text-black hover:underline hover:text-yellow-400'
                  }`}
                onClick={() => handleLinkClick(item.link)}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}

            {/* Show Logout only if the user is logged in */}
            {token &&
              <li>
                <button
                  className='text-gray-900 bg-green-200 hover:bg-green-400 p-2 font-semibold rounded transition-all duration-300 ease-in-out'
                  onClick={onLogOut}
                >
                  {t("navbar.navLogOut")}
                </button>
              </li>
            }
          </ul>

          {/* Гамбургер для мобільних */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>



        {/* new line container */}
        <div className="hidden sm:flex justify-end items-center py-4 w-full gap-6">
          {/* Shortlist */}
          <div className='bg-yellow-100 p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200'>
            <Link to={`/${currentLang}/short-list`} className="flex items-center">
              <FaHeart className="text-2xl text-red-600" />
              <span className="ml-2 hover:underline">{t("navbar.navShortlist")}({count})</span>
            </Link>
          </div>

          {/* Profile */}
          {user && <div className='bg-yellow-100 p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200'>

            <Link to={`/${currentLang}/profile`} className="flex items-center">
              <CgProfile className="text-2xl" />
              <span className="ml-2 hover:underline text-md">{t("navbar.navProfile")}</span>
            </Link>
          </div>}

          {/* Cart */}
          <div className="relative">
            <Link to={`/${currentLang}/cart`} onMouseEnter={toggleCart}>
              <div className='bg-yellow-100 p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-200'>
                <FaShoppingCart className='text-2xl' />
              </div>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            {isCartOpen && (
              <div className="absolute right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-10">
                {!cartCount && (
                  <p className='font-semibold text-gray-700'><span className='text-2xl'>😔</span>{t('navbar.navCartH')}</p>
                )}
                {!!cartCount && (
                  <p className='font-semibold text-gray-700 items-center'>
                    <span className='text-3xl'>👍</span> {t('navbar.navCartP')} {cartCount} {t('navbar.navCartPP')}
                  </p>
                )}
              </div>
            )}
          </div>
          <LanguageChange />
        </div>
      </nav>
      {isMobileMenuOpen &&
        <BurgerMenu navBarConfig={navBarConfig} token={token} isCartOpen={isCartOpen} toggleCart={toggleCart} currentLang={currentLang} cartCount={cartCount} count={count} activeLink={activeLink} t={t} user={user} onClick={setMobileMenuOpen} onLogOut={onLogOut} />
      }
    </div>
  );



};


export default Navbar;



