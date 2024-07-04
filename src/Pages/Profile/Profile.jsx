import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile} from '../../Store/Slices/profileSliceReducer';
import Button from "../../components/Button/Button";
import { fetchDeleteAsync, fetchUpdatePasswordAsync, fetchUpdateProfileAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { setCartHotelWithUser } from '../../Store/Slices/hotelSliceReducer';
import { setCartCruiseWithUser } from '../../Store/Slices/cruiseSliceReducer';
import { setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from '../../Store/Slices/vacationSliceReducer';
import PopUpMessage from '../../components/PopUpMessage/PopUpMessage';

const Profile = () => {
  const dispatch = useDispatch();
  const [isUpdateFormShown, setUpdateFormShown] = useState(false)
  const [isUpdatePassword, setUpdatePassword] = useState(false)
  const popUp = useSelector(state => state.popUp.popUp)


  const form = useSelector(state => state.profile);
  const user = useSelector(state => state.session.user);
  console.log(user)
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (popUp) {
      setTimeout(() => {
        dispatch(setPopUp(null))
      }, 9000)
    }
  }, [popUp])

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfile({ field: name, value }));
  };



  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    dispatch(fetchUpdateProfileAsync({ ...form, id: user._id }));
    dispatch(setPopUp("Profile update."));
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.trim()) {
     const {payload} = await dispatch(fetchUpdatePasswordAsync({ password, newPassword }));
 dispatch(setPopUp(payload.message));
    } else {
      dispatch(setPopUp("Please enter a new password."));
    }

  };


  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-700 mb-1">Name: {user.name}</p>
            <p className="text-gray-700 mb-1">Email: {user.email}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Order History:</h3>
              <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-3 ">
                {user.purchases.map((item) => (
                  <li key={item._id} className="text-gray-700">
                    <p>Amount: {item.amount}</p>
                    <p>Item Type: {item.itemType}</p>
                    <p>Payment Status: {item.paymentStatus}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-around mb-4">
            <Button onClick={() => setUpdateFormShown((prev) => !prev)} id="showUpdateProfile" />
            <Button onClick={() => setUpdatePassword((prev) => !prev)} id="showUpdatePassword" />
            <Button
              onClick={() => {
                dispatch(fetchDeleteAsync(user._id));
                dispatch(setCartHotelWithUser([]));
                dispatch(setCartCruiseWithUser([]));
                dispatch(setCartFlightWithUser([]));
                dispatch(setCartVacationWithUser([]));
                navigate('/');
              }}
              id="deleteProfile"
            />
          </div>
          {isUpdateFormShown && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <Button onClick={handleUpdateProfile} id="profileForm" />
            </form>
          )}
          {isUpdatePassword && (
            <form onSubmit={handleChangePassword} className="space-y-4 mt-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <Button id="changePassword" />
              {popUp && <PopUpMessage />}
            </form>
          )}
        </div>
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











