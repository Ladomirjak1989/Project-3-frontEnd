import React, { useEffect, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa';

const GoToTop = () => {
    const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div >
      {showGoToTop && (
        <FaArrowCircleUp className="cursor-pointer fixed bottom-5 right-5 z-10 text-blue-500 w-12 h-12" onClick={scrollUp} />
      )}
    </div>
  );
  
}

export default GoToTop



