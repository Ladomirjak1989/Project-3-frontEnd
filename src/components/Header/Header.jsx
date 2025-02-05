import React from 'react'
import NavBar from "../NavBar/NavBar";
import LanguageChange from '../LanguageChange/LanguageChange';


 const Header = () => {
 
  return (
    <header className='relative'> 
      
      {false && <LanguageChange/>}
      <NavBar/> 
      </header>
  )
}

export default Header
