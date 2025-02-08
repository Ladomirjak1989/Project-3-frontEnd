import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TermsAndConditionsPage = () => {
  const currentLang = useSelector(state => state.language.language)


  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Terms and Conditions
      </h1>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        Terms and Conditions will apply to: (A) Your Use Of Our Website; (B) Our Supply Of Products And Services; and (C) Our Contact With You.
      </p>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        This Dream Voyage website ("Website") is owned and operated by Dream Voyage Limited, a company registered in the Netherlands.
      </p>
      <p className="font-bold text-gray-900 mb-4 text-sm sm:text-base">
        Please ensure that you review all of the following sections carefully before using our Website.
      </p>

      <h2 className="text-lg sm:text-2xl font-bold mb-4">A: Your use of our website</h2>

      <h3 className="text-base sm:text-xl font-semibold mb-2">Authorised Use</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700 text-sm sm:text-base">
        <li>For personal, non-commercial use only.</li>
        <li>To obtain information on our services.</li>
        <li>To access or retrieve travel information.</li>
        <li>Submit and share reviews and comments.</li>
      </ul>

      <h3 className="text-base sm:text-xl font-semibold mb-2">Non-Authorised Use</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700 text-sm sm:text-base">
        <li>Do not access, extract, use or copy any material for commercial purposes.</li>
        <li>Do not use this Website to infringe any rights of others.</li>
        <li>Do not attempt unauthorized access to user data.</li>
      </ul>

      <h3 className="text-base sm:text-xl font-semibold mb-2">Links</h3>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        If you wish to link to our Website, please do so only to our homepage unless you have written permission.
      </p>

      <h3 className="text-base sm:text-xl font-semibold mb-2">Website Facilities</h3>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        We have made available various services and tools on this Website for your use, including booking and managing your account.
      </p>

      <h4 className="text-base sm:text-lg font-semibold mb-2">Account Set-up</h4>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        When you make a booking, an account will be created for you.
      </p>

      <h4 className="text-base sm:text-lg font-semibold mb-2">Your Bookings</h4>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        You can view details of your current and past bookings in your account.
      </p>

      <h4 className="text-base sm:text-lg font-semibold mb-2">Shortlists</h4>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">
        Use the shortlist feature to save up to 10 holidays for easy access.
      </p>

      <h1 className="text-lg sm:text-xl font-semibold mb-2">User Agreement</h1>
      <p className="text-sm sm:text-base">
        <li>Visit our <Link to={`/${currentLang}/privacy`} className="text-blue-600 underline">User Agreement Policy</Link>.</li>
      </p>

      <h1 className="text-lg sm:text-xl font-semibold mb-2">Privacy Policy</h1>
      <p className="text-sm sm:text-base">
        <li>Visit our <Link to={`/${currentLang}/policy`} className="text-blue-600 underline">Privacy Policy</Link>.</li>
      </p>

      <h1 className="text-lg sm:text-xl font-semibold mb-2">User Data Deletion Policy</h1>
      <p className="text-sm sm:text-base">
        <li>Email: <a href="mailto:support@example.com" className="text-blue-600 underline">dreamvoyaged@gmail.com</a></li>
        <li>Visit our <Link to={`/${currentLang}/delete-user`} className="text-blue-600 underline">Delete User Policy</Link>.</li>
      </p>
    </div>
  );

}

export default TermsAndConditionsPage;
