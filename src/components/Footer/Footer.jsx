import React, { useState, useEffect } from 'react';
import { FaYoutube, FaFacebook, FaTwitter, FaGoogle, FaGooglePlay, FaLinkedin } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from '../Button/Button';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your email submission logic here
    setSubmitted(true);
    setEmail('')
  
  };

  useEffect(()=>{
    if(submitted){
      const timer = setTimeout(()=>{
        setSubmitted(false)
      },5000)
      return ()=> clearTimeout(timer)
    }
  })

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto py-6 mt-5">
        <div className="flex justify-center space-x-4 text-2xl">
          <FaYoutube className="text-red-500 transition duration-300" />
          <FaFacebook className="text-blue-600 transition duration-300" />
          <FaTwitter className="text-blue-400 transition duration-300" />
          <FaGoogle className="text-red-600 transition duration-300" />
          <FaGooglePlay className="text-green-500 transition duration-300" />
          <FaLinkedin className="text-blue-700 transition duration-300" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-x-2 text-white py-4 bg-blue-800">
        <p>Tel: +31618234567</p>
        <span className="hidden sm:inline mx-2">|</span>
        <p className="hidden sm:block font-semibold text-yellow-300">dreamvoyage@gmail.com</p>
        <span className="hidden sm:inline mx-2">|</span>
        <div className="flex items-center space-x-2">
          <FaRegEnvelope className="text-2xl" />
          <p>Don't miss out!</p>
          <Link to="/signup" className="underline text-yellow-300 font-semibold">
            SING UP
          </Link>
          <p>for holiday offers</p>
        </div>
      </div>

      <div className="bg-blue-700 py-6">
        <div className="container mx-auto">
          <ul className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-lg">
           
          <Link to="/about" className="hover:underline">
            About us
          </Link>
            <li><p className='hover:underline'>Service</p></li>
            <li><p className='hover:underline'>Activity</p></li>
            <Link to="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
            <Link to="/contact" className="hover:underline">
            Contact us
          </Link>
            <li className="flex flex-col items-center sm:items-start">
              <p>Can’t find what you’re looking for?</p>
              <form onSubmit={handleSubmit} className="flex mt-2 text-black">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                  placeholder="Send your e-mail"
                  required
                />
                <Button id="send"/>
              </form>
              {submitted && <p className="text-white mt-2">✅Thank you! Your email has been submitted.</p>}
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-900 py-4">
        <div className="container mx-auto">
          <span className="block text-center text-sm">&copy; 2024. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



