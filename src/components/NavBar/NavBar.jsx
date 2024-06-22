import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/wanderlust-logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Store/Slices/sessionSliceReducer';
import { CgProfile } from "react-icons/cg";
import PopUp from '../PopUp/PopUp';
import { FaHeart } from "react-icons/fa6";



const navBarConfig = [{
  link: '/',
  title: 'Home'
},
{
  link: '/flights',
  title: 'Flight',
},
{
  link: '/vacations',
  title: 'Vacation',
},
{
  link: '/hotels',
  title: 'Hotel',
},

{
  link: '/cruises',
  title: 'Cruise',
},
{
  link: '/attraction',
  title: 'Attraction',
},

{
  link: '/city',
  title: 'City',
},
{
  link: '/login',
  title: 'Login',
}]

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.session.token)
  const user = useSelector(state => state.session.user)
  const [isPopUpOpen, setPopUpOpen] = useState(false)

  const onLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(logout())
    navigate("/")
  }


  return (
    <div className="shadow-md">
      <nav className='flex justify-between items-center bg-navbar bg-cover p-5'>
        <Link to='/'>
          <img className='w-[250px] relative' src={Logo} alt="logo" />
        </Link>
        <h1 className='text-[35px] font-bold text-yellow-500'>Dream Voyage</h1>
        <ul className='flex items-center gap-6 text-[20px] underline text-[#fbb74a]'>
          {user?.role === "admin" &&
            <div className='text-gray-950'>
              <li className='relative' onClick={() => setPopUpOpen(prev => !prev)}>
                <div className="flex items-center justify-center h-12 w-12 bg-blue-500 rounded-full">
                  <CgProfile className="text-white text-2xl" />
                </div>
                {isPopUpOpen && <PopUp onClick={setPopUpOpen} />}
              </li>
            </div>
          }
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
         
            <Link to="/heart" className="flex items-center">
              <FaHeart className="text-2xl text-red-700" />
              <span className="ml-2 hover:underline ">Shortlist() </span>
            </Link>
            
          </div>
       
      </nav>
    </div>
  );
}


export default Navbar