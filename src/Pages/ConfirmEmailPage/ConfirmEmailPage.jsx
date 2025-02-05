import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfirmEmail } from "../../Store/Slices/fetchSessionSliceAsync";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ConfirmEmailPage = () => {
  const [status, setStatus] = useState("verifying"); // Possible states: verifying, success, error
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.language);

  // Function to handle email confirmation
  const handleConfirmEmail = async () => {
    const token = searchParams.get("token");
    console.log(token, "Token in URL");
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing token.");
      return;
    }

    try {
      // Dispatch the fetchConfirmEmail thunk
      const response = await dispatch(fetchConfirmEmail({ token })).unwrap();
      setStatus("success");
      setMessage(response.message);


      // Check the role from the response (user or admin)
      if (response.user.role === "admin") {
        console.log("Admin email verified successfully.");
      } else {
        console.log("User email verified successfully.");
      }


      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate(`/${currentLang}/`);
      }, 5000);
    } catch (error) {
      console.error("Error verifying email:", error);
      setStatus("error");
      setMessage(error?.message || "An error occurred during email verification.");
    }
  };

  // Automatically trigger email confirmation when the component loads
  useEffect(() => {
    handleConfirmEmail();
  }, []); // Run only once

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <Spinner />
            <p className="text-lg font-semibold text-gray-700 mt-4">
              Verifying your email...
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-lg font-semibold text-green-700">
              ✅ {message}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to home page...
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-lg font-semibold text-red-700">
              ❌ {message}
            </p>
            <p className="text-sm text-gray-500">
              Please try again or contact support.
            </p>
            <button
              onClick={handleConfirmEmail}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;


