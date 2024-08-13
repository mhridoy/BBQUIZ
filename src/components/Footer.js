// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-2">
            <span className="animate-pulse">⚡</span> Binary Beats Exam Portal
          </div>
          <p className="text-sm mb-4">Empowering minds, one byte at a time</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 text-sm">
          © {new Date().getFullYear()} Binary Beats Exam Portal | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
