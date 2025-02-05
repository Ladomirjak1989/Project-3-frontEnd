import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch } from 'react-redux';
import { setRating } from '../../Store/Slices/ratingSliceReducer';


const RatingStars = ({ hotelId, rating, setRating }) => {
  const dispatch = useDispatch();

  const handleRatingChange = (newRating) => {
    dispatch(setRating({ id: hotelId, rating: newRating }));
  };

  return (
    <ReactStars
      count={5}
      onChange={handleRatingChange}
      size={24}
      activeColor="#ffd700"
      isHalf={true}
      value={rating || 0}
    />
  );
};

export default RatingStars;
