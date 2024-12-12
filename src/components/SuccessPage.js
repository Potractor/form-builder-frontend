import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Submission Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your responses.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
