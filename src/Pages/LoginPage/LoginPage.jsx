import React, { useState, useContext } from 'react';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { MdEmail } from 'react-icons/md';
import Button from '../../components/Button/Button';
import { setCartHotelWithUser } from '../../Store/Slices/hotelSliceReducer';
import { setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from '../../Store/Slices/vacationSliceReducer';
import { setCartCruiseWithUser } from '../../Store/Slices/cruiseSliceReducer';


const LoginPage = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.session.error)

    const [isPasswordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleDemoUser = () => {
        setEmail("demouser@gmail.com")
        setPassword("Demouser12345")
    }

    const handleDemoAdmin = () => {
        setEmail("demoadmin@dreamvoyage.com")
        setPassword("Demoadmin12345")
    }


    const navigate = useNavigate()

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        const {payload} = await dispatch(fetchSessionAsync(requestBody))
        if (payload.authToken) {
            dispatch(setCartHotelWithUser(payload.user.hotels))
            dispatch(setCartFlightWithUser(payload.user.flights))
            dispatch(setCartVacationWithUser(payload.user.vacations))
            dispatch(setCartCruiseWithUser(payload.user.cruises))
            navigate('/');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-[100vh] bg-hero-pattern bg-cover'>
            <div className="h-[600px]">
                <div className='w-[100%] max-w-[450px] bg-sky-400 p-8 rounded-lg'>
                    <form className='flex flex-col gap-4' onSubmit={handleLoginSubmit}>
                        <h1 className='text-4xl text-center mb-4'>Login</h1>

                        <div className='relative'>
                            <input
                                type='Email'
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=' w-full h-full border-solid border-2 border-slate-500 rounded-[40px] text-base py-2 pl-2 pr-[45px] ' />

                            <MdEmail className='absolute right-5 top-1/2 text-base translate-y-[-50%]' />
                        </div>

                        <div className='relative'>
                            <input
                                type={isPasswordShow ? 'text' : 'password'}
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full h-full border-solid border-2 border-slate-500 rounded-[40px] text-base py-2 pl-2 pr-[45px] ' />
                            {!isPasswordShow && <FaLock className='absolute right-5 top-1/2 text-base translate-y-[-50%]' onClick={() => setPasswordShow(true)} />}
                            {isPasswordShow && <FaLockOpen className='absolute right-5 top-1/2 text-base translate-y-[-50%]' onClick={() => setPasswordShow(false)} />}

                        </div>


                        <label >
                            <input className=' text-base gap-2' type='checkbox' />
                            Remember me
                        </label>
                        <div className='font-bold'>
                            <Link to='/forgot-password'>Forgot password?</Link>
                        </div>



                        <button className=' w-full h-[45px] bg-blue-500 rounded-[40px] shadow-[0_0_10px_rgb(27,25,25)] cursor-pointer text-base text-white font-bold' type='submit'>Login</button>
                        <Button onClick={handleDemoUser} id="demoUser" />
                        <Button onClick={handleDemoAdmin} id="demoAdmin" />
                        <div className='register-link'>

                            {error && <p className="error-message">{error}</p>}

                            <div className='font-bold'>
                                <p>
                                    Don't have an account? <Link className='text-[#f1e0e0] font-bold hover:underline hover:text-[rgb(247,192,247)]' to={'/signup'}>Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;