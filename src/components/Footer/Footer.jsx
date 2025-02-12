import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaYoutube, FaFacebook, FaTwitter, FaGoogle, FaGooglePlay, FaLinkedin } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {API_URL} from '../../utils/variables'



const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const currentLang = useSelector(state => state.language.language)
  const location = useLocation(); // React Router hook to get the current location

  // Track the active link
  const [activeLink, setActiveLink] = useState(`/${currentLang}`);

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link on route change
  }, [location]);

  const footerConfig = [
    { link: `/${currentLang}/about`, title: t('footer.footerAboutUs') },
    { link: `/${currentLang}/pay`, title: t('footer.footerWaysToPay') },
    { link: `/${currentLang}/cookie`, title: t('footer.footerCookie') },
    { link: `/${currentLang}/terms`, title: t('footer.footerTerms') },
    { link: `/${currentLang}/contact`, title: t('footer.footerContactUs') },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email to the backend API
      const response = await axios.post(`${API_URL}/email/subscribe`, {
        email,
      });
      if (response.status === 201) {
        setSubmitted(true); // Успішне збереження
        setEmail('');
        setName('')
        setMessage(response.data.message);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error submitting email:", error);

      if (error.response && error.response.status === 409) {
        setErrorMessage("⚠️ This email is already subscribed.");
      } else {
        setErrorMessage("❌ Failed to submit your message. Please try again.");
      }
      setSubmitted(false);
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link
  };

  useEffect(() => {
    if (submitted || errorMessage) {
      const timer = setTimeout(() => {
        setSubmitted(false)
        setEmail('')
        setName('')
        setErrorMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitted, errorMessage])

  return (
    <footer className="bg-blue-900 text-white px-4">
      <div className="container mx-auto py-6 mt-5 flex flex-wrap justify-center gap-4 text-2xl">
        <div className="flex justify-center space-x-4 text-2xl">
          <FaYoutube className="text-red-500 transition duration-300" />
          <FaFacebook className="text-blue-600 transition duration-300" />
          <FaTwitter className="text-blue-400 transition duration-300" />
          <FaGoogle className="text-red-600 transition duration-300" />
          <FaGooglePlay className="text-green-500 transition duration-300" />
          <FaLinkedin className="text-blue-700 transition duration-300" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white py-4 bg-blue-800 text-center sm:text-left">
        <p>Tel: +(31) 618234567</p>
        <span className="hidden sm:inline mx-2">|</span>
        <p className="hidden sm:block font-semibold text-yellow-300">dreamvoyaged@gmail.com</p>
        <span className="hidden sm:inline mx-2">|</span>
        <div className="flex items-center space-x-2">
          <FaRegEnvelope className="text-2xl" />
          <p>{t('footer.footerDontMiss')}</p>
          <Link to={`/${currentLang}/signup`} className="underline text-yellow-300 hover:text-yellow-600 font-semibold">
            {t('footer.footerSignUp')}
          </Link>
        </div>
      </div>

      <div className="bg-blue-700 py-6">
        <div className="container mx-auto">
          <ul className="flex flex-wrap flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-lg">
            {/* Динамічне рендеринг посилань з footerConfig */}
            {footerConfig.map((item, index) => (
              <li
                key={item.title}
                className={`transition-colors duration-200 ${activeLink === item.link ? 'text-yellow-400 underline font-bold' : 'text-black font-bold hover:underline hover:text-yellow-400'
                  }`}
                onClick={() => handleLinkClick(item.link)}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}

            <li className="flex flex-col items-center sm:items-start">
              <p>{t('footer.footerMessage')}</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mt-2 text-black space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder={t('footer.footerMessagePlaceHolder')}
                  required
                />
                <Button id="send" label={t('footer.footerMessageSend')} />
              </form>
              {submitted && message && <p className="text-green-500 mt-2">✅ {t('footer.footerThankYou')} {message}</p>}
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-900 py-4 text-center">
        <div className="container mx-auto">
          <span className="block text-center text-sm">&copy; {t('footer.footerAllRights')} </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




