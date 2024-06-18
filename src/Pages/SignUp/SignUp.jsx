import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaLockOpen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUpAsync } from '../../Store/Slices/fetchSessionSliceAsync';



function Signup() {
 
    const dispatch = useDispatch()
    const error = useSelector(state => state.session.error)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [isPasswordShow, setPasswordShow] = useState(false)

    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { email, password, name: user };
        
        const token = await dispatch(fetchSignUpAsync(requestBody))

        if(token.payload.authToken){
           
            navigate('/');
        }
        
    };

    return (
        <div className='flex justify-center items-center min-h-[100vh] bg-hero-pattern bg-cover'>
            <div className="h-[600px]">
                <div className='w-[100%] max-w-[450px] bg-sky-400 p-8 rounded-lg'>
                    <form className='flex flex-col gap-4' onSubmit={handleSignupSubmit}>
                        <h1 className='text-4xl text-center mb-4'>Sign Up</h1>

                        <div className='relative'>
                            <input
                                name="name"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                id="name"
                                placeholder='Username'
                                className=' w-full h-full border-solid border-2 border-slate-500 rounded-[40px] text-base py-2 pl-2 pr-[45px] ' />
                            <FaUser className='absolute right-5 top-1/2 text-base translate-y-[-50%]' />
                        </div>

                        <div className='relative'>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="email"
                                placeholder='Email'
                                className='w-full h-full border-solid border-2 border-slate-500 rounded-[40px] text-base py-2 pl-2 pr-[45px] ' />
                            <MdEmail className='absolute right-5 top-1/2 text-base translate-y-[-50%]' />
                        </div>

                        <div className='relative'>
                            <input
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isPasswordShow ? "text" : "password"}
                                id="password"
                                placeholder='Password'
                                className='w-full h-full border-solid border-2 border-slate-500 rounded-[40px] text-base py-2 pl-2 pr-[45px] ' />
                            {!isPasswordShow && <FaLock className='absolute right-5 top-1/2 text-base translate-y-[-50%]' onClick={() => setPasswordShow(true)} />}
                            {isPasswordShow && <FaLockOpen className='absolute right-5 top-1/2 text-base translate-y-[-50%]' onClick={() => setPasswordShow(false)} />}
                        </div>

                        <div>
                            <label className='flex justify-between text-base gap-2' ><input type='checkbox' />
                                I agree to the terms & conditions</label>
                        </div>
                        <button className=' w-full h-[45px] bg-blue-500 rounded-[40px] shadow-[0_0_10px_rgb(27,25,25)] cursor-pointer text-base text-white font-bold' type='submit'>Sign Up</button>
                        
                        {error && <p className="error-message">{error}</p>}
                        
                        <div className='font-bold'>
                            <p>Already have an account? <Link className='text-[#f1e0e0] font-bold hover:underline hover:text-[rgb(247,192,247)]' to={"/login"} >Login</Link></p>


                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup
