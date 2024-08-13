// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is a teacher
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.teacher) {
        alert('Login successful!');
        navigate('/teacher/dashboard'); // Redirect to teacher dashboard
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Teacher Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-md focus:shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-md focus:shadow-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-green-400 transition-transform duration-300 transform hover:scale-105">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
