import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, createAccount, deleteAccount, signOut } from '../../Store/Slices/profileSliceReducer';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { username, email, password } = useSelector((state) => state.profile);
  const [formState, setFormState] = useState({ username, email, password });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateProfile(formState));
    alert('Profile updated!');
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create your <span className="italic text-orange-400">myDreamVoyage</span> Account</h1>
        <p>Already have an account? <Link className="font-bold hover:underline text-blue-600 ml-1" to="/login">Log in &gt;</Link></p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <div className="flex justify-center mb-4">
            <h2 className="text-center text-2xl font-semibold mb-4">⊂◉‿◉つ</h2>
          </div>
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={handleUpdate}>Update</button>
              <button type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700" onClick={() => dispatch(createAccount())}>Create Account</button>
            </div>
            <div className="flex justify-between items-center text-sm text-red-600">
              <button type="button" className="hover:underline" onClick={() => dispatch(deleteAccount())}>Delete account</button>
              <button type="button" className="hover:underline" onClick={() => dispatch(signOut())}>Sign out</button>
            </div>
          </form>
        </div>
      </div>

      
      <div className="flex items-center justify-center py-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">myDreamVoyage Account benefits</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">🕑</span>
              <span>Early Access and Browse Offers, including selected myDreamVoyage secret deals</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">❤</span>
              <span>Save and view your shortlisted holidays on any device</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⚙️</span>
              <span>Manage your bookings wherever and whenever you want</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">☑</span>
              <span>Add extras like excursions, flight upgrades, car hire and much more</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🚘</span>
              <span>Check in online and select your seats</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">☑</span>
              <span>Access your myDreamVoyage Account via the DreamVoyage App</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Profile;

