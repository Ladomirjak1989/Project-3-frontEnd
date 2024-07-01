import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import Logo from "../../assets/wanderlust-logo.png";
import { logout } from '../../Store/Slices/sessionSliceReducer';
import PopUp from '../PopUp/PopUp';
import { CgProfile } from "react-icons/cg";

const navBarConfig = [
  { link: '/', title: 'Home' },
  { link: '/flights', title: 'Flight' },
  { link: '/vacations', title: 'Vacation' },
  { link: '/hotels', title: 'Hotel' },
  { link: '/cruises', title: 'Cruise' },
  { link: '/attraction', title: 'Attraction' },
  { link: '/cities', title: 'City' },
  { link: '/login', title: 'Login' }
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.session.token);
  const countFavorite = useSelector(state => state.vacations.countFavorite);
  const countFavoriteHotel = useSelector(state => state.hotels.countFavorite);
  const countFavoriteCruise = useSelector(state => state.cruise.countFavorite);
  const user = useSelector(state => state.session.user);


  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [timeMessage, setTimeMessage] = useState(false);


  const onLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    setCount(countFavorite + countFavoriteHotel + countFavoriteCruise);
  }, [countFavorite, countFavoriteHotel, countFavoriteCruise]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setTimeMessage(true);
    setTimeout(() => {
      setTimeMessage(false);
    }, 5000);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateCartItemQuantity = (itemName, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="shadow-md">
      <nav className='flex justify-between items-center bg-navbar bg-cover p-5'>
        <Link to='/'>
          <img className='w-[150px] relative' src={Logo} alt="logo" />
        </Link>
        <h1 className='text-[35px] font-bold text-yellow-500'>Dream Voyage</h1>
        <ul className='flex items-center gap-6 text-[20px] underline text-[#fbb74a]'>
          {user?.role === "admin" && (
            <div className='text-gray-950'>
              <li className='relative' onClick={() => setPopUpOpen(prev => !prev)}>
                <div className="flex items-center justify-center h-12 w-12 bg-blue-500 rounded-full">
                  <CgProfile className="text-white text-2xl" />
                </div>
                {isPopUpOpen && <PopUp onClick={setPopUpOpen} />}
              </li>
            </div>
          )}
          {navBarConfig.map(item => (
            <li key={item.title}>
              {item.title !== 'Login' ? (
                <Link to={item.link}>{item.title}</Link>
              ) : (
                !token ? <Link to={item.link}>{item.title}</Link> :
                  <button className='text-[#121111] bg-yellow-100 hover:bg-yellow-200 p-2 font-medium rounded transition duration-300 ease-in-out' onClick={onLogOut}>Log Out</button>
              )}
            </li>
          ))}
        </ul>
        <div className='bg-yellow-100 p-2 rounded-sm'>
          <Link to="/short-list" className="flex items-center">
            <FaHeart className="text-2xl text-red-700" />
            <span className="ml-2 hover:underline">Shortlist({count})</span>
          </Link>
        </div>

        <div className='bg-yellow-100 p-2 rounded-sm'>
          <Link to="/profile" className="flex items-center">
            <CgProfile className="text-2xl" />
            <span className="ml-2 hover:underline text-md">myProfile</span>
          </Link>
        </div>

        <div className="relative">
          <button onClick={toggleCart} className="relative">
            <div className='bg-yellow-100 p-2 rounded-sm pt-1 mt-1 pb-2'>
              <FaShoppingCart className='size-7' />
            </div>
            {cartItems && cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </button>
          {isCartOpen && (
            <div className="absolute right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4">
              {timeMessage ? (
                <p>😔 Your cart is empty</p>
              ) : (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                      <span>{item.name}</span>
                      <span>{item.quantity}</span>
                      <button onClick={() => removeFromCart(item.name)}>Remove</button>
                      <button onClick={() => addToCart(item.name)}>Remove</button>
                      <button onClick={() => updateCartItemQuantity(item.name)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;