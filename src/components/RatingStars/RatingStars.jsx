import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { setRating } from '../../Store/Slices/ratingSliceReducer';


const RatingStars = ({ vacationId, rating }) => {
  const dispatch = useDispatch();
//   const rating = useSelector((state) => state.ratings[vacationId]);

  const handleRatingChange = (newRating) => {
    dispatch(setRating({ id: vacationId, rating: newRating }));
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
