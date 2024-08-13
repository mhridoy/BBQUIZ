// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link className="text-3xl font-extrabold tracking-wide flex items-center hover:scale-105 transition-transform duration-200" to="/">
            <span className="mr-2">⚡</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Binary Beats
            </span>
            <span className="text-white ml-2">Exam Portal</span>
          </Link>
          <ul className="hidden md:flex space-x-8 text-lg">
            <li>
              <Link className="hover:text-yellow-300 transition-colors duration-200 relative group" to="/">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            {/* <li>
              <Link className="hover:text-yellow-300 transition-colors duration-200 relative group" to="/quiz">
                Take Quiz
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            </li> */}
            <li>
              <Link className="hover:text-yellow-300 transition-colors duration-200 relative group" to="/teacher">
                Teacher Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
