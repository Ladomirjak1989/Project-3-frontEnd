import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import './Swiper.css'
import 'swiper/css/navigation';




export default function Slider() {
    
 return (
    <div className='swiper-container'>
    
      {/* <Swiper
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay]}
        className="mySwiper"
      >
        {.map(item => (
          <SwiperSlide className='styleslide' key={item.id}>
            <Link to={`/city/${item.id}`}>
              <div className='picture-wrapper'>
              <img className='picture' src={item.imgUrl} alt="" />
              <p className='picturetext'>{item.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}

      </Swiper> */}
    </div>
  );
}
