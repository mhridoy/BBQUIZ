import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black opacity-50" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

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
        navigate('/quiz');
      } catch (error) {
        console.error('Error adding student: ', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundAnimation />
      <motion.div 
        className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-300 mb-2">Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="name"
              className="w-full p-2 bg-gray-800 text-white border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="batch" className="block text-blue-300 mb-2">Batch Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="batch"
              className="w-full p-2 bg-gray-800 text-white border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            />
            {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch}</p>}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out transform"
          >
            Start Quiz
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentForm;
