import React, { useState } from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';



const BookingForm = () => {

  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmationChecked) {
      setShowValidationMessage(true);
      return;
    }
  };

  return (
    <div className='grid-cols-2' onSubmit={handleSubmit}>
      <div>
        <h2 className='pl-80 p-2 justify-center text-2xl font-semibold mb-2 italic items-center'>Passenger Details</h2>
      </div>
      <div className="mb-4 w-[300px] pl-20 text-gray-900">
        <label className=" p-2 block text-gray-700 font-bold text-xl mb-2">🏷️ Discount code</label>
        <div className="flex items-center space-x-2">
          <input type="text"
            placeholder="E.g. Promo100"
            className="border-sky-400 px-4 py-2 w-full rounded-md shadow-sm" />
          <Button id="apply" />
        </div>
      </div>

      <div>
        <div>
          <form className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Adult 1 <span className="text-sm font-normal"></span></h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Title</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm">
                <option>Select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2 ">First name</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Surname</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of birth (DD/MM/YYYY)</label>
              <div className="flex space-x-2">
                <input type="text" placeholder="DD" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
                <input type="text" placeholder="MM" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
                <input type="text" placeholder="YYYY" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nationality</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm">
                <option>Select</option>
                <option>Ukrainian</option>
                <option>Dutch</option>
                <option>Hungarian</option>
                <option>Spanish</option>
                <option>Portuguese</option>
                <option>American</option>
                <option>British</option>
                <option>Canadian</option>
                <option>Chinese</option>
                <option>French</option>
                <option>German</option>
                <option>Indian</option>
                <option>Japanese</option>
                <option>Mexican</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">House Number / Building</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Street Name</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Address Line 2 (optional)</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">City / Town</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Postcode</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input type="tel" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </form>
        </div>


        <div>
          <form className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 mt-8">Adult 2</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Title</label>
              <select className="block w-full border-gray-300 rounded-md shadow-sm">
                <option>Select</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Ms</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">First name</label>
              <input type="text" className="block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Surname</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of birth (DD/MM/YYYY)</label>
              <div className="flex space-x-2">
                <input type="text" placeholder="DD" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
                <input type="text" placeholder="MM" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
                <input type="text" placeholder="YYYY" className="w-1/3 border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>





      <div className="max-w-4xl mx-auto text-gray-900">
        <h3 className="text-xl font-bold mb-2">Your information</h3>
        <p className="mb-2">
          Dream Voyage would like to keep you updated from time to time with great holiday offers, products and services which we think will be of interest to you. We promise not to bombard you.
        </p>
        <p className="mb-4">
          If you do NOT want to hear from Dream Voyage please opt out by ticking these boxes:
        </p>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Email
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Text message
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Telephone
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Post
          </label>
        </div>
        <p className="text-sm">
          You can change your permissions at any point notifying us directly.
        </p>
      </div>



      <div className="max-w-4xl mx-auto text-gray-900 pt-10">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="mr-2"
            checked={confirmationChecked}
            onChange={(e) => setConfirmationChecked(e.target.checked)}
          />
          <span>
            I confirm that all passengers will have adequate insurance arrangements as soon as possible and I have read and understood the above information.
          </span>
        </label>
        {showValidationMessage && !confirmationChecked && (
          <p className="text-red-500 mt-2">
            Don't forget to tick the important information box to confirm you've read and understood it.
          </p>
        )}
      </div>
      <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" to={`/payment`}>
        CONTINUE TO PAYMENT
      </Link>

    </div>
  );
};

export default BookingForm;

