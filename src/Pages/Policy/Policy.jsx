import React from 'react';

const Policy = () => {


  return (
    <main className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-center">
            <strong>Effective Date:</strong> [05.12.2025]
          </p>
        </header>

        {/* Information We Collect */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-medium text-gray-700 mb-2">1.1. Information You Provide</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li><strong>Personal Information:</strong> Name, email address, profile pictures, and other Facebook account details you allow us to access.</li>
            <li><strong>User Identifiers:</strong> Facebook ID for profile identification.</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-700 mb-2">1.2. Technical Information</h3>
          <ul className="list-disc pl-6 text-gray-600">
            <li>IP address and device metadata.</li>
            <li>Browser and operating system information.</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>To authenticate and provide access to the application's features.</li>
            <li>To personalize your user experience.</li>
            <li>To ensure security and prevent fraud.</li>
            <li>To analyze and improve the application.</li>
          </ul>
        </section>

        {/* Sharing Your Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
          <p className="text-gray-600 mb-4">We do not share your personal information with third parties, except in the following cases:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>To comply with legal requirements.</li>
            <li>To protect the rights, property, or safety of our application or users.</li>
            <li>When using third-party services such as Facebook Login.</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Retention</h2>
          <p className="text-gray-600">Your information is retained only as long as necessary to fulfill the purposes mentioned above. You may request deletion of your data by contacting our support team.</p>
        </section>

        {/* Data Protection */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Protection</h2>
          <p className="text-gray-600">We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of data transmission over the internet can guarantee absolute security.</p>
        </section>

        {/* Your Rights */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Access your information.</li>
            <li>Correct, update, or delete your information.</li>
            <li>Restrict the processing of your data or withdraw consent.</li>
          </ul>
          <p className="text-gray-600">To exercise your rights, contact us using the details below.</p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to the Privacy Policy</h2>
          <p className="text-gray-600">We reserve the right to update this privacy policy at any time. Updates will be posted on this page with a new effective date.</p>
        </section>

        {/* Contact Us */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
          <p className="text-gray-600 mb-4">If you have any questions or requests, please contact us:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li><strong>Email:</strong> dreamvoyaged@gmail.com</li>
            <li><strong>Phone:</strong> +(31) 618234567</li>
          </ul>
        </section>

        {/* Facebook Login Usage */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Facebook Login</h2>
          <p className="text-gray-600 mb-4">We use Facebook Login to simplify the authentication process. When logging in via Facebook, we only access the information you have agreed to share with us.</p>
          <p className="text-gray-600"><strong>Note:</strong> We will not post anything on your Facebook profile without your consent.</p>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-500 text-sm">By continuing to use our application, you confirm that you have read and agree to our privacy policy.</p>
        </footer>
      </div>
    </main>
  );
};

export default Policy;
