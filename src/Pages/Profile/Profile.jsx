import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Store/Slices/profileSliceReducer';
import Button from "../../components/Button/Button";
import { fetchDeleteAsync, fetchUpdatePasswordAsync, fetchUpdateProfileAsync } from '../../Store/Slices/fetchSessionSliceAsync';
import { setCartHotelWithUser } from '../../Store/Slices/hotelSliceReducer';
import { setCartCruiseWithUser } from '../../Store/Slices/cruiseSliceReducer';
import { setCartFlightWithUser } from '../../Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from '../../Store/Slices/vacationSliceReducer';
import { setPopUp } from "../../Store/Slices/popUpSliceReducer"

const Profile = () => {

  const dispatch = useDispatch();
  const [isUpdateFormShown, setUpdateFormShown] = useState(false);
  const [isUpdatePassword, setUpdatePassword] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);


  const form = useSelector(state => state.profile);
  const user = useSelector(state => state.session.user);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(setSuccessMessage(null));
      }, 5000);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (isUpdateFormShown) {
      dispatch(updateProfile({ field: "name", value: user.name }));
      dispatch(updateProfile({ field: "email", value: user.email }));
    }
  }, [isUpdateFormShown, user, dispatch])

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
    const { payload } = await dispatch(fetchUpdateProfileAsync({ ...form, id: user._id }));
    dispatch(setPopUp(payload.message));
    setUpdateFormShown(false)
    setSuccessMessage("✅ Profile updated successfully!");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.trim()) {
      const { payload } = await dispatch(fetchUpdatePasswordAsync({ currentPassword: password, newPassword, id: user._id }));

      dispatch(setPopUp(payload.message));
      setUpdatePassword(false)
      setSuccessMessage("✅ Password changed successfully!");
    } else {
      dispatch(setPopUp("Please enter a new password."));
    }
  };

  const handleDeleteProfile = async (e) => {
    setDeleteConfirmOpen(false);
    // e.preventDefault()
    const { payload } = await dispatch(fetchDeleteAsync(user._id));
    if (payload) {
      dispatch(setPopUp(payload.message));
      dispatch(setCartHotelWithUser([]));
      dispatch(setCartCruiseWithUser([]));
      dispatch(setCartFlightWithUser([]));
      dispatch(setCartVacationWithUser([]));
      setSuccessMessage("✅ Profile deleted successfully!");
    }

  }


  return (
    <main className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start justify-center relative">

        {/* Профіль користувача */}
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full sm:max-w-lg">
          <div className="text-center sm:text-left mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 underline">Profile</h2>


            {/* Перевірка наявності user */}
            {!user ? (
              <p className="text-red-500 text-center">Loading user data...</p>
            ) : (
              <div className='bg-slate-200 p-2 rounded-md'>
                <p className="text-black mb-1"><span className='italic font-semibold'>Name:</span> {user.name || "Guest"}</p>
                <p className="text-black mb-1"><span className='italic font-semibold'>Email:</span> {user.email || "N/A"}</p>
              </div>
            )}

            {/* Order History */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Order History:</h3>
              {user && user.purchases ? (
                <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-4 gap-4">
                  {user.purchases.map((item) => (
                    <li key={item._id} className="text-gray-700">
                      <p><span className='font-semibold italic'>Amount:</span> €{item.amount}</p>
                      <p> <span className='font-semibold italic'>Item Type:</span> {item.itemType}</p>
                      <p><span className='font-semibold italic'>Payment Status:</span> {item.paymentStatus}</p>
                      <Button onClick={() => alert("Comming soon")} id="showMore" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No purchase history available</p>
              )}
            </div>
          </div>

          {/* Кнопки дій
          <div className="flex flex-col sm:flex-row justify-center sm:justify-around space-y-2 sm:space-y-0 mb-4">
            <Button onClick={() => setUpdateFormShown(prev => !prev)} id="showUpdateProfile" />
            <Button onClick={() => setUpdatePassword(prev => !prev)} id="showUpdatePassword" />
            <Button onClick={handleDeleteProfile} id="deleteProfile" />
          </div> */}

          <div className="flex flex-col sm:flex-row justify-center sm:justify-around space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <button
              onClick={() => setUpdateFormShown(prev => !prev)}
              className="w-full sm:w-40 py-2 px-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition duration-300"
            >
              UPDATE PROFILE
            </button>

            <button
              onClick={() => setUpdatePassword(prev => !prev)}
              className="w-full sm:w-40 py-2 px-3 text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm transition duration-300"
            >
              UPDATE PASSWORD
            </button>

            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="w-full sm:w-40 py-2 px-3 text-center bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition duration-300"
            >
              DELETE PROFILE
            </button>
            {successMessage && (
              <div className="fixed top-40 left-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
                {successMessage}
              </div>
            )}
          </div>

          {/* Модальне вікно підтвердження видалення */}
          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                <h2 className="text-lg font-bold text-gray-900">Are you sure you want to delete your profile?</h2>
                <p className="text-gray-700 mt-2">This action cannot be undone.</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Yes, Delete</button>
                  <button onClick={() => setDeleteConfirmOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Форма оновлення профілю */}
          {isUpdateFormShown && (
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm"
                />
              </div>
              <Button id="profileForm" />
            </form>
          )}

          {/* Форма зміни пароля */}
          {isUpdatePassword && (
            <form onSubmit={handleChangePassword} className="space-y-4 mt-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm"
                />
              </div>
              <Button id="changePassword" />
            </form>
          )}
        </div>

        {/* Блок з перевагами */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-full sm:max-w-lg text-center sm:text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-4">myDreamVoyage Account benefits</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
              <span className="mr-2">🕑</span>
              <span>Early Access and Browse Offers, including selected myDreamVoyage secret deals</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
              <span className="mr-2">❤</span>
              <span>Save and view your shortlisted holidays on any device</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
              <span className="mr-2">⚙️</span>
              <span>Manage your bookings wherever and whenever you want</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
              <span className="mr-2">☑</span>
              <span>Add extras like excursions, flight upgrades, car hire and much more</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
              <span className="mr-2">🚘</span>
              <span>Check in online and select your seats</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start">
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











