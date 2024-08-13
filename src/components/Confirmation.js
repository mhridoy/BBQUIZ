// src/components/Confirmation.js
import React from 'react';

const Confirmation = () => {
  return (
    <div className="container mx-auto mt-12 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Thank you for completing the quiz!</h2>
        <p className="text-gray-700">We will get back to you with the results soon.</p>
      </div>
    </div>
  );
};

export default Confirmation;
