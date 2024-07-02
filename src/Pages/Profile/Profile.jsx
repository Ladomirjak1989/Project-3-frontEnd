import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Store/Slices/profileSliceReducer';

const Profile = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfile({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile submitted!');
    console.log(form);
  };

  return (
    <main>
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center mb-4">

            <h2 className="text-center text-2xl font-semibold mb-4">⊂◉‿◉つ</h2>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <select name="title" value={form.title} onChange={handleChange} className="mt-2 w-full p-2 border rounded-md">
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={form.middleName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="ex: myname@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address.street"
                placeholder="Street Address"
                value={form.address.street}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address.street2"
                placeholder="Street Address Line 2"
                value={form.address.street2}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={form.address.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <select
                name="address.state"
                value={form.address.state}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Please Select</option>
                <option value="UA">Ukraine</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="UK">United Kingdom</option>
                <option value="PL">Poland</option>
                <option value="SE">Sweden</option>
                <option value="NO">Norway</option>
                <option value="FI">Finland</option>

              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address.zip"
                placeholder="Zip Code"
                value={form.address.zip}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Submit Information
            </button>
          </form>

         
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
        </div>
      </div>
    </main>
  );
};

export default Profile;





