// src/components/StudentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }
    if (!batch.trim()) {
      newErrors.batch = 'Batch name is required.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        await addDoc(collection(db, 'students'), { name, batch });
        localStorage.setItem('student', JSON.stringify({ name, batch }));
        navigate('/quiz');  // Ensure this line is called after successful form submission
      } catch (error) {
        console.error('Error adding student: ', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mx-auto mt-12 max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="batch" className="block text-gray-700">Batch Name</label>
            <input
              type="text"
              id="batch"
              className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            />
            {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
