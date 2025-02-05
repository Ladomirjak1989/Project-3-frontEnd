import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeleteUserByMail } from "../../Store/Slices/fetchSessionSliceAsync";
import { resetState } from "../../Store/Slices/sessionSliceReducer";
import DeleteIcon from '../../assets/flags/icons8-delete.gif';
import userIcon from '../../assets/flags/icons8-user-48.png'

const DeleteInstructionUser = () => {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const currentLang = useSelector(state => state.language.language)
    const dispatch = useDispatch()
    const { loading, error, success, token } = useSelector(state => state.session)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token) {
            setErrorEmail('you are not authorised')
            return
        }

        if (email) {
            dispatch(fetchDeleteUserByMail(email));
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(resetState()); // Скидаємо стан після успішного видалення
                setEmail(""); // Очищаємо поле
            }, 3000);
        }
    }, [success, dispatch]);



    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-10">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-10 max-w-7xl w-full">
                {/* Data Deletion Policy Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        User Data Deletion Policy
                    </h1>
                    <p className="text-gray-600 mb-4">
                        We value your privacy and are committed to protecting your personal data. This page explains our
                        policy regarding the deletion of user data.
                    </p>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            1. What Data Can Be Deleted
                        </h2>
                        <p className="text-gray-600">
                            Users can request the deletion of the following types of data:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>Account information, such as name and email address.</li>
                            <li>Profile data, including uploaded photos and preferences.</li>
                            <li>Usage history and activity logs.</li>
                        </ul>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            2. How to Request Data Deletion
                        </h2>
                        <p className="text-gray-600">
                            To request the deletion of your data, please contact us through one of the following methods:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>Email: <a href="mailto:dreamvoyaged@gmail.com" className="text-blue-600 underline">dreamvoyaged@gmail.com</a></li>
                            <li>Contact form: Visit our <Link to={`/${currentLang}/contact`} className="text-blue-600 underline">Contact Us</Link> page.</li>
                            <li>Phone: +(31) 618234567</li>
                        </ul>
                        <p className="text-gray-600 mt-2">
                            Please provide the email address associated with your account when making a request.
                        </p>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            3. Processing Time
                        </h2>
                        <p className="text-gray-600">
                            We aim to process all deletion requests within 30 days of receiving a valid request. You will
                            receive a confirmation email once your data has been successfully deleted.
                        </p>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            4. Limitations
                        </h2>
                        <p className="text-gray-600">
                            In some cases, we may need to retain certain information to comply with legal obligations,
                            resolve disputes, or enforce our agreements. Such data will be securely stored and
                            inaccessible for general use.
                        </p>
                    </section>
                    <footer className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            By using our application, you acknowledge that you have read and understood this policy.
                        </p>
                    </footer>
                </div>

                {/* Delete Your Data Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                    <div className="text-center">
                        <img
                            src={userIcon}
                            alt="User Icon"
                            className="mx-auto w-12 h-12 mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-4 text-center">Delete Your Data</h2>
                    </div>
                    <p className="mb-4 text-gray-600 text-center">
                        If you wish to
                        <img
                            src={DeleteIcon}
                            alt="Delete Icon"
                            className="inline-block w-6 h-6 mx-2 align-middle"
                        />
                        your personal data from our platform, please enter your <span className="font-semibold">email</span> below:
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full border px-4 py-2 rounded-md mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                        >
                            {loading ? "Processing..." : "Submit Request"}
                        </button>
                        {success && (
                            <p className="text-green-600 mt-4 text-center">
                                ✅ User data successfully deleted!
                            </p>
                        )}
                        {error && (
                            <p className="text-red-600 mt-4 text-center">
                                ❌ {error}
                            </p>
                        )}
                         {errorEmail && (
                            <p className="text-red-600 mt-4 text-center">
                                ❌ {errorEmail}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );

}

export default DeleteInstructionUser;
