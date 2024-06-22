import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearShortlist } from '../../Store/Slices/shortListSliceReducer';
import { FaHeart } from 'react-icons/fa';
// import Navbar from '../../components/NavBar/NavBar';

const Shortlist = () => {
  const items = useSelector(state => state.shortlist.items);
  const limit = useSelector(state => state.shortlist.limit);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto my-6 p-4 border rounded shadow-lg">
        {/* <Navbar/> */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">YOUR SHORTLIST</h2>
        <div className="flex items-center space-x-2">
          <FaHeart className="text-yellow-500" />
          <span>{items.length}/{limit} SAVED TO SHORTLIST</span>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">SAVE YOUR SHORTLIST</h3>
          <p>Save your shortlist to your account to view and update it any time, from any device.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">SAVE TO ACCOUNT</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded">CREATE AN ACCOUNT</button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{items.length} SHORTLISTED PACKAGE HOLIDAYS</h3>
        <ul>
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name}</span>
              <button onClick={() => dispatch(removeItem(item.id))} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearShortlist())} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Clear Shortlist</button>
        )}
      </div>
    </div>
  );
};

export default Shortlist;
