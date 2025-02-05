import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Privacy = () => {
    const currentLang = useSelector(state => state.language.language)

  return (
    <main className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">User Agreement</h1>
          <p className="text-gray-600">
            <strong>Effective Date:</strong> [05.12.2025]
          </p>
        </header>

        {/* Sections */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            This User Agreement (hereinafter referred to as the "Agreement") governs your use of our application
            (hereinafter referred to as the "App"). By accessing or using the App, you agree to comply with this
            Agreement. If you do not agree with any part of this Agreement, you must not use the App.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Eligibility</h2>
          <p className="text-gray-600">
            You must be at least 18 years old or have reached the age of majority in your jurisdiction to use the App.
            By using the App, you confirm that you meet this requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Use of the App</h2>
          <p className="text-gray-600 mb-4">When using the App, you agree to:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Provide accurate and truthful information during registration or login.</li>
            <li>Not engage in any unlawful, harmful, or abusive activities while using the App.</li>
            <li>Comply with all applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Account and Security</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your login credentials and any activities that
            occur under your account. If you suspect unauthorized access to your account, you must notify us
            immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Privacy</h2>
          <p className="text-gray-600">
            Your use of the App is also governed by our{' '}
             <Link to={`/${currentLang}/policy`} className="text-blue-600 underline">Privacy Policy</Link>
              Privacy Policy
            
            , which explains how we collect, use, and protect your information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
          <p className="text-gray-600">
            All content, logos, trademarks, and other materials within the App are the property of their respective
            owners. You may not use, copy, or distribute any materials from the App without prior written consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the fullest extent permitted by law, we are not liable for any damages, including direct, indirect,
            incidental, or consequential damages, arising from your use of the App.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to terminate or suspend your access to the App at any time, with or without notice, for
            any reason, including violation of this Agreement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to the Agreement</h2>
          <p className="text-gray-600">
            We may update this Agreement at any time. If we make significant changes, we will notify you by posting an
            updated version on this page. Continued use of the App after changes constitute your acceptance of the
            updated Agreement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about this Agreement, please contact us:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <strong>Email:</strong> dreamvoyaged@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +(31) 618234567
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By using our application, you confirm that you have read, understood, and agree to this User Agreement.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Privacy;
