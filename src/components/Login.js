// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black opacity-50" />
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 2 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.teacher) {
        alert('Login successful!');
        navigate('/teacher/dashboard');
      } else {
        alert('You are not authorized as a teacher.');
        auth.signOut();
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl max-w-md w-full"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">Teacher Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-white placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-white placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
