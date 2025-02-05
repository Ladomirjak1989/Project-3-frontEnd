import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {

  const navigate = useNavigate();
  const currentLang = useSelector(state => state.language.language)

  const handleGoHome = () => {
    navigate(`/${currentLang}/`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-8xl mb-4">🥺</p>
        <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found!</h2>
        <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for could not be found!</p>
        <Button onClick={handleGoHome} id="goHome" />
      </div>
    </div>
  );
}

export default NotFoundPage;
