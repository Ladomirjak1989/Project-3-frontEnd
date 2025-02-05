import React from 'react';

const PayToWay = () => {

  
    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Ways to Pay</h1>
    
          {/* Debit Cards Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Debit Cards</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Debit Cards</li>
              <li>Maestro (formerly Switch)</li>
              <li>Mastercard</li>
              <li>Visa Electron</li>
              <li>Visa Debit</li>
              <li>Delta</li>
            </ul>
            <p className="mt-4 text-gray-600">
              You won’t need to pay a charge for using any of the listed debit cards when booking a holiday with us. You can only use debit cards.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Maestro Card Issue Numbers:</h3>
              <p className="text-gray-600">
                If you’re paying with a Maestro card on our website, we’ll ask you to enter an issue number when providing payment details. If your Maestro card doesn’t have an issue number, please enter "0" in the box.
              </p>
            </div>
          </section>
    
          {/* Credit Cards Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Credit Cards</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>American Express</li>
            </ul>
            <p className="mt-4 text-gray-600">
              You can only use credit cards.
            </p>
          </section>
    
          {/* Apple Pay Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Apple Pay</h2>
            <p className="text-gray-600">
              Apple Pay is a simple and secure way to pay.
            </p>
          </section>
    
          {/* Cheques Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Cheques</h2>
            <p className="text-gray-600">
              If you’ve made a booking in one of our travel stores, you can pay in-store using a building society cheque or banker’s draft. Unfortunately, we do not accept personal or company cheques.
            </p>
          </section>
    
          {/* Direct Debit Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Direct Debit</h2>
            <p className="text-gray-600">
              If you’d like to spread the cost of your holiday into more manageable chunks, you can set up Direct Debit payments. You’ll need to pay a deposit, and the rest can be spread over monthly instalments.
            </p>
            <p className="text-gray-600 mt-4">
              You must set up at least three payments, with the final one due 98 days before your flight. Please note that there is no Direct Debit option for Marella Cruises.
            </p>
          </section>
    
          {/* PayPal Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">PayPal</h2>
            <p className="text-gray-600">
              Paying with PayPal is a fast and secure way to pay for your DV holiday. PayPal terms and conditions apply.
            </p>
          </section>
    
          {/* Disclaimer Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-gray-600">
              We do not accept any non-financial payment methods, such as frequent flyer points, towards the payment of any of our holidays.
            </p>
          </section>
        </div>
      );
}

export default PayToWay;